import { prisma } from "@/lib/prisma";
import type { PaymentGateway } from "../../../prisma/generated/client";
import type { PaymentGatewayAdapter } from "./types";
import { tellerAdapter } from "./teller";

/**
 * Registry of payment-gateway adapters. To add a new provider, implement
 * PaymentGatewayAdapter and register it here.
 */
const adapters: Record<string, PaymentGatewayAdapter> = {
  teller: tellerAdapter,
};

export function getAdapter(provider: string): PaymentGatewayAdapter | null {
  return adapters[provider] || null;
}

export function listAdapters(): PaymentGatewayAdapter[] {
  return Object.values(adapters);
}

/**
 * Resolve the active gateway to use for a new donation: the one marked
 * default, else the first active gateway, else null.
 */
export async function getActiveGateway(): Promise<{
  gateway: PaymentGateway;
  adapter: PaymentGatewayAdapter;
} | null> {
  const gateway =
    (await prisma.paymentGateway.findFirst({
      where: { isActive: true, isDefault: true },
    })) ||
    (await prisma.paymentGateway.findFirst({ where: { isActive: true } }));

  if (!gateway) return null;
  const adapter = getAdapter(gateway.provider);
  if (!adapter) return null;
  return { gateway, adapter };
}
