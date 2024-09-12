"use client";
import { useAppStore } from "@/lib/hooks/state";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const store = useAppStore();
  const {
    user: { value },
  } = store.getState();

  if (value?.id) {
    return <>{children}</>;
  } else {
    router.push("/login");
  }

  console.log(store);
}
