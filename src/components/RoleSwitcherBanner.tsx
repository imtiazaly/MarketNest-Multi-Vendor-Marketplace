// src/components/RoleSwitcherBanner.tsx
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useMarketplace } from "@/context/MarketplaceContext";
import {
  ShieldCheck,
  Store,
  UserCheck,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export default function RoleSwitcherBanner() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, switchUser, availableUsers } = useAuth();
  const { vendors } = useMarketplace();

  const handleRoleSelect = (role: "customer" | "vendor" | "admin") => {
    if (role === "customer") {
      const customerUser = availableUsers.find((u) => u.role === "customer");
      if (customerUser) switchUser(customerUser.id);
      // Agar user vendor ya admin dashboard par tha, to customer store par redirect karein
      if (pathname.startsWith("/vendor") || pathname.startsWith("/admin")) {
        router.push("/");
      }
    } else if (role === "vendor") {
      // Current active vendor ya pehla vendor select karein
      const vendorUser =
        availableUsers.find(
          (u) => u.id === currentUser.id && u.role === "vendor",
        ) || availableUsers.find((u) => u.role === "vendor");
      if (vendorUser) switchUser(vendorUser.id);
      if (!pathname.startsWith("/vendor")) {
        router.push("/vendor");
      }
    } else if (role === "admin") {
      const adminUser = availableUsers.find((u) => u.role === "admin");
      if (adminUser) switchUser(adminUser.id);
      if (!pathname.startsWith("/admin")) {
        router.push("/admin");
      }
    }
  };

  const handleVendorStoreChange = (vendorId: string) => {
    const matchedUser = availableUsers.find((u) => u.vendorId === vendorId);
    if (matchedUser) {
      switchUser(matchedUser.id);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Active Mode Info */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Portfolio Showcase:
          </span>
          <span className="text-slate-400 hidden sm:inline">Active Role:</span>
          <span className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono font-medium border border-slate-700 uppercase">
            {currentUser.role}
          </span>
          <span className="text-slate-400 hidden md:inline">
            ({currentUser.name})
          </span>
        </div>

        {/* Right: Scalable 3-Role Switcher + Dynamic Studio Dropdown */}
        <div className="flex items-center gap-2.5">
          <span className="text-slate-400 hidden lg:inline text-[11px]">
            Switch Mode:
          </span>

          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            {/* 1. Customer Tab */}
            <button
              onClick={() => handleRoleSelect("customer")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                currentUser.role === "customer"
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
                currentUser.role === "vendor"
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
                currentUser.role === "admin"
                  ? "bg-purple-600 text-white font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Scalable Vendor Store Dropdown (Only visible when in Vendor mode) */}
          {currentUser.role === "vendor" && (
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
        </div>
      </div>
    </div>
  );
}