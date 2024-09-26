import { cookies } from "next/headers";
import { COOKIES } from "../api/users/route";
import db from "@/lib/primsa";
import { redirect, RedirectType } from "next/navigation";

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
  return children;
}
