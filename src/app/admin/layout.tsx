import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Proxxi Admin",
    template: "%s | Proxxi Admin",
  },
  description: "Proxxi Admin Panel — Manage providers, consumers, bookings, and more.",
  icons: {
    icon: "/logo.png",
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}