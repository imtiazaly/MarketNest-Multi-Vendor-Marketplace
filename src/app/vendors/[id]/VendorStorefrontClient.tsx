"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMarketplace } from "@/context/MarketplaceContext";
import ProductCard from "@/components/ProductCard";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  Star,
  BadgeCheck,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Package,
  ArrowLeft,
  Search,
  AlertCircle,
} from "lucide-react";

export default function VendorStorefrontClient({
  vendorId,
}: {
  vendorId: string;
}) {
  const { getVendorById, getProductsByVendor } = useMarketplace();
  const [storeSearch, setStoreSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const vendor = getVendorById(vendorId);
  const vendorProducts = getProductsByVendor(vendorId);

  if (!vendor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900">Studio Not Found</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          The artisan studio you requested could not be located.
        </p>
        <Link
          href="/vendors"
          className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
        >
          Back to All Makers
        </Link>
      </div>
    );
  }

  // Filter products by in-store search & category
  const filteredProducts = vendorProducts.filter((prod) => {
    if (selectedCategory !== "All" && prod.category !== selectedCategory) {
      return false;
    }
    if (
      storeSearch.trim() &&
      !prod.title.toLowerCase().includes(storeSearch.toLowerCase()) &&
      !prod.description.toLowerCase().includes(storeSearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const categories = [
    "All",
    ...Array.from(new Set(vendorProducts.map((p) => p.category))),
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Storefront Hero Banner */}
      <div className="relative">
        <div className="h-60 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img
            src={vendor.banner}
            alt={vendor.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
        </div>

        {/* Storefront Header Overlay Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white flex-shrink-0">
                <img
                  src={vendor.logo}
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {vendor.name}
                  </h1>
                  {vendor.isVerified && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Maker
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                  {vendor.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {vendor.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Joined {formatDate(vendor.joinedDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-around md:justify-start">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-base">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{vendor.rating}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {vendor.totalReviews} Reviews
                </p>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-slate-900 font-bold text-base">
                  <Package className="w-4 h-4 text-slate-500" />
                  <span>{vendorProducts.length}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Creations</p>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div className="text-center">
                <span className="font-bold text-emerald-700 text-base">
                  {formatPrice(vendor.totalSales)}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">Fulfilled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Storefront Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link & In-Store Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Makers Directory</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition font-medium ${
                    selectedCategory === cat
                      ? "bg-white text-emerald-700 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* In-store Search */}
            <div className="relative">
              <input
                type="text"
                placeholder={`Search in ${vendor.name}...`}
                value={storeSearch}
                onChange={(e) => setStoreSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            </div>
          </div>
        </div>

        {/* Store Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Package className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-sm text-slate-800">
              No matching products in this studio
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Try choosing another category or clearing your search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
