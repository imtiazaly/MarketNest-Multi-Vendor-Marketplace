// src/app/orders/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Store,
  ArrowRight,
  ShoppingBag,
  MapPin,
} from "lucide-react";

export default function CustomerOrdersPage() {
  const { currentUser } = useAuth();
  const { orders } = useMarketplace();

  // Filter orders placed by the current customer
  const myOrders = orders.filter((o) => o.userId === currentUser.id);

  const getStatusStep = (status: string) => {
    switch (status) {
      case "Pending":
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 1;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Order History & Tracking
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tracking orders placed by{" "}
            <strong className="text-slate-800">{currentUser.name}</strong> (
            {currentUser.email})
          </p>
        </div>

        <Link
          href="/products"
          className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-xs transition inline-flex items-center gap-1.5 w-fit"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Orders List */}
      {myOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-base text-slate-900">
            No orders placed yet
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            When you checkout items from our independent makers, you can track
            their fulfillment and delivery right here.
          </p>
          <Link
            href="/products"
            className="inline-block px-5 py-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-xs"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {myOrders.map((order) => {
            const step = getStatusStep(order.status);

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="bg-slate-50 p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                        Order Number
                      </span>
                      <span className="font-mono font-bold text-slate-900">
                        #{order.id}
                      </span>
                    </div>

                    <div className="h-6 w-px bg-slate-200 hidden sm:block" />

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                        Placed Date
                      </span>
                      <span className="font-semibold text-slate-800">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>

                    <div className="h-6 w-px bg-slate-200 hidden sm:block" />

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                        Total Amount
                      </span>
                      <span className="font-bold text-emerald-700">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      order.status === "Delivered"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : order.status === "Shipped"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    Status: {order.status}
                  </span>
                </div>

                {/* Live Tracking Progress Bar */}
                <div className="p-6 border-b border-slate-100 bg-white">
                  <div className="max-w-xl mx-auto">
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span
                        className={
                          step >= 1 ? "text-emerald-600" : "text-slate-400"
                        }
                      >
                        1. Processing in Studio
                      </span>
                      <span
                        className={
                          step >= 2 ? "text-emerald-600" : "text-slate-400"
                        }
                      >
                        2. Dispatched & Shipped
                      </span>
                      <span
                        className={
                          step >= 3 ? "text-emerald-600" : "text-slate-400"
                        }
                      >
                        3. Delivered
                      </span>
                    </div>

                    {/* Progress track */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{
                          width:
                            step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Package Contents ({order.items.length} items)
                  </h4>

                  <div className="divide-y divide-slate-100">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="py-3 first:pt-0 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.productImage}
                            alt={item.productTitle}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900">
                              {item.productTitle}
                            </p>
                            <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                              <Store className="w-3 h-3" />
                              <span>{item.vendorName}</span>
                            </p>
                            <span className="text-[11px] text-slate-400">
                              Qty: {item.quantity} &bull;{" "}
                              {formatPrice(item.price)} each
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-slate-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address Note */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      Delivering to: {order.shippingAddress.street},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.postalCode}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
