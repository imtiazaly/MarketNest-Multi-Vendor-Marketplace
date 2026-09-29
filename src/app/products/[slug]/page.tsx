"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useMarketplace } from "@/context/MarketplaceContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, formatDate } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ShoppingBag,
  Store,
  BadgeCheck,
  ChevronRight,
  Send,
  Plus,
  Minus,
  AlertCircle,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { products, getVendorById, addProductReview } = useMarketplace();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { currentUser } = useAuth();

  const product = products.find((p) => p.slug === slug);
  const vendor = product ? getVendorById(product.vendorId) : undefined;

  // Local state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          The curated item you are looking for does not exist or has been
          retired.
        </p>
        <Link
          href="/products"
          className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100,
      )
    : 0;

  // More items from this same vendor
  const relatedProducts = products
    .filter((p) => p.vendorId === product.vendorId && p.id !== product.id)
    .slice(0, 3);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addProductReview(product.id, {
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      rating: reviewRating,
      comment: reviewComment.trim(),
    });

    setReviewComment("");
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-emerald-600 transition">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/products" className="hover:text-emerald-600 transition">
          Catalog
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-emerald-600 transition"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-semibold truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Main Product Section: Gallery + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-emerald-600 ring-2 ring-emerald-500/20"
                      : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Maker Attribution Header */}
          {vendor && (
            <div className="inline-flex items-center gap-2 p-1.5 pr-4 rounded-full bg-slate-100/80 border border-slate-200 text-xs">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-slate-600">Handcrafted by</span>
              <Link
                href={`/vendors/${vendor.id}`}
                className="font-bold text-slate-900 hover:text-emerald-600 transition flex items-center gap-1"
              >
                <span>{vendor.name}</span>
                {vendor.isVerified && (
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </Link>
            </div>
          )}

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.title}
            </h1>

            {/* Ratings & Category */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-sm font-bold text-slate-900">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-slate-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-xs text-emerald-600 font-semibold ml-auto">
              {product.stock > 0
                ? `${product.stock} units in maker inventory`
                : "Backorder available"}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Maker&apos;s Description
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Quantity & CTA */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700">Quantity</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock <= 0}
                className="flex-1 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {product.stock > 0 ? "Add to Shopping Bag" : "Sold Out"}
                </span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition ${
                  isLiked
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
                title="Save to Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${isLiked ? "fill-rose-500" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Direct Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Authentic Maker</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-emerald-600" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews & Social Proof Section */}
      <section className="pt-12 border-t border-slate-200 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Customer Feedback
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Verified Reviews ({product.reviews.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Write a review form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs h-fit space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Leave a Review</h3>
            <p className="text-xs text-slate-500">
              Posting as{" "}
              <strong className="text-slate-900">{currentUser.name}</strong> (
              {currentUser.role})
            </p>

            {reviewSubmitted && (
              <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200 font-medium">
                Thank you! Your verified review has been posted.
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= reviewRating
                            ? "fill-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {reviewRating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Experience
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share details regarding craftsmanship, material quality, and packaging..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:bg-white resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Review</span>
              </button>
            </form>
          </div>

          {/* Reviews list */}
          <div className="lg:col-span-2 space-y-4">
            {product.reviews.length === 0 ? (
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 text-center text-xs text-slate-500">
                Be the first to leave a review for this handcrafted piece!
              </div>
            ) : (
              product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-white rounded-2xl border border-slate-200/70 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.userAvatar}
                        alt={rev.userName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-xs text-slate-900">
                          {rev.userName}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {formatDate(rev.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? "fill-amber-400" : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {rev.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* More From This Maker */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                More Creations
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                More from {product.vendorName}
              </h2>
            </div>
            <Link
              href={`/vendors/${product.vendorId}`}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Visit Storefront &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
