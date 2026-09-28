"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    shippingFee,
    total,
  } = useCart();

  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100,
  );
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal,
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Your Cart
                    </h2>
                    <p className="text-xs text-slate-500">
                      {totalItems} {totalItems === 1 ? "item" : "items"}{" "}
                      selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-100">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-medium text-slate-700">
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-emerald-600 font-semibold">
                        🎉 Free shipping unlocked!
                      </span>
                    ) : (
                      <span>
                        Add{" "}
                        <strong className="text-slate-900">
                          {formatPrice(remainingForFreeShipping)}
                        </strong>{" "}
                        more for Free Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {Math.round(progressToFreeShipping)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-slate-100">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Your cart is empty
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xs mt-1 mb-6">
                      Explore our independent artisan makers and add curated
                      products to your bag.
                    </p>
                    <button
                      onClick={closeCart}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="py-4 flex gap-4 first:pt-0"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded mb-1">
                          {product.vendorName}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 truncate">
                          {product.title}
                        </h4>
                        <p className="text-sm font-bold text-slate-800 mt-1">
                          {formatPrice(product.price)}
                        </p>

                        {/* Quantity and Delete Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-slate-200 rounded-md bg-white">
                            <button
                              onClick={() =>
                                updateQuantity(product.id, quantity - 1)
                              }
                              className="p-1 hover:bg-slate-100 text-slate-600 transition"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-semibold text-slate-800">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(product.id, quantity + 1)
                              }
                              className="p-1 hover:bg-slate-100 text-slate-600 transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-slate-400 hover:text-red-500 transition p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary */}
              {cart.length > 0 && (
                <div className="border-t border-slate-100 p-6 bg-slate-50 space-y-3">
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold text-slate-900">
                        {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-emerald-600">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition duration-200"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-[11px] text-center text-slate-400">
                    Taxes calculated at checkout. Multi-vendor consolidated
                    shipment.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
