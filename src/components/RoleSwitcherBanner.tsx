// src/components/RoleSwitcherBanner.tsx
"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  Store,
  UserCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function RoleSwitcherBanner() {
  const { currentUser, switchUser, availableUsers } = useAuth();

  return (
    <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Active Persona indicator */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Portfolio Demo:
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Active Persona:
          </span>
          <span className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono font-medium border border-slate-700">
            {currentUser.name} ({currentUser.role.toUpperCase()})
          </span>
        </div>

        {/* Switch Persona Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 hidden md:inline text-[11px]">
            Switch Persona:
          </span>

          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            {/* 1. Customer Button (Alex) */}
            <button
              onClick={() => switchUser("usr-1")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition ${
                currentUser.id === "usr-1"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Customer (Alex)</span>
            </button>

            {/* 2. Vendor 1 (Elena - Nordic Studio) */}
            <button
              onClick={() => switchUser("usr-2")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition ${
                currentUser.id === "usr-2"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Vendor (Nordic Studio)</span>
            </button>

            {/* 3. Vendor 2 (Marcus - Vance Tech) */}
            <button
              onClick={() => switchUser("usr-3")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition ${
                currentUser.id === "usr-3"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Vendor (Vance Tech)</span>
            </button>

            {/* 4. Admin Button */}
            <button
              onClick={() => switchUser("usr-admin")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition ${
                currentUser.id === "usr-admin"
                  ? "bg-purple-600 text-white font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Quick Dashboard Shortcut link */}
          {currentUser.role === "vendor" && (
            <Link
              href="/vendor"
              className="ml-2 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 px-2.5 py-1 rounded border border-emerald-500/40 transition font-medium flex items-center gap-1"
            >
              <Store className="w-3 h-3" />
              <span>Vendor Panel &rarr;</span>
            </Link>
          )}

          {currentUser.role === "admin" && (
            <Link
              href="/admin"
              className="ml-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 px-2.5 py-1 rounded border border-purple-500/40 transition font-medium flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Panel &rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
