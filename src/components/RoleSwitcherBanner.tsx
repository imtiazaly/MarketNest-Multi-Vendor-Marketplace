"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Store, UserCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RoleSwitcherBanner() {
  const { currentUser, switchUser, availableUsers } = useAuth();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Portfolio Showcase Mode:
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Active Persona:
          </span>
          <span className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono font-medium border border-slate-700">
            {currentUser.name} ({currentUser.role.toUpperCase()})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 hidden md:inline">Switch Role:</span>
          <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
            {availableUsers.map((user) => {
              const isActive = user.id === currentUser.id;
              const Icon =
                user.role === "admin"
                  ? ShieldCheck
                  : user.role === "vendor"
                    ? Store
                    : UserCheck;

              return (
                <button
                  key={user.id}
                  onClick={() => switchUser(user.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                    isActive
                      ? "bg-emerald-500 text-white font-medium shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                  }`}
                  title={`Switch to ${user.name} (${user.role})`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{user.role}</span>
                </button>
              );
            })}
          </div>

          {currentUser.role === "vendor" && (
            <Link
              href="/vendor"
              className="ml-2 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 px-2.5 py-1 rounded border border-emerald-500/40 transition font-medium flex items-center gap-1"
            >
              <Store className="w-3 h-3" />
              Vendor Dashboard &rarr;
            </Link>
          )}

          {currentUser.role === "admin" && (
            <Link
              href="/admin"
              className="ml-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 px-2.5 py-1 rounded border border-purple-500/40 transition font-medium flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3" />
              Admin Portal &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
