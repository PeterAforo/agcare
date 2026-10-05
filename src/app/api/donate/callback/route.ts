import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdapter } from "@/lib/payments/registry";
import type { DonationStatus } from "../../../../../prisma/generated/client";

function siteBase(req: NextRequest) {
  return (
    process.env.NEXT_PUBLIC_URL ||
    `${req.nextUrl.protocol}//${req.nextUrl.host}`
  );
}

async function processResult(
  reference: string,
  payload: Record<string, unknown>
): Promise<"SUCCESS" | "FAILED" | "PENDING" | "CANCELLED" | "notfound"> {
  const donation = await prisma.donation.findUnique({ where: { reference } });
  if (!donation || !donation.gatewayId) return "notfound";

  const gateway = await prisma.paymentGateway.findUnique({
    where: { id: donation.gatewayId },
  });
  if (!gateway) return "notfound";

  const adapter = getAdapter(gateway.provider);
  if (!adapter) return "notfound";

  // Don't downgrade an already-final donation
  if (donation.status === "SUCCESS") return "SUCCESS";

  const result = await adapter.verifyCallback(payload, gateway);
  if (!result.valid) return "FAILED";

  const status = (result.status || "PENDING") as DonationStatus;
  await prisma.donation.update({
    where: { id: donation.id },
    data: {
      status,
      gatewayReference: result.gatewayReference || donation.gatewayReference,
      metadata: { callback: result.raw ?? payload },
    },
  });
  return status as "SUCCESS" | "FAILED" | "PENDING" | "CANCELLED";
}

/** Teller redirects the donor here with ?code=&status=&reason=&transaction_id= */
export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const ref = params.ref || "";

  let status: string = "FAILED";
  if (ref) {
    status = await processResult(ref, params);
  }

  const base = siteBase(req);
  const dest =
    status === "SUCCESS"
      ? `${base}/get-involved/donate/thank-you?ref=${ref}`
      : `${base}/get-involved/donate/failed?ref=${ref}&status=${status}`;
  return NextResponse.redirect(dest);
}

/** Server-to-server webhook (if the gateway posts callbacks). */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const ref = params.ref || String(body.ref || body.reference || "");

    if (!ref) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }
    const status = await processResult(ref, body);
    return NextResponse.json({ received: true, status });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
