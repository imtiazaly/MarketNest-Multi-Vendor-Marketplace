"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ShoppingBag, Star, Store } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100,
      )
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <Link
          href={`/products/${product.slug}`}
          className="block w-full h-full"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            Save {discountPercent}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isLiked
              ? "bg-rose-50 text-rose-500"
              : "bg-white/80 text-slate-500 hover:text-rose-500 hover:bg-white"
          }`}
          title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500" : ""}`} />
        </button>

        {/* Category Pill */}
        <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md border border-slate-200/60 shadow-xs">
          {product.category}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Vendor Tag */}
          <Link
            href={`/vendors/${product.vendorId}`}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:text-emerald-800 transition mb-1"
          >
            <Store className="w-3 h-3" />
            <span>{product.vendorName}</span>
          </Link>

          {/* Product Title */}
          <h3 className="font-semibold text-sm text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">
            <Link href={`/products/${product.slug}`}>{product.title}</Link>
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-800">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-slate-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400">
              {product.stock > 0 ? (
                <span className="text-emerald-600 font-medium">In Stock</span>
              ) : (
                <span className="text-rose-500 font-medium">Out of Stock</span>
              )}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white shadow-sm hover:shadow transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
