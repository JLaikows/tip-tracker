"use client";

import { FC } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IServerSideToast {
  alerts: string[];
}

interface IAlert {
  message: string;
}

const Alert: FC<IAlert> = ({ message }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/invoices");
  };

  return <div onClick={handleClick}>{message}</div>;
};

const ServerSideToast: FC<IServerSideToast> = ({ alerts }) => {
  for (const a of alerts) {
    toast.warn(<Alert message={a} />, {});
  }
  return null;
};

export { ServerSideToast };
