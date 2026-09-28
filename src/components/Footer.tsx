import React from "react";
import Link from "next/link";
import { Store, ShieldCheck, Heart, Truck, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      {/* Marketplace Feature Highlights */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100">Direct From Independent Makers</h4>
              <p className="text-xs text-slate-400">Support verified artisans and small businesses.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100">Consolidated Shipping</h4>
              <p className="text-xs text-slate-400">Orders over $100 ship free across all vendors.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100">Buyer Protection Guaranteed</h4>
              <p className="text-xs text-slate-400">Secure checkout with full refund protection.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold text-slate-100 mb-4">Shop Marketplace</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/products" className="hover:text-emerald-400 transition">All Products</Link></li>
            <li><Link href="/products?category=Home%20%26%20Living" className="hover:text-emerald-400 transition">Home & Living</Link></li>
            <li><Link href="/products?category=Electronics" className="hover:text-emerald-400 transition">Electronics & Tech</Link></li>
            <li><Link href="/products?category=Fashion" className="hover:text-emerald-400 transition">Artisan Fashion</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-100 mb-4">Independent Makers</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/vendors" className="hover:text-emerald-400 transition">All Storefronts</Link></li>
            <li><Link href="/vendor" className="hover:text-emerald-400 transition">Vendor Dashboard</Link></li>
            <li><Link href="/admin" className="hover:text-emerald-400 transition">Platform Governance</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-100 mb-4">Customer Care</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/wishlist" className="hover:text-emerald-400 transition">Saved Wishlist</Link></li>
            <li><Link href="/checkout" className="hover:text-emerald-400 transition">Order Tracking</Link></li>
            <li><span className="text-slate-500">24/7 Support Desk</span></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-100 mb-4">About MarketNest</h3>
          <p className="text-xs leading-relaxed text-slate-400 mb-4">
            A flagship Next.js 14 multi-vendor platform built with React Context API and modern frontend engineering.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Internship Showcase</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} MarketNest Marketplace. Engineered for excellence.
      </div>
    </footer>
  );
}