"use client";

import React, { useState } from "react";
import { useMarketplace } from "@/context/MarketplaceContext";
import VendorCard from "@/components/VendorCard";
import { Search, Store, ShieldCheck, Sparkles } from "lucide-react";

export default function VendorsDirectoryPage() {
  const { vendors } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVendors = vendors.filter((vendor) => {
    const q = searchQuery.toLowerCase();
    return (
      vendor.name.toLowerCase().includes(q) ||
      vendor.description.toLowerCase().includes(q) ||
      vendor.address.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Curated Independent Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Meet Our Independent Makers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Every store on MarketNest is an independently operated studio,
          workshop, or boutique laboratory committed to quality and
          craftsmanship.
        </p>

        {/* Search Studio */}
        <div className="pt-4 max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search by studio name, specialty, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl shadow-xs outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Directory Grid */}
      {filteredVendors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <Store className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="font-bold text-sm text-slate-800">No studios found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try searching for another studio name or term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}

      {/* Seller Invitation Banner */}
      <div className="p-8 bg-emerald-950 text-emerald-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Join Our Network</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Do you craft unique products?
          </h3>
          <p className="text-xs text-emerald-200 max-w-md">
            Open your storefront on MarketNest and sell to thousands of
            conscious buyers with complete control over your catalog.
          </p>
        </div>

        <a
          href="/vendor"
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-md transition whitespace-nowrap"
        >
          Open Vendor Dashboard &rarr;
        </a>
      </div>
    </div>
  );
}
