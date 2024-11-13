"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";
import { TabMenu as BaseTabMenu } from "primereact/tabmenu";

const items = [
  { label: "Overview", icon: "pi pi-home", url: "/dashboard" },
  { label: "Payouts", icon: "pi pi-chart-line", url: "/dashboard/payouts" },
  { label: "Invoices", icon: "pi pi-chart-line", url: "/dashboard/invoices" },
  { label: "Clients", icon: "pi pi-chart-line", url: "/dashboard/clients" },
];

export const TabMenu: FC = () => {
  const path = usePathname();
  const index = items.findIndex((ele) => ele.url === path);

  return <BaseTabMenu model={items} activeIndex={index} />;
};
