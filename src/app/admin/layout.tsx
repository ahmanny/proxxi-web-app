import type { Metadata } from "next";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

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
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}