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
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { totalItems, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                href="/products?category=Home%20%26%20Living"
                className="hover:text-emerald-600 transition"
              >
                Home & Living
              </Link>
              <Link
                href="/products?category=Electronics"
                className="hover:text-emerald-600 transition"
              >
                Tech Gear
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

          {/* Action Icons */}
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

            {/* User Avatar Badge */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-900 leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-slate-400 capitalize">
                  {currentUser.role}
                </span>
              </div>
            </div>

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
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:bg-slate-100 rounded"
              >
                My Wishlist ({totalWishlistItems})
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
