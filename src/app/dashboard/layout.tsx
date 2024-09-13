import Auth from "@/lib/components/Auth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   return <Auth>{children}</Auth>;
  return children;
}
