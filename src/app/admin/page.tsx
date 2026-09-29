"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  ShieldCheck,
  DollarSign,
  Store,
  Package,
  ShoppingBag,
  TrendingUp,
  Search,
  ExternalLink,
  Trash2,
  CheckCircle,
  Clock,
  Truck,
  Filter,
} from "lucide-react";

export default function AdminPortalPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { products, vendors, orders, updateOrderStatus, deleteProduct } =
    useMarketplace();

  // Clean Route Guard: Agar user admin nahi hai to quietly redirect karein
  useEffect(() => {
    if (currentUser.role !== "admin") {
      router.replace("/");
    }
  }, [currentUser.role, router]);

  const [activeTab, setActiveTab] = useState<"studios" | "orders" | "catalog">(
    "studios",
  );
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("All");
  const [catalogSearch, setCatalogSearch] = useState<string>("");

  if (currentUser.role !== "admin") {
    return null; // Prevents any UI flash before redirect
  }

  // Platform Level Calculations
  const platformGMV =
    orders.reduce((sum, o) => sum + o.totalAmount, 0) + 165800; // Historical + Live
  const platformCommission = platformGMV * 0.1; // 10% take-rate
  const totalOrdersCount = orders.length + 380; // Historical + Live

  // Filter Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === "All") return true;
    return o.status === orderStatusFilter;
  });

  // Filter Catalog
  const filteredProducts = products.filter((p) => {
    const q = catalogSearch.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.vendorName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">
                Platform Governance & Operations
              </h1>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-2.5 py-0.5 rounded-full border border-purple-500/40 uppercase">
                Root Admin
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Supervising multi-vendor logistics, platform take-rates, and
              catalog compliance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            Marketplace Health: <strong>Optimal (99.9% uptime)</strong>
          </span>
        </div>
      </div>

      {/* Platform Macro Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Total GMV (Gross Sales)
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {formatPrice(platformGMV)}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium">
            Across all independent studios
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              MarketNest Commission (10%)
            </span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-purple-700 mt-2">
            {formatPrice(platformCommission)}
          </p>
          <span className="text-[11px] text-slate-400">
            Net platform retained revenue
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Registered Studios
            </span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {vendors.length} Makers
          </p>
          <span className="text-[11px] text-blue-600 font-medium">
            100% verified independent
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Total Catalog Goods
            </span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {products.length} Products
          </p>
          <span className="text-[11px] text-slate-400">
            Live in multi-vendor catalog
          </span>
        </div>
      </div>

      {/* Governance Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("studios")}
            className={`text-xs font-bold pb-2 transition flex items-center gap-1.5 ${
              activeTab === "studios"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Independent Studios ({vendors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`text-xs font-bold pb-2 transition flex items-center gap-1.5 ${
              activeTab === "orders"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Platform Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            className={`text-xs font-bold pb-2 transition flex items-center gap-1.5 ${
              activeTab === "catalog"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Catalog Moderation ({products.length})</span>
          </button>
        </div>

        {/* Tab 1: Studios Management */}
        {activeTab === "studios" && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                Vetted Merchant Partners
              </h3>
              <span className="text-xs text-slate-400">
                All studios compliant with platform standards
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Studio / Maker</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Catalog Size</th>
                    <th className="py-3 px-4">Gross Sales</th>
                    <th className="py-3 px-4">Quality Rating</th>
                    <th className="py-3 px-4">Compliance Status</th>
                    <th className="py-3 px-4 text-right">Storefront</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vendors.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={v.logo}
                          alt={v.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{v.name}</p>
                          <span className="text-[10px] text-slate-400">
                            {v.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{v.address}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {v.totalProducts} items
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        {formatPrice(v.totalSales)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-amber-500">
                          ★ {v.rating}
                        </span>{" "}
                        <span className="text-[10px] text-slate-400">
                          ({v.totalReviews})
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          Verified Maker
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/vendors/${v.id}`}
                          className="inline-flex items-center gap-1 text-slate-500 hover:text-purple-600 font-semibold p-1.5 hover:bg-slate-100 rounded-lg transition"
                          title="Inspect Storefront"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Stream */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                  Consolidated Marketplace Orders
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Real-time transaction stream across all makers
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">
                  Filter:
                </span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none font-semibold text-slate-700"
                >
                  <option value="All">All Statuses</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredOrders.map((ord) => (
                <div key={ord.id} className="p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">
                          #{ord.id}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {formatDate(ord.createdAt)}
                        </span>
                        <span className="text-slate-300">&bull;</span>
                        <span className="text-slate-600">
                          Buyer: <strong>{ord.customerName}</strong> (
                          {ord.customerEmail})
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Ship to: {ord.shippingAddress.city},{" "}
                        {ord.shippingAddress.country}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatPrice(ord.totalAmount)}
                      </span>

                      {/* Admin Override Control */}
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          updateOrderStatus(ord.id, e.target.value as any)
                        }
                        className={`text-xs font-bold px-2.5 py-1 rounded-xl border outline-none ${
                          ord.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : ord.status === "Shipped"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Multi-Vendor Items breakdown */}
                  <div className="bg-slate-50 p-3 rounded-xl space-y-2 text-xs">
                    {ord.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={item.productImage}
                            alt=""
                            className="w-7 h-7 rounded object-cover"
                          />
                          <span className="font-medium text-slate-800">
                            {item.quantity}x {item.productTitle}
                          </span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded font-semibold">
                            Studio: {item.vendorName}
                          </span>
                        </div>
                        <span className="font-semibold text-slate-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Catalog Moderation */}
        {activeTab === "catalog" && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                  Global Product Catalog
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Audit listings across all makers and enforce quality
                </p>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter by title, maker, or category..."
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-purple-500 w-64"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Maker / Studio</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 truncate max-w-xs">
                            {p.title}
                          </p>
                          <span className="text-[10px] text-slate-400">
                            Rating: ★ {p.rating.toFixed(1)} ({p.reviewCount})
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-emerald-700">
                          {p.vendorName}
                        </span>
                      </td>
                      <td className="py-3 px-4">{p.category}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {formatPrice(p.price)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            p.stock < 5 ? "text-rose-600" : "text-emerald-700"
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${p.slug}`}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                            title="Inspect product"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Remove listing from marketplace"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
