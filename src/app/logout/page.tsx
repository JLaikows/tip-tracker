import { redirect, RedirectType } from "next/navigation";
import { COOKIES } from "../api/users/route";
import { cookies } from "next/headers";
import db from "@/lib/primsa";

export default async function Logout() {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.delete({ where: { token } });

  if (!session?.id) return <>Failed to log out</>;

  return redirect("/login", RedirectType.push);
}
