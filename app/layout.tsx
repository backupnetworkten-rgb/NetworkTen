import type { Metadata } from "next";

import Script from "next/script";

import "./globals.css";

import { AppRouterCacheProvider }
from "@mui/material-nextjs/v15-appRouter";

import {
AuthProvider
}
from "@/app/context/AuthContext";

export const metadata: Metadata = {
  title: "NetworkTen",

  description:
    "NetworkTen - Smart Networking, Surveillance, Automation & Enterprise IT Solutions",

    icons: {
    icon: "/favicon.png",
  },

    
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

          {/* ELFSIGHT SCRIPT */}

          <Script
            src="https://elfsightcdn.com/platform.js"
            strategy="afterInteractive"
          />

          {children}

        </AppRouterCacheProvider>

        </AuthProvider>

      </body>

    </html>
  );
}