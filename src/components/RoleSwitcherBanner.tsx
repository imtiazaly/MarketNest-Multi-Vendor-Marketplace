// src/components/RoleSwitcherBanner.tsx
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ShieldCheck, Store, UserCheck, Sparkles, LogIn } from "lucide-react";
import Link from "next/link";

export default function RoleSwitcherBanner() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, quickLogin } = useAuth();
  const { vendors } = useMarketplace();

  const handleRoleSelect = (role: "customer" | "vendor" | "admin") => {
    quickLogin(role);
    if (role === "customer") {
      if (pathname.startsWith("/vendor") || pathname.startsWith("/admin")) {
        router.push("/");
      }
    } else if (role === "vendor") {
      router.push("/vendor");
    } else if (role === "admin") {
      router.push("/admin");
    }
  };

  const handleVendorStoreChange = (vendorId: string) => {
    quickLogin("vendor", vendorId);
  };

  return (
    <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Active Mode Info (Safe for null/Logged out) */}
        <div className="flex items-center gap-2">
          <span
            className={`flex h-2 w-2 rounded-full ${
              currentUser ? "bg-emerald-400 animate-pulse" : "bg-slate-500"
            }`}
          />
          <span className="font-semibold text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Portfolio Showcase:
          </span>
          <span className="text-slate-400 hidden sm:inline">Active Role:</span>
          {currentUser ? (
            <>
              <span className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono font-medium border border-slate-700 uppercase">
                {currentUser.role}
              </span>
              <span className="text-slate-400 hidden md:inline">
                ({currentUser.name})
              </span>
            </>
          ) : (
            <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono text-[11px] border border-slate-700">
              Guest (Logged Out)
            </span>
          )}
        </div>

        {/* Right: 3-Role Switcher + Quick Login */}
        <div className="flex items-center gap-2.5">
          <span className="text-slate-400 hidden lg:inline text-[11px]">
            {currentUser ? "Switch Mode:" : "Instant Demo Login:"}
          </span>

          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            {/* 1. Customer Tab */}
            <button
              onClick={() => handleRoleSelect("customer")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                currentUser?.role === "customer"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>

            {/* 2. Vendor Tab */}
            <button
              onClick={() => handleRoleSelect("vendor")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                currentUser?.role === "vendor"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Vendor</span>
            </button>

            {/* 3. Admin Tab */}
            <button
              onClick={() => handleRoleSelect("admin")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                currentUser?.role === "admin"
                  ? "bg-purple-600 text-white font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Scalable Vendor Store Dropdown (Only visible when logged in as Vendor) */}
          {currentUser?.role === "vendor" && (
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
              <span className="text-slate-400 text-[11px] hidden sm:inline">
                Studio:
              </span>
              <select
                value={currentUser.vendorId || "vnd-1"}
                onChange={(e) => handleVendorStoreChange(e.target.value)}
                className="bg-transparent text-emerald-400 font-semibold text-xs outline-none cursor-pointer"
              >
                {vendors.map((v) => (
                  <option
                    key={v.id}
                    value={v.id}
                    className="bg-slate-900 text-white"
                  >
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!currentUser && (
            <Link
              href="/login"
              className="ml-1 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 px-2.5 py-1 rounded border border-emerald-500/40 transition font-medium flex items-center gap-1 text-[11px]"
            >
              <LogIn className="w-3 h-3" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}