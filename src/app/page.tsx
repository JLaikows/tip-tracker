import db from "@/lib/primsa";
import { COOKIES } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function Home() {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (session) {
    redirect("/dashboard", RedirectType.push);
  } else {
    redirect("/login", RedirectType.push);
  }
}
