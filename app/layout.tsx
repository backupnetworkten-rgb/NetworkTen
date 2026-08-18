import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { AuthProvider } from "@/app/context/AuthContext";
import SessionGuard from "@/components/SessionGuard";

export const metadata: Metadata = {
  title: "NetworkTen",
  description:
    "NetworkTen - Smart Networking, Surveillance, Automation & Enterprise IT Solutions",

  metadataBase: new URL("https://networkten.in"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppRouterCacheProvider>

            <Script
              src="https://elfsightcdn.com/platform.js"
              strategy="afterInteractive"
            />

            <SessionGuard>
              {children}
            </SessionGuard>

          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}