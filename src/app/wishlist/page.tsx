"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Store,
} from "lucide-react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, totalWishlistItems } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    toggleWishlist(product);
  };

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Saved Wishlist
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {totalWishlistItems}{" "}
                {totalWishlistItems === 1 ? "item" : "items"} saved for later
              </p>
            </div>
          </div>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddAllToCart}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>
          </div>
        )}
      </div>

      {/* Content Grid */}
      {wishlist.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Your wishlist is empty
          </h2>
          <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
            Explore handcrafted collections and click the heart icon on any
            product to save it here.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                <Link href={`/products/${product.slug}`}>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-white shadow-xs transition"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <Link
                    href={`/vendors/${product.vendorId}`}
                    className="text-[11px] text-emerald-700 font-medium inline-flex items-center gap-1 mb-1"
                  >
                    <Store className="w-3 h-3" />
                    <span>{product.vendorName}</span>
                  </Link>
                  <h3 className="font-semibold text-sm text-slate-900 line-clamp-1">
                    <Link href={`/products/${product.slug}`}>
                      {product.title}
                    </Link>
                  </h3>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <button
                  onClick={() => handleMoveToCart(product)}
                  disabled={product.stock <= 0}
                  className="w-full py-2.5 px-3 bg-slate-900 hover:bg-emerald-600 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>
                    {product.stock > 0 ? "Move to Bag" : "Out of Stock"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
