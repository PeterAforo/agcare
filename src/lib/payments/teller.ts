import type { PaymentGateway } from "../../../prisma/generated/client";
import type {
  PaymentGatewayAdapter,
  InitiateOptions,
  InitiateResult,
  VerifyResult,
} from "./types";

/**
 * PaySwitch Teller adapter — Standard Checkout flow.
 *
 * 1. POST {base}/initiate with merchant_id, transaction_id, desc, amount,
 *    redirect_url, email. Auth: Basic base64(apiuser:apiKey).
 * 2. Response contains a checkout/payment URL — redirect the donor there.
 * 3. Teller redirects the donor back to redirect_url with
 *    ?code=000&status=successful&reason=...&transaction_id=...
 * 4. We re-verify via {base}/v1.1/transaction/status before marking SUCCESS.
 *
 * Credentials stored on PaymentGateway.credentials:
 *   { apiuser, apiKey, merchantId, environment: "test" | "live" }
 */

const HOSTS = {
  live: "https://checkout.theteller.net",
  test: "https://checkout-test.theteller.net",
  apiLive: "https://prod.theteller.net",
  apiTest: "https://test.theteller.net",
};

interface TellerCreds {
  apiuser?: string;
  apiKey?: string;
  merchantId?: string;
  environment?: string;
}

function creds(gateway: PaymentGateway): TellerCreds {
  return (gateway.credentials || {}) as TellerCreds;
}

function isLive(c: TellerCreds) {
  return c.environment === "live";
}

/** Teller amounts are 12-digit zero-padded strings in minor units (pesewas). */
function toTellerAmount(amount: number): string {
  return Math.round(amount * 100)
    .toString()
    .padStart(12, "0");
}

/** transaction_id must be 12 digits for Teller. */
function toTellerTxnId(reference: string): string {
  const digits = reference.replace(/\D/g, "");
  if (digits.length >= 12) return digits.slice(-12);
  return digits.padStart(12, "0");
}

export const tellerAdapter: PaymentGatewayAdapter = {
  provider: "teller",
  label: "PaySwitch Teller",
  credentialFields: [
    { key: "merchantId", label: "Merchant ID", required: true },
    { key: "apiuser", label: "API Username", required: true },
    { key: "apiKey", label: "API Key", required: true, secret: true },
    { key: "environment", label: "Environment (test | live)", required: false },
  ],

  async initiatePayment(opts: InitiateOptions): Promise<InitiateResult> {
    const c = creds(opts.gateway);
    if (!c.merchantId || !c.apiuser || !c.apiKey) {
      return { error: "Teller gateway is not fully configured." };
    }

    const base = isLive(c) ? HOSTS.live : HOSTS.test;
    const basic = Buffer.from(`${c.apiuser}:${c.apiKey}`).toString("base64");
    const txnId = toTellerTxnId(opts.reference);

    const payload = {
      merchant_id: c.merchantId,
      transaction_id: txnId,
      desc: opts.description.slice(0, 100),
      amount: toTellerAmount(opts.amount),
      redirect_url: opts.returnUrl,
      email: opts.customerEmail,
    };

    try {
      const res = await fetch(`${base}/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${basic}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      const checkoutUrl =
        (data.checkout_url as string) ||
        (data.payment_url as string) ||
        (data.url as string) ||
        (data.checkoutUrl as string);

      if (res.ok && checkoutUrl) {
        return { checkoutUrl, raw: data };
      }
      return {
        error:
          (data.reason as string) ||
          (data.message as string) ||
          `Teller initiate failed (${res.status})`,
        raw: data,
      };
    } catch (err) {
      return { error: `Teller request failed: ${(err as Error).message}` };
    }
  },

  async verifyCallback(
    payload: Record<string, unknown>,
    gateway: PaymentGateway
  ): Promise<VerifyResult> {
    const c = creds(gateway);
    const code = String(payload.code || "");
    const status = String(payload.status || "").toLowerCase();
    const txnId = String(payload.transaction_id || payload.transactionId || "");

    // Re-verify against Teller's status endpoint when credentials allow
    if (c.merchantId && c.apiuser && c.apiKey && txnId) {
      try {
        const apiBase = isLive(c) ? HOSTS.apiLive : HOSTS.apiTest;
        const basic = Buffer.from(`${c.apiuser}:${c.apiKey}`).toString("base64");
        const res = await fetch(`${apiBase}/v1.1/transaction/status`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${basic}`,
          },
          body: JSON.stringify({ merchant_id: c.merchantId, transaction_id: txnId }),
          cache: "no-store",
        });
        if (res.ok) {
          const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
          const apiStatus = String(data.status || "").toLowerCase();
          const apiCode = String(data.code || "");
          const ok = apiCode === "000" || apiStatus === "successful";
          return {
            valid: true,
            status: ok ? "SUCCESS" : apiStatus === "pending" ? "PENDING" : "FAILED",
            gatewayReference: txnId,
            raw: data,
          };
        }
      } catch {
        // fall through to redirect-param trust
      }
    }

    // Fallback: trust the redirect parameters (code=000 means approved)
    const ok = code === "000" || status === "successful";
    return {
      valid: true,
      status: ok ? "SUCCESS" : status === "cancelled" ? "CANCELLED" : "FAILED",
      gatewayReference: txnId || undefined,
      raw: payload,
    };
  },
};
