// src/app/products/page.tsx
"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useMarketplace } from "@/context/MarketplaceContext";
import ProductCard from "@/components/ProductCard";
import { PRODUCT_CATEGORIES } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  Sparkles,
  Store,
  ChevronDown,
  ArrowUp,
} from "lucide-react";

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const { products, vendors } = useMarketplace();

  // Filter States
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [selectedVendor, setSelectedVendor] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Scroll to top listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category Filter
        if (
          selectedCategory !== "All" &&
          product.category !== selectedCategory
        ) {
          return false;
        }
        // Vendor Filter
        if (selectedVendor !== "All" && product.vendorId !== selectedVendor) {
          return false;
        }
        // Search Query
        if (
          searchQuery.trim() &&
          !product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) &&
          !product.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        ) {
          return false;
        }
        // Max Price
        if (product.price > maxPrice) {
          return false;
        }
        // In Stock Only
        if (inStockOnly && product.stock <= 0) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest")
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        return 0; // featured / default
      });
  }, [
    products,
    selectedCategory,
    selectedVendor,
    searchQuery,
    maxPrice,
    inStockOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedVendor("All");
    setSearchQuery("");
    setMaxPrice(500);
    setInStockOnly(false);
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedVendor !== "All" ||
    searchQuery !== "" ||
    maxPrice < 500 ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            Marketplace Catalog
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Curated Independent Goods
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing{" "}
            <strong className="text-slate-900 font-semibold">
              {filteredProducts.length}
            </strong>{" "}
            unique creations across 20 verified studios
          </p>
        </div>

        {/* Sorting Dropdown & Mobile Filter Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({filteredProducts.length})</span>
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="featured">Sort by: Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="newest">Newest Releases</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Layout: Sticky Sidebar + Scrollable Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8 items-start">
        {/* DESKTOP STICKY SIDEBAR: Pinned on scroll */}
        <aside className="hidden lg:block lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto pr-1">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                Refine Catalog
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Search Items
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Vase, leather, audio, lamp..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Department
              </label>
              <div className="space-y-1">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                      selectedCategory === cat
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Maker / Vendor Filter (All 20+ Studios) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Independent Studio ({vendors.length})
              </label>
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="All">
                  All Makers ({vendors.length} Studios)
                </option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                <span>Max Price</span>
                <span className="text-emerald-700 font-mono font-bold">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$20</span>
                <span>$500+</span>
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <label
                htmlFor="stock-toggle"
                className="text-xs font-semibold text-slate-700 cursor-pointer"
              >
                In Stock Only
              </label>
              <input
                id="stock-toggle"
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </aside>

        {/* Product Grid Area (Scrolls freely while sidebar stays pinned) */}
        <main className="lg:col-span-3 space-y-6">
          {/* Active Filter Pills Bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500">
                Active Filters:
              </span>
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-md font-medium">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")}>
                    <X className="w-3 h-3 hover:text-emerald-900" />
                  </button>
                </span>
              )}
              {selectedVendor !== "All" && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-md font-medium">
                  {vendors.find((v) => v.id === selectedVendor)?.name}
                  <button onClick={() => setSelectedVendor("All")}>
                    <X className="w-3 h-3 hover:text-emerald-900" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3 hover:text-slate-900" />
                  </button>
                </span>
              )}
              {maxPrice < 500 && (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                  Under {formatPrice(maxPrice)}
                  <button onClick={() => setMaxPrice(500)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-rose-500 hover:text-rose-600 ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No matching creations found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                Try adjusting your price filter, keyword, or selected category
                to discover items from our makers.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-xs transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating Scroll-to-Top Button for 200+ Products */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-30 p-3 bg-slate-900 hover:bg-emerald-600 text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-base text-slate-900">
                  Filters
                </span>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-1.5 rounded-lg border ${
                        selectedCategory === cat
                          ? "bg-emerald-600 text-white border-emerald-600 font-semibold"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
                  <span>Max Price:</span>
                  <span className="text-emerald-600">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* In Stock */}
              <div className="flex items-center justify-between py-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800">
                  In Stock Only
                </span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-2">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 bg-emerald-600 text-white font-semibold text-xs rounded-xl"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500 text-sm">
          Loading curated marketplace catalog...
        </div>
      }
    >
      <ProductCatalogContent />
    </Suspense>
  );
}
