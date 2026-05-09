import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/components/my-ui/Providers/TanstackQueryProvider";
import { Suspense } from "react";
import PageSkeleton from "@/components/my-ui/loaders/skeletons/PageSkeleton";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proxxi",
  description: "ServiceHub - Book trusted service providers",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body className={`bg-background-b1 ${inter.className}`}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <QueryProvider>
            <Toaster position="top-center" />
            <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
          </QueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
