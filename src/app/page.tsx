"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/context/MarketplaceContext";
import ProductCard from "@/components/ProductCard";
import VendorCard from "@/components/VendorCard";
import { PRODUCT_CATEGORIES } from "@/data/mockData";
import {
  ArrowRight,
  Sparkles,
  Store,
  ShieldCheck,
  TrendingUp,
  PackageCheck,
} from "lucide-react";

export default function HomePage() {
  const { products, vendors } = useMarketplace();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const recentProducts = products.slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-slate-50 border-b border-slate-200/60 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Independent Maker Network &bull; Spring Collection</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Curated craftsmanship, straight from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                independent makers.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              MarketNest connects discerning buyers with visionary artisans,
              craftsmen, and independent tech studios. One unified checkout with
              multi-vendor fulfillment.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 group"
              >
                <span>Explore All Goods</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/vendors"
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm rounded-xl border border-slate-200/80 shadow-xs transition"
              >
                Browse Makers
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="text-2xl font-bold text-slate-900">50+</p>
                <p className="text-xs text-slate-500">Verified Makers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">4.9 / 5.0</p>
                <p className="text-xs text-slate-500">Avg Customer Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">100%</p>
                <p className="text-xs text-slate-500">Authentic Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Browse by Department
            </h2>
            <p className="text-xs text-slate-500">
              Explore curated creations tailored to your aesthetic
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>View Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={
                cat === "All"
                  ? "/products"
                  : `/products?category=${encodeURIComponent(cat)}`
              }
              className="px-4 py-2.5 bg-white hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium text-xs rounded-xl border border-slate-200/70 whitespace-nowrap shadow-2xs transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Staff Picks
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              Featured Creations
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>See All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Vendor Spotlight (Makers Grid) */}
      <section className="bg-slate-100/60 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Verified Studios
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Meet Independent Makers
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Each product is crafted, packaged, and shipped directly by the
                maker.
              </p>
            </div>
            <Link
              href="/vendors"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All Studios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </section>

      {/* Fresh Drops (Recent Inventory) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Inventory Feed
            </span>
            <h2 className="text-2xl font-bold text-slate-900">Fresh Drops</h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Marketplace Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500/30">
              Maker Friendly Platform
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Are you an independent maker or boutique brand?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Open your storefront on MarketNest, reach thousands of conscious
              buyers, and manage orders with our dedicated vendor dashboard.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/vendor"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-md text-center transition"
            >
              Open Vendor Portal &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
