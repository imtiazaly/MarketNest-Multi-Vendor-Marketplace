// src/app/register/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import {
  Store,
  UserCheck,
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [role, setRole] = useState<UserRole>("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email) {
      setError("Please complete all required fields.");
      return;
    }

    const res = register({
      name: name.trim(),
      email: email.trim(),
      role,
      storeName: role === "vendor" ? storeName.trim() : undefined,
    });

    if (res.success) {
      if (role === "vendor") router.push("/vendor");
      else router.push("/");
    } else {
      setError(res.error || "Registration failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Join MarketNest
        </h1>
        <p className="text-xs text-slate-500">
          Choose your account type to get started.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Account Type Selector (Customer vs Seller) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            I want to:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("customer")}
              className={`p-3 rounded-2xl border text-left transition flex flex-col gap-1 ${
                role === "customer"
                  ? "border-emerald-600 bg-emerald-50/50 text-emerald-950 font-semibold"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs">Shop Goods</span>
              <span className="text-[10px] text-slate-400 font-normal">
                Customer account
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRole("vendor")}
              className={`p-3 rounded-2xl border text-left transition flex flex-col gap-1 ${
                role === "vendor"
                  ? "border-emerald-600 bg-emerald-50/50 text-emerald-950 font-semibold"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span className="text-xs">Sell as Maker</span>
              <span className="text-[10px] text-slate-400 font-normal">
                Artisan storefront
              </span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 focus:bg-white"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {role === "vendor" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Studio / Store Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Solstice Ceramic Works"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 focus:bg-white"
                />
                <Store className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 focus:bg-white"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 focus:bg-white"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
          >
            <span>
              Create {role === "vendor" ? "Vendor Studio" : "Account"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link
            href="/login"
            className="text-emerald-600 font-bold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
