import { redirect, RedirectType } from "next/navigation";
import { COOKIES } from "@/lib/types";
import { cookies } from "next/headers";
import db from "@/lib/primsa";

export default async function Logout() {
  const token = cookies().get(COOKIES.Authorization)?.value;

  if (!token) {
    redirect("/login", RedirectType.push);
  }

  try {
    await db.session.delete({ where: { token } });
    cookies().delete(COOKIES.Authorization);
  } catch (e: unknown) {
    return <>Failed to log out: {(e as { message: string }).message}</>;
  } finally {
    redirect("/login", RedirectType.push);
  }
}
