import type { PaymentGateway } from "../../../prisma/generated/client";

/**
 * A pluggable payment-gateway adapter. Each provider (Teller, Stripe, Paystack…)
 * implements this interface. The registry resolves providers by name.
 */
export interface PaymentGatewayAdapter {
  /** Unique provider key stored on PaymentGateway.provider */
  provider: string;
  /** Human-friendly label for admin UI */
  label: string;
  /** Credential fields the admin must supply */
  credentialFields: CredentialField[];

  /**
   * Start a payment. Returns either a hosted-checkout URL to redirect the
   * donor to, or a marker indicating the payment was handled inline.
   */
  initiatePayment(opts: InitiateOptions): Promise<InitiateResult>;

  /**
   * Verify a webhook/callback payload sent by the provider and map it to a
   * normalized result. Should verify signatures where the provider supports it.
   */
  verifyCallback(
    payload: Record<string, unknown>,
    gateway: PaymentGateway
  ): Promise<VerifyResult>;
}

export interface CredentialField {
  key: string;
  label: string;
  required?: boolean;
  secret?: boolean;
}

export interface InitiateOptions {
  /** Internal unique reference stored on the Donation record */
  reference: string;
  /** Amount in major currency units (e.g. 50.00 GHS) */
  amount: number;
  currency: string;
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  /** URL the donor is sent back to after payment */
  returnUrl: string;
  /** URL the provider calls to notify us of the result */
  callbackUrl: string;
  gateway: PaymentGateway;
}

export interface InitiateResult {
  /** Hosted-checkout URL to redirect the donor to, if applicable */
  checkoutUrl?: string;
  /** Raw provider response for logging/debugging */
  raw?: unknown;
  error?: string;
}

export type NormalizedStatus =
  | "SUCCESS"
  | "PENDING"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export interface VerifyResult {
  valid: boolean;
  status?: NormalizedStatus;
  reference?: string;
  gatewayReference?: string;
  raw?: unknown;
  error?: string;
}
