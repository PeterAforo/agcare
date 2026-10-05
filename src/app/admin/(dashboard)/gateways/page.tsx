import { prisma } from "@/lib/prisma";
import { getSessionUser, hasMinRole } from "@/lib/rbac";
import { listAdapters } from "@/lib/payments/registry";
import Forbidden from "@/components/admin/Forbidden";
import GatewayManager from "./GatewayManager";

export default async function GatewaysPage() {
  const user = await getSessionUser();
  if (!user || !hasMinRole(user.role, "ADMIN")) {
    return <Forbidden message="Only administrators can manage payment gateways." />;
  }

  const gateways = await prisma.paymentGateway.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { donations: true } } },
  });

  const providers = listAdapters().map((a) => ({
    provider: a.provider,
    label: a.label,
    credentialFields: a.credentialFields,
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Payment Gateways</h1>
        <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>
          Configure payment providers for online donations. The default active gateway is used on the donate page.
        </p>
      </div>
      <GatewayManager gateways={JSON.parse(JSON.stringify(gateways))} providers={providers} />
    </div>
  );
}
