// src/app/profile/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Mail,
  ShieldCheck,
  Store,
  ShoppingBag,
  Heart,
  Save,
  CheckCircle,
  MapPin,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, updateProfile, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login?redirect=/profile");
    }
  }, [isAuthenticated, router]);

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [street, setStreet] = useState("742 Evergreen Terrace");
  const [city, setCity] = useState("Springfield");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!currentUser) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, avatar });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt=""
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentUser.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-semibold text-xs rounded-xl transition flex items-center gap-2 w-fit"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2 font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Your profile information has been successfully updated!</span>
        </div>
      )}

      {/* Main Grid: Form + Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Editable Profile Details */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-slate-900">
            Account Information
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Avatar Image URL
              </label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Primary Shipping Address</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Street
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </form>
        </div>

        {/* Right Column: Portal Shortcuts by Role */}
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Role Privileges: {currentUser.role}
            </h3>

            <div className="space-y-2 text-xs">
              <Link
                href="/orders"
                className="p-3 bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 rounded-2xl flex items-center gap-3 transition font-medium"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <span>My Orders & Tracking</span>
              </Link>

              <Link
                href="/wishlist"
                className="p-3 bg-white hover:bg-rose-50 hover:text-rose-700 border border-slate-200 rounded-2xl flex items-center gap-3 transition font-medium"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Saved Wishlist Items</span>
              </Link>

              {currentUser.role === "vendor" && (
                <Link
                  href="/vendor"
                  className="p-3 bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 rounded-2xl flex items-center gap-3 transition font-medium"
                >
                  <Store className="w-4 h-4 text-teal-600" />
                  <span>Vendor Merchant Portal</span>
                </Link>
              )}

              {currentUser.role === "admin" && (
                <Link
                  href="/admin"
                  className="p-3 bg-white hover:bg-purple-50 hover:text-purple-700 border border-slate-200 rounded-2xl flex items-center gap-3 transition font-medium"
                >
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span>Root Platform Governance</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
