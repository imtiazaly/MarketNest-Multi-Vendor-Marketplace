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

const FAVICON_DATA_URI =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIiBmaWxsPSJub25lIj4KICA8cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI4IiBmaWxsPSJ1cmwoI21hcmtldG5lc3RfZ3JhZCkiLz4KICA8cGF0aCBkPSJNNyAxMy41TDguNSA3SDIzLjVMMjUgMTMuNU03IDEzLjVWMjRDNyAyNC41NTIzIDcuNDQ3NzIgMjUgOCAyNUgyNEMyNC41NTIzIDI1IDI1IDI0LjU1MjMgMjUgMjRWMTMuNU03IDEzLjVIMjVNMTIgMjVWMThDMTIgMTcuNDQ3NyAxMi40NDc3IDE3IDEzIDE3SDE5QzE5LjU1MjMgMTcgMjAgMTcuNDQ3NyAyMCAxOFYyNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibWFya2V0bmVzdF9ncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIzMiIgeTI9IjMyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwNTk2NjkiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTRCOEE2Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KPC9zdmc+Cg==";

export const metadata: Metadata = {
  title: "MarketNest | Multi-Vendor Marketplace",
  description:
    "Discover handcrafted goods, artisan creations, and premium tech from independent makers.",
  icons: {
    icon: FAVICON_DATA_URI,
    shortcut: FAVICON_DATA_URI,
    apple: FAVICON_DATA_URI,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href={FAVICON_DATA_URI} />
      </head>
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