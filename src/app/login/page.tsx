// src/app/login/page.tsx
"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Store,
  ShieldCheck,
  UserCheck,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { login, quickLogin, isAuthenticated, currentUser } = useAuth();
  const [email, setEmail] = useState("alex@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = login(email);
    if (result.success) {
      router.push(redirectUrl);
    } else {
      setError(result.error || "Authentication failed.");
    }
  };

  const handleDemoLogin = (
    role: "customer" | "vendor" | "admin",
    vendorId?: string,
  ) => {
    quickLogin(role, vendorId);
    if (role === "vendor") router.push("/vendor");
    else if (role === "admin") router.push("/admin");
    else router.push(redirectUrl);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
            <Store className="w-5 h-5" />
          </div>
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Welcome to MarketNest
        </h1>
        <p className="text-xs text-slate-500">
          Sign in to manage your orders, artisan studio, or platform operations.
        </p>
      </div>

      {/* Recruiter / Quick 1-Click Demo Login Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-3 shadow-lg border border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
          <Sparkles className="w-4 h-4" />
          <span>Hiring Manager / Demo 1-Click Login:</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Instant access to all 3 platform roles without typing passwords:
        </p>
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleDemoLogin("customer")}
            className="p-2 bg-slate-800 hover:bg-emerald-600 rounded-xl text-center transition flex flex-col items-center gap-1 text-[11px] font-semibold"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Customer</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin("vendor", "vnd-1")}
            className="p-2 bg-slate-800 hover:bg-emerald-600 rounded-xl text-center transition flex flex-col items-center gap-1 text-[11px] font-semibold"
          >
            <Store className="w-4 h-4 text-teal-400" />
            <span>Vendor</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin("admin")}
            className="p-2 bg-slate-800 hover:bg-purple-600 rounded-xl text-center transition flex flex-col items-center gap-1 text-[11px] font-semibold"
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Manual Login Form */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleManualLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 focus:bg-white"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <span className="text-[11px] text-emerald-600 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 focus:bg-white"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
          >
            <span>Sign In to Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-emerald-600 font-bold hover:underline"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-slate-500">
          Loading authentication gateway...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
