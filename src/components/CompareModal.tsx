// src/components/CompareModal.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import {
  X,
  Star,
  ShoppingBag,
  Store,
  CheckCircle,
  XCircle,
  GitCompareArrows,
} from "lucide-react";

export default function CompareModal() {
  const { compareList, removeFromCompare, clearCompare, closeCompare } =
    useCompare();
  const { addToCart } = useCart();

  if (compareList.length === 0) return null;

  // Rows to compare
  const rows: { label: string; key: string }[] = [
    { label: "Price", key: "price" },
    { label: "Category", key: "category" },
    { label: "Rating", key: "rating" },
    { label: "Reviews", key: "reviewCount" },
    { label: "Stock", key: "stock" },
    { label: "Vendor", key: "vendorName" },
  ];

  const getCellValue = (product: (typeof compareList)[0], key: string) => {
    switch (key) {
      case "price":
        return (
          <div>
            <span className="font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-slate-400 line-through ml-1">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        );
      case "rating":
        return (
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        );
      case "stock":
        return product.stock > 0 ? (
          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
            <CheckCircle className="w-3.5 h-3.5" /> In Stock ({product.stock})
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-rose-600 font-semibold text-xs">
            <XCircle className="w-3.5 h-3.5" /> Out of Stock
          </span>
        );
      case "vendorName":
        return (
          <Link
            href={`/vendors/${product.vendorId}`}
            className="inline-flex items-center gap-1 text-emerald-700 hover:underline text-xs font-medium"
            onClick={closeCompare}
          >
            <Store className="w-3 h-3" />
            {product.vendorName}
          </Link>
        );
      case "reviewCount":
        return (
          <span className="text-slate-700 font-semibold text-xs">
            {product.reviewCount} reviews
          </span>
        );
      default:
        return (
          <span className="text-slate-700 text-xs">
            {String((product as never)[key] ?? "—")}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeCompare}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <GitCompareArrows className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">
                Product Comparison
              </h2>
              <p className="text-[11px] text-slate-400">
                Comparing {compareList.length} of 3 products side-by-side
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold px-3 py-1.5 hover:bg-rose-50 rounded-lg transition"
            >
              Clear All
            </button>
            <button
              onClick={closeCompare}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Image Headers */}
        <div className="px-6 pt-6">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)`,
            }}
          >
            {/* Empty corner */}
            <div />

            {/* Product cards in header */}
            {compareList.map((product) => (
              <div
                key={product.id}
                className="relative bg-slate-50 rounded-2xl border border-slate-200 p-4 text-center"
              >
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={closeCompare}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-32 object-cover rounded-xl mb-3 hover:opacity-90 transition"
                  />
                </Link>
                <h3 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2 mb-1">
                  {product.title}
                </h3>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Comparison Rows */}
          <div className="mt-4 mb-6 space-y-1">
            {rows.map((row, idx) => (
              <div
                key={row.key}
                className={`grid gap-4 items-center py-3 px-3 rounded-xl ${
                  idx % 2 === 0 ? "bg-slate-50" : "bg-white"
                }`}
                style={{
                  gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)`,
                }}
              >
                {/* Row Label */}
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {row.label}
                </span>

                {/* Cell per product */}
                {compareList.map((product) => (
                  <div key={product.id} className="text-sm">
                    {getCellValue(product, row.key)}
                  </div>
                ))}
              </div>
            ))}

            {/* Tags row */}
            <div
              className="grid gap-4 items-start py-3 px-3 rounded-xl bg-slate-50"
              style={{
                gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)`,
              }}
            >
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tags
              </span>
              {compareList.map((product) => (
                <div key={product.id} className="flex flex-wrap gap-1">
                  {product.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
