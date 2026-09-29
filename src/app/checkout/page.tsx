// src/app/checkout/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useMarketplace } from "@/context/MarketplaceContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Store,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  LogIn,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, subtotal, shippingFee, tax, total, clearCart } = useCart();
  const { createOrder } = useMarketplace();
  const { currentUser } = useAuth();

  // Null-safe Form State for both Guests and Logged In Users
  const [formData, setFormData] = useState({
    name: currentUser?.name || "Alex Morgan",
    email: currentUser?.email || "alex@example.com",
    street: "742 Evergreen Terrace",
    city: "Springfield",
    state: "OR",
    postalCode: "97477",
    country: "USA",
  });

  // Agar user login/switch ho to form automatically sync ho
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email,
      }));
    }
  }, [currentUser]);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  // Group items by vendor to highlight multi-vendor architecture
  const itemsByVendor = cart.reduce(
    (acc, item) => {
      const vId = item.product.vendorId;
      if (!acc[vId]) {
        acc[vId] = {
          vendorName: item.product.vendorName,
          items: [],
        };
      }
      acc[vId].items.push(item);
      return acc;
    },
    {} as Record<string, { vendorName: string; items: typeof cart }>,
  );

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const orderPayload = {
        userId: currentUser?.id || "guest-user",
        customerName: formData.name,
        customerEmail: formData.email,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: cart.map((item) => ({
          productId: item.product.id,
          productTitle: item.product.title,
          productImage: item.product.images[0],
          price: item.product.price,
          quantity: item.quantity,
          vendorId: item.product.vendorId,
          vendorName: item.product.vendorName,
        })),
        subtotal,
        shippingFee,
        tax,
        totalAmount: total,
        status: "Processing" as const,
      };

      const newOrder = createOrder(orderPayload);
      clearCart();
      setPlacedOrder(newOrder);
      setIsProcessing(false);
    }, 1200);
  };

  // Success Confirmation Screen
  if (placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Successfully Placed</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Thank you for supporting independent makers!
          </h1>
          <p className="text-xs text-slate-500">
            A confirmation receipt and tracking updates have been sent to{" "}
            <strong className="text-slate-900">
              {placedOrder.customerEmail}
            </strong>
            .
          </p>
        </div>

        {/* Receipt Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-left shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 text-xs">
            <span className="text-slate-500">Order ID:</span>
            <span className="font-mono font-bold text-slate-900">
              #{placedOrder.id}
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Dispatched From Studios:
            </h4>
            {placedOrder.items.map((item: any) => (
              <div key={item.productId} className="flex items-center gap-3">
                <img
                  src={item.productImage}
                  alt={item.productTitle}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {item.productTitle}
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    Studio: {item.vendorName} &bull; Qty: {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-sm">
            <span className="font-bold text-slate-900">Total Paid:</span>
            <span className="font-bold text-emerald-700 text-base">
              {formatPrice(placedOrder.totalAmount)}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/products"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs rounded-xl shadow-2xs transition"
          >
            View Live Tracking &rarr;
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart fallback
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Your bag is empty</h2>
        <p className="text-xs text-slate-500">
          Add items to your bag before proceeding to multi-vendor checkout.
        </p>
        <Link
          href="/products"
          className="inline-block px-5 py-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
        >
          Browse Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to shopping</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          {!currentUser && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
              <span>
                Checking out as a Guest? You can also sign in to save your
                order:
              </span>
              <Link
                href="/login?redirect=/checkout"
                className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg flex items-center gap-1"
              >
                <LogIn className="w-3 h-3" />
                <span>Sign In</span>
              </Link>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Truck className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-base text-slate-900">
                1. Delivery Details
              </h2>
            </div>

            <form
              id="checkout-form"
              onSubmit={handleSubmitOrder}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (for order updates) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-base text-slate-900">
                2. Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label
                className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer transition ${
                  paymentMethod === "card"
                    ? "border-emerald-600 bg-emerald-50/40 text-emerald-900"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="accent-emerald-600"
                />
                <span className="text-xs font-bold">Credit / Debit Card</span>
              </label>

              <label
                className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer transition ${
                  paymentMethod === "cod"
                    ? "border-emerald-600 bg-emerald-50/40 text-emerald-900"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-emerald-600"
                />
                <span className="text-xs font-bold">Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Vendor Order Review & Cost Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
              Order Summary (Consolidated)
            </h3>

            {/* Vendor-Grouped Shipment Details */}
            <div className="space-y-4 divide-y divide-slate-100">
              {Object.entries(itemsByVendor).map(([vId, group]) => (
                <div key={vId} className="pt-3 first:pt-0 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Store className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Package from {group.vendorName}</span>
                  </div>

                  <div className="space-y-2 pl-5">
                    {group.items.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-600 truncate max-w-[200px]">
                          {quantity}x {product.title}
                        </span>
                        <span className="font-semibold text-slate-900">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
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
              <div className="flex justify-between">
                <span>Estimated Sales Tax</span>
                <span className="font-semibold text-slate-900">
                  {formatPrice(tax)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-900">Total</span>
                <span className="font-extrabold text-emerald-600 text-lg">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              form="checkout-form"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 disabled:opacity-75"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isProcessing
                  ? "Authorizing & Dispatching Orders..."
                  : `Place Consolidated Order • ${formatPrice(total)}`}
              </span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Multi-vendor escrow & buyer protection enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
