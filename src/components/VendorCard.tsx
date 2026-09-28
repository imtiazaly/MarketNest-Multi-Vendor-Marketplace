import React from "react";
import Link from "next/link";
import { Vendor } from "@/types";
import { formatPrice } from "@/lib/utils";
import { BadgeCheck, Star, Package, ArrowUpRight } from "lucide-react";

interface VendorCardProps {
  vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Banner */}
      <div className="relative h-28 w-full bg-slate-100 overflow-hidden">
        <img
          src={vendor.banner}
          alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="p-5 pt-0 relative flex-1 flex flex-col justify-between">
        <div>
          {/* Logo overlapping banner */}
          <div className="-mt-8 mb-3 flex items-end justify-between">
            <div className="relative w-16 h-16 rounded-xl border-2 border-white shadow-md overflow-hidden bg-white">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="w-full h-full object-cover"
              />
            </div>
            {vendor.isVerified && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Maker
              </span>
            )}
          </div>

          <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition">
            <Link href={`/vendors/${vendor.id}`}>{vendor.name}</Link>
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {vendor.description}
          </p>
        </div>

        {/* Stats & Link */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
            <div className="bg-slate-50 p-2 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{vendor.rating}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Rating</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-slate-800 font-bold">
                <Package className="w-3.5 h-3.5 text-slate-500" />
                <span>{vendor.totalProducts}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Products</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
              <span className="font-bold text-emerald-700">
                {formatPrice(vendor.totalSales)}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">Sales</p>
            </div>
          </div>

          <Link
            href={`/vendors/${vendor.id}`}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition duration-200"
          >
            <span>Visit Storefront</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}