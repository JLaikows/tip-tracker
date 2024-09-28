import { redirect, RedirectType } from "next/navigation";
import { COOKIES } from "@/lib/types";
import { cookies } from "next/headers";
import db from "@/lib/primsa";
import axios from "axios";

export default async function Logout() {
  const cookie = cookies();
  const token = cookie.get(COOKIES.Authorization)?.value;

  if (!token) {
    redirect("/login", RedirectType.push);
  }

  try {
    const session = await db.session.delete({ where: { token } });

    if (!session?.id) return <>Failed to log out</>;

    const base = process.env.NEXT_PUBLIC_API_URL;
    await axios.get(`${base}/api/users`);
  } catch (e: unknown) {
    return <>Failed to log out: {(e as { message: string }).message}</>;
  } finally {
    redirect("/login", RedirectType.push);
  }
}

// import { redirect, RedirectType } from "next/navigation";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function Logout() {
//   const base = process.env.NEXT_PUBLIC_API_URL;

//   const logout = async () => {
//     try {
//       const { data } = await axios.get(`${base}/api/users`);

//       if (data.error) throw new Error(data.error);

//       console.log("ran successfully");

//       redirect("/login", RedirectType.push);
//     } catch (e: unknown) {
//       console.log(e);
//       return <>Failed to log out: {(e as { message: string }).message}</>;
//     }
//   };

//   return logout();
// }
