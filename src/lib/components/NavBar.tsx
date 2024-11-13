import { Menubar } from "primereact/menubar";
import logo from "@/images/just logo transparent.png";
import Image from "next/image";

const endLogo = (
  <div className="flex flex-row">
    <div>Admin &nbsp;</div>
    <Image aria-hidden src={logo} alt="File icon" width={24} height={24} />
  </div>
);

const loggedInOptions = [
  {
    label: "Dashboard",
    url: "/dashboard",
  },
  {
    label: "Settings",
    // url: "/settings",
  },
  {
    label: "Logout",
    url: "/logout",
  },
];

export default async function NavBar() {
  return <Menubar model={loggedInOptions} end={endLogo} />;
}
