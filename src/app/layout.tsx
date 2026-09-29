// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/context/AppProviders";
import RoleSwitcherBanner from "@/components/RoleSwitcherBanner";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarketNest — Curated Multi-Vendor Marketplace",
  description:
    "Discover handcrafted goods, artisan creations, and premium tech from independent makers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased`}
      >
        <AppProviders>
          {/* Top Demo Switcher for Recruiters / Showcase */}
          <RoleSwitcherBanner />

          {/* Sticky Navbar */}
          <Navbar />

          {/* Slide-over Cart Drawer */}
          <CartDrawer />

          {/* Main Viewport */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}