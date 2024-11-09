import { cookies } from "next/headers";
import { COOKIES } from "@/lib/types";
import db from "@/lib/primsa";
import { redirect, RedirectType } from "next/navigation";
import { TabMenu } from "primereact/tabmenu";

const items = [
  { label: "Overview", icon: "pi pi-home", url: "/dashboard" },
  { label: "Payouts", icon: "pi pi-chart-line", url: "/dashboard/payouts" },
  { label: "Invoices", icon: "pi pi-chart-line", url: "/dashboard/invoices" },
  { label: "Clients", icon: "pi pi-chart-line", url: "/dashboard/clients" },
];

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (!session?.userId) {
    redirect("/login", RedirectType.push);
  }
  return (
    <>
      <TabMenu model={items} />
      {children}
    </>
  );
}
