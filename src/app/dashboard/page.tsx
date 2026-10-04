// src/app/dashboard/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useMarketplace } from "@/context/MarketplaceContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  ShoppingBag,
  Heart,
  Package,
  TrendingUp,
  User,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Store,
  LogIn,
  Sparkles,
  CreditCard,
} from "lucide-react";

export default function CustomerDashboardPage() {
  const { currentUser } = useAuth();
  const { orders } = useMarketplace();
  const { totalItems, total } = useCart();
  const { wishlist } = useWishlist();

  // Not logged in state
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
          <LogIn className="w-9 h-9" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Sign In to Your Dashboard
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Access your personal shopping hub — track orders, manage your
          wishlist, view spending insights, and update your profile.
        </p>
        <Link
          href="/login?redirect=/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md transition"
        >
          <LogIn className="w-4 h-4" />
          Sign In to Continue
        </Link>
      </div>
    );
  }

  // Only customer role — vendors/admins have their own dashboards
  if (currentUser.role !== "customer") {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
          <User className="w-9 h-9" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          {currentUser.role === "vendor"
            ? "You have a Vendor Portal"
            : "You have an Admin Panel"}
        </h2>
        <p className="text-sm text-slate-500">
          Your role has a dedicated dashboard.
        </p>
        <Link
          href={currentUser.role === "vendor" ? "/vendor" : "/admin"}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
        >
          Go to{" "}
          {currentUser.role === "vendor" ? "Vendor Portal" : "Admin Panel"}{" "}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Customer-specific data
  const myOrders = orders.filter((o) => o.userId === currentUser.id);
  const totalSpent = myOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const deliveredOrders = myOrders.filter(
    (o) => o.status === "Delivered",
  ).length;
  const activeOrders = myOrders.filter(
    (o) => o.status === "Processing" || o.status === "Shipped",
  ).length;
  const recentOrders = myOrders.slice(0, 3);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "Shipped":
        return <Truck className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40 flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">
                Welcome back, {currentUser.name.split(" ")[0]}! 👋
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                Customer
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>
            MarketNest Member since{" "}
            <strong className="text-white">2024</strong>
          </span>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Total Orders
            </span>
            <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">
            {myOrders.length}
          </p>
          <span className="text-[11px] text-slate-400">All-time purchases</span>
        </div>

        {/* Total Spent */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Total Spent
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">
            {formatPrice(totalSpent)}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium">
            Across {deliveredOrders} delivered orders
          </span>
        </div>

        {/* Wishlist */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Saved Items
            </span>
            <div className="p-2 bg-rose-50 text-rose-500 rounded-lg">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">
            {wishlist.length}
          </p>
          <Link
            href="/wishlist"
            className="text-[11px] text-rose-500 hover:text-rose-700 font-medium transition"
          >
            View wishlist →
          </Link>
        </div>

        {/* Active Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Active Orders
            </span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">
            {activeOrders}
          </p>
          <span className="text-[11px] text-blue-600 font-medium">
            In transit / processing
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders — takes 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-slate-600" />
              <h2 className="font-bold text-slate-900 text-sm">
                Recent Orders
              </h2>
            </div>
            <Link
              href="/orders"
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-10 text-center">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No orders yet.</p>
              <Link
                href="/products"
                className="mt-4 inline-block px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-bold text-slate-900 text-xs">
                        #{order.id}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-2">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatPrice(order.totalAmount)}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusStyle(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Tracking mini bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{
                        width:
                          order.status === "Delivered"
                            ? "100%"
                            : order.status === "Shipped"
                              ? "66%"
                              : "33%",
                      }}
                    />
                  </div>

                  {/* Items preview */}
                  <div className="flex items-center gap-2">
                    {order.items.slice(0, 3).map((item) => (
                      <img
                        key={item.productId}
                        src={item.productImage}
                        alt={item.productTitle}
                        className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        +{order.items.length - 3} more
                      </span>
                    )}
                    <span className="ml-auto text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.country}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Profile Quick View */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-600" />
              <h2 className="font-bold text-slate-900 text-sm">
                Profile Overview
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-100"
              />
              <div>
                <p className="font-bold text-slate-900 text-sm">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-slate-400">
                  {currentUser.email}
                </p>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 mt-0.5 inline-block">
                  {currentUser.role}
                </span>
              </div>
            </div>
            <Link
              href="/profile"
              className="w-full flex items-center justify-center gap-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
            >
              <User className="w-3.5 h-3.5" />
              Edit Profile Settings
            </Link>
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-slate-600" />
              <h2 className="font-bold text-slate-900 text-sm">
                Current Cart
              </h2>
            </div>
            {totalItems > 0 ? (
              <>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{totalItems} item(s)</span>
                  <span className="font-bold text-slate-900">
                    {formatPrice(total)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition shadow-sm"
                >
                  Proceed to Checkout →
                </Link>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-slate-400 mb-3">
                  Your cart is empty
                </p>
                <Link
                  href="/products"
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  Browse Products →
                </Link>
              </div>
            )}
          </div>

          {/* Wishlist Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <h2 className="font-bold text-slate-900 text-sm">
                  Wishlist ({wishlist.length})
                </h2>
              </div>
              <Link
                href="/wishlist"
                className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
              >
                View all
              </Link>
            </div>

            {wishlist.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-3">
                No saved items yet.
              </p>
            ) : (
              <div className="space-y-2">
                {wishlist.slice(0, 3).map((item) => (
                  <Link
                    href={`/products/${item.slug}`}
                    key={item.id}
                    className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition group"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate group-hover:text-emerald-700 transition">
                        {item.title}
                      </p>
                      <p className="text-[11px] font-bold text-emerald-700">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spending Insight + Quick Links Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spending Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h2 className="font-bold text-slate-900 text-sm">
              Spending Breakdown
            </h2>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Total Spent</span>
              <span className="font-bold text-slate-900">
                {formatPrice(totalSpent)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Orders Placed</span>
              <span className="font-bold text-slate-900">
                {myOrders.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Avg. Order Value</span>
              <span className="font-bold text-slate-900">
                {myOrders.length > 0
                  ? formatPrice(totalSpent / myOrders.length)
                  : "$0.00"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Delivered</span>
              <span className="font-bold text-emerald-700">
                {deliveredOrders} orders ✓
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">In Transit</span>
              <span className="font-bold text-blue-700">
                {activeOrders} orders
              </span>
            </div>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="font-bold text-slate-900 text-sm">Quick Actions</h2>
          </div>
          {[
            {
              href: "/products",
              icon: <Store className="w-4 h-4" />,
              label: "Explore Full Catalog",
              sub: "200+ handcrafted items",
              color: "text-emerald-600 bg-emerald-50",
            },
            {
              href: "/orders",
              icon: <Package className="w-4 h-4" />,
              label: "Order History & Tracking",
              sub: `${myOrders.length} total orders`,
              color: "text-blue-600 bg-blue-50",
            },
            {
              href: "/wishlist",
              icon: <Heart className="w-4 h-4" />,
              label: "My Wishlist",
              sub: `${wishlist.length} saved items`,
              color: "text-rose-500 bg-rose-50",
            },
            {
              href: "/vendors",
              icon: <Star className="w-4 h-4" />,
              label: "Browse All Makers",
              sub: "20 verified studios",
              color: "text-amber-500 bg-amber-50",
            },
            {
              href: "/profile",
              icon: <User className="w-4 h-4" />,
              label: "Profile & Settings",
              sub: "Update your info",
              color: "text-slate-600 bg-slate-100",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition group"
            >
              <div className={`p-2 rounded-lg ${item.color}`}>{item.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 group-hover:text-emerald-700 transition">
                  {item.label}
                </p>
                <p className="text-[11px] text-slate-400">{item.sub}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 transition" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
