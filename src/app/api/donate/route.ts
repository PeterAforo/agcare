import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getActiveGateway } from "@/lib/payments/registry";
import { randomBytes } from "crypto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function baseUrl(req: NextRequest) {
  return (
    process.env.NEXT_PUBLIC_URL ||
    `${req.nextUrl.protocol}//${req.nextUrl.host}`
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const amount = parseFloat(body.amount);
    const cause = String(body.cause || "").trim();
    const message = String(body.message || "").trim();
    const currency = String(body.currency || "GHS").toUpperCase();

    if (!name || !email || !(amount > 0)) {
      return NextResponse.json(
        { error: "Name, valid email, and a positive amount are required." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const active = await getActiveGateway();
    if (!active) {
      return NextResponse.json(
        { error: "No payment gateway is configured." },
        { status: 503 }
      );
    }

    const reference = `DON-${Date.now()}-${randomBytes(4).toString("hex")}`.toUpperCase();

    const donation = await prisma.donation.create({
      data: {
        reference,
        donorName: name,
        donorEmail: email,
        donorPhone: phone || null,
        amount,
        currency,
        cause: cause || null,
        message: message || null,
        status: "PENDING",
        gatewayId: active.gateway.id,
      },
    });

    const base = baseUrl(req);
    const result = await active.adapter.initiatePayment({
      reference,
      amount,
      currency,
      description: cause ? `Donation — ${cause}` : "Donation to AGREDS",
      customerName: name,
      customerEmail: email,
      customerPhone: phone || undefined,
      returnUrl: `${base}/api/donate/callback?ref=${reference}`,
      callbackUrl: `${base}/api/donate/callback`,
      gateway: active.gateway,
    });

    if (result.error || !result.checkoutUrl) {
      await prisma.donation.update({
        where: { id: donation.id },
        data: { status: "FAILED", metadata: { initiateError: result.error } },
      });
      return NextResponse.json(
        { error: result.error || "Could not initiate payment." },
        { status: 502 }
      );
    }

    return NextResponse.json({ checkoutUrl: result.checkoutUrl, reference });
  } catch (err) {
    console.error("Donate initiate error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
