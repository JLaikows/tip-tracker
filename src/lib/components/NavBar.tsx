import { Menubar } from "primereact/menubar";
import logo from "@/images/just logo transparent.png";
import Image from "next/image";
import { cookies } from "next/headers";
import { COOKIES } from "../types";
import db from "../primsa";

const endLogo = (
  <div className="flex flex-row">
    <div>Tip Tracker &nbsp;</div>
    <Image aria-hidden src={logo} alt="File icon" width={24} height={24} />
  </div>
);

const signedOutOptions = [
  {
    label: "Login",
    url: "/login",
  },
  {
    label: "Sign Up",
    url: "/signup",
  },
];

const loggedInOptions = [
  {
    label: "Dashboard",
    url: "/dashboard",
  },
  {
    label: "Clients",
    url: "/dashboard/clients",
  },
  {
    label: "Logout",
    url: "/logout",
  },
];

export default async function NavBar() {
  const token = cookies().get(COOKIES.Authorization)?.value;

  let session = undefined;

  if (token) {
    session = await db.session.findFirst({ where: { token } });
  }

  const menuOptions = !!session?.id ? loggedInOptions : signedOutOptions;

  return <Menubar model={menuOptions} end={endLogo} />;
}
