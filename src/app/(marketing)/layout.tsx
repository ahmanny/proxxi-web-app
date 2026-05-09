import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LandingLayout } from "@/components/my-ui/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://proxxi.app"
  ),
  title: {
    default: "Proxxi - Book Trusted Service Providers in Nigeria",
    template: "%s | Proxxi",
  },
  description:
    "Connect with verified barbers, hair stylists, electricians, plumbers, mechanics and more. Book trusted service providers in minutes with Proxxi.",
  keywords: [
    "service providers Nigeria",
    "book barber",
    "electrician near me",
    "plumber Lagos",
    "home services Nigeria",
    "Proxxi",
  ],
  openGraph: {
    title: "Proxxi - Book Trusted Service Providers in Nigeria",
    description:
      "Connect with verified service providers in minutes. Book barbers, stylists, electricians, plumbers and more.",
    url: "https://proxxi.app",
    siteName: "Proxxi",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proxxi - Book Trusted Service Providers in Nigeria",
    description:
      "Connect with verified service providers in minutes. Book barbers, stylists, electricians, plumbers and more.",
  },
  icons: {
    icon: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LandingLayout>{children}</LandingLayout>;
}