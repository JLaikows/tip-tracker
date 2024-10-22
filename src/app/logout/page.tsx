import { redirect, RedirectType } from "next/navigation";
import { COOKIES } from "@/lib/types";
import { cookies } from "next/headers";
import axios from "axios";

export default async function Logout() {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const base = process.env.NEXT_PUBLIC_API_URL;

  if (!token) {
    redirect("/login", RedirectType.push);
  }

  try {
    await axios.delete(`${base}/api/users`);
  } catch (e: unknown) {
    return <>Failed to log out: {(e as { message: string }).message}</>;
  } finally {
    redirect("/login", RedirectType.push);
  }
}
