// src/app/vendor/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatPrice, formatDate } from "@/lib/utils";
import { ProductCategory } from "@/types";
import { PRODUCT_CATEGORIES } from "@/data/mockData";
import {
  DollarSign,
  Package,
  ShoppingBag,
  Star,
  Plus,
  Trash2,
  ExternalLink,
  Store,
  X,
} from "lucide-react";

export default function VendorDashboardPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const {
    getVendorById,
    getProductsByVendor,
    getOrdersByVendor,
    addProduct,
    deleteProduct,
    updateOrderStatus,
  } = useMarketplace();

  // Bulletproof Route Guard: Null-safe check
  useEffect(() => {
    if (!currentUser || currentUser.role !== "vendor") {
      router.replace("/");
    }
  }, [currentUser, router]);

  // Modal State for Adding Product
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");

  // New Product Form State
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newComparePrice, setNewComparePrice] = useState("");
  const [newCategory, setNewCategory] =
    useState<ProductCategory>("Home & Living");
  const [newStock, setNewStock] = useState("15");
  const [newImage, setNewImage] = useState(
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&fit=crop",
  );
  const [newDescription, setNewDescription] = useState("");
  const [newTags, setNewTags] = useState("Handmade, Studio, Premium");

  // Agar user null ho ya vendor na ho to render yahan rok dein
  if (!currentUser || currentUser.role !== "vendor") {
    return null;
  }

  const activeVendorId = currentUser.vendorId || "vnd-1";
  const vendor = getVendorById(activeVendorId);
  const vendorProducts = getProductsByVendor(activeVendorId);
  const vendorOrders = getOrdersByVendor(activeVendorId);

  // Calculate Vendor Metrics
  const totalRevenue = vendorOrders.reduce((sum, order) => {
    const vendorItems = order.items.filter(
      (i) => i.vendorId === activeVendorId,
    );
    const orderSum = vendorItems.reduce(
      (itemSum, i) => itemSum + i.price * i.quantity,
      0,
    );
    return sum + orderSum;
  }, 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice) return;

    const slug = newTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

    addProduct({
      title: newTitle.trim(),
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      description:
        newDescription || "Handcrafted with premium materials by our studio.",
      price: parseFloat(newPrice),
      compareAtPrice: newComparePrice ? parseFloat(newComparePrice) : undefined,
      category: newCategory,
      tags: newTags.split(",").map((t) => t.trim()),
      images: [newImage],
      stock: parseInt(newStock) || 10,
      vendorId: activeVendorId,
      vendorName: vendor ? vendor.name : "Artisan Studio",
      isFeatured: true,
    });

    // Reset Form
    setNewTitle("");
    setNewPrice("");
    setNewComparePrice("");
    setNewDescription("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Vendor Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex-shrink-0">
            <img
              src={
                vendor?.logo ||
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&fit=crop"
              }
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {vendor?.name || "Artisan Studio"}
              </h1>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Verified Seller
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Logged in as{" "}
              <strong className="text-slate-800">{currentUser.name}</strong>{" "}
              &bull; Merchant Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href={`/vendors/${activeVendorId}`}
            className="flex-1 md:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Storefront</span>
          </Link>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Gross Sales
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {formatPrice((vendor?.totalSales || 0) + totalRevenue)}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium">
            +12.4% vs last month
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Active Catalog
            </span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {vendorProducts.length}
          </p>
          <span className="text-[11px] text-slate-400">
            Live in marketplace
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Incoming Orders
            </span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {vendorOrders.length}
          </p>
          <span className="text-[11px] text-indigo-600 font-medium">
            Requires fulfillment
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Studio Rating
            </span>
            <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {vendor?.rating || 4.9} / 5.0
          </p>
          <span className="text-[11px] text-slate-400">
            Based on verified buyers
          </span>
        </div>
      </div>

      {/* Tabs: Products Inventory vs Incoming Orders */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("products")}
            className={`text-xs font-bold pb-2 transition flex items-center gap-1.5 ${
              activeTab === "products"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Store Products ({vendorProducts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`text-xs font-bold pb-2 transition flex items-center gap-1.5 ${
              activeTab === "orders"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Incoming Orders ({vendorOrders.length})</span>
          </button>
        </div>

        {/* Tab 1: Product Inventory Table */}
        {activeTab === "products" && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                Inventory Catalog
              </h3>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vendorProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 truncate max-w-xs">
                            {p.title}
                          </p>
                          <span className="text-[10px] text-slate-400">
                            ID: {p.id}
                          </span>
                        </div>
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
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{p.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${p.slug}`}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                            title="View public product"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Delete product"
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

        {/* Tab 2: Orders Fulfillment */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                Orders for Fulfillment
              </h3>
            </div>

            {vendorOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No orders received yet for this studio.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {vendorOrders.map((ord) => {
                  const vendorItems = ord.items.filter(
                    (i) => i.vendorId === activeVendorId,
                  );
                  return (
                    <div key={ord.id} className="p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900 text-xs">
                              #{ord.id}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {formatDate(ord.createdAt)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            Customer:{" "}
                            <strong className="text-slate-800">
                              {ord.customerName}
                            </strong>{" "}
                            ({ord.shippingAddress.city},{" "}
                            {ord.shippingAddress.country})
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                              ord.status === "Delivered"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : ord.status === "Shipped"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {ord.status}
                          </span>

                          <select
                            value={ord.status}
                            onChange={(e) =>
                              updateOrderStatus(ord.id, e.target.value as any)
                            }
                            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none font-medium"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="bg-slate-50/70 p-3 rounded-xl space-y-2">
                        {vendorItems.map((item) => (
                          <div
                            key={item.productId}
                            className="flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={item.productImage}
                                alt=""
                                className="w-8 h-8 rounded object-cover"
                              />
                              <span className="font-medium text-slate-800">
                                {item.quantity}x {item.productTitle}
                              </span>
                            </div>
                            <span className="font-bold text-slate-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal: Add New Product */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsAddModalOpen(false)}
          />

          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">
                  Publish New Handcrafted Item
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sculptural Ash Wood Table Lamp"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="85.00"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Compare at Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="110.00"
                    value={newComparePrice}
                    onChange={(e) => setNewComparePrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as ProductCategory)
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                  >
                    {PRODUCT_CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Image URL (Unsplash or direct image)
                </label>
                <input
                  type="url"
                  required
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detail craftsmanship, finish, dimensions, care instructions..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-xs transition"
                >
                  Publish Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}