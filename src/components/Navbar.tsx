// src/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import {
  ShoppingBag,
  Heart,
  Search,
  Store,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { totalItems, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
                <Store className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight text-slate-900 flex items-center gap-1">
                  Market<span className="text-emerald-600">Nest</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase">
                  Multi-Vendor Hub
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link
                href="/products"
                className="hover:text-emerald-600 transition"
              >
                Explore All
              </Link>
              <Link
                href="/vendors"
                className="hover:text-emerald-600 transition"
              >
                Our Makers
              </Link>
              <Link
                href="/orders"
                className="hover:text-emerald-600 transition"
              >
                My Orders
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search handcrafted items, electronics, makers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-100 hover:bg-slate-200/70 focus:bg-white border border-transparent focus:border-emerald-500 rounded-full outline-none transition duration-150 text-slate-800 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            </form>
          </div>

          {/* Action Icons & User Session */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-full transition"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition flex items-center gap-1.5"
              title="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Profile Dropdown or Sign In Button */}
            {isAuthenticated && currentUser ? (
              <div className="relative pl-2 border-l border-slate-200">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                  />
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-xs text-slate-700"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {currentUser.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>My Profile Settings</span>
                    </Link>

                    <Link
                      href="/orders"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition"
                    >
                      <ShoppingBag className="w-4 h-4 text-slate-500" />
                      <span>Order History & Tracking</span>
                    </Link>

                    {currentUser.role === "vendor" && (
                      <Link
                        href="/vendor"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition text-emerald-700 font-semibold"
                      >
                        <Store className="w-4 h-4" />
                        <span>Vendor Dashboard</span>
                      </Link>
                    )}

                    {currentUser.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition text-purple-700 font-semibold"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Admin Governance</span>
                      </Link>
                    )}

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 transition text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-xs transition"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>
            <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700 pt-2">
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:bg-slate-100 rounded"
              >
                Explore All Products
              </Link>
              <Link
                href="/vendors"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:bg-slate-100 rounded"
              >
                Browse Makers & Vendors
              </Link>
              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:bg-slate-100 rounded"
              >
                My Orders
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:bg-slate-100 rounded"
              >
                Profile & Settings
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
