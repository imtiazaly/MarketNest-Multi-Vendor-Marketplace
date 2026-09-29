"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Vendor, Order, OrderStatus, ProductReview } from "@/types";
import { MOCK_PRODUCTS, MOCK_VENDORS, MOCK_ORDERS } from "@/data/mockData";

interface MarketplaceContextType {
  products: Product[];
  vendors: Vendor[];
  orders: Order[];
  addProduct: (
    product: Omit<
      Product,
      "id" | "createdAt" | "rating" | "reviewCount" | "reviews"
    >,
  ) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  createOrder: (orderData: Omit<Order, "id" | "createdAt">) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProductReview: (
    productId: string,
    review: Omit<ProductReview, "id" | "createdAt">,
  ) => void;
  getVendorById: (vendorId: string) => Vendor | undefined;
  getProductsByVendor: (vendorId: string) => Product[];
  getOrdersByVendor: (vendorId: string) => Order[];
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined,
);

export function MarketplaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [vendors] = useState<Vendor[]>(MOCK_VENDORS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [isInitialized, setIsInitialized] = useState(false);

  const PRODUCTS_KEY = "marketnest_products_v2";
  const ORDERS_KEY = "marketnest_orders_v2";

  useEffect(() => {
    const savedProducts = localStorage.getItem(PRODUCTS_KEY);
    const savedOrders = localStorage.getItem(ORDERS_KEY);
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        // Agar purana chhota dataset ho to naya 200+ items load karein
        if (parsed.length >= 200) {
          setProducts(parsed);
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } catch (e) {
        setProducts(MOCK_PRODUCTS);
      }
    }
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error(e);
      }
    }
    setIsInitialized(true);
  }, []);
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  }, [products, orders, isInitialized]);

  const addProduct = (
    data: Omit<
      Product,
      "id" | "createdAt" | "rating" | "reviewCount" | "reviews"
    >,
  ) => {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item,
      ),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const createOrder = (orderData: Omit<Order, "id" | "createdAt">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };

    // Deduct stock for ordered products
    setProducts((prev) =>
      prev.map((prod) => {
        const orderedItem = orderData.items.find(
          (i) => i.productId === prod.id,
        );
        if (orderedItem) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - orderedItem.quantity),
          };
        }
        return prod;
      }),
    );

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord)),
    );
  };

  const addProductReview = (
    productId: string,
    review: Omit<ProductReview, "id" | "createdAt">,
  ) => {
    const newReview: ProductReview = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          const updatedReviews = [newReview, ...prod.reviews];
          const newAvgRating = Number(
            (
              updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
              updatedReviews.length
            ).toFixed(1),
          );
          return {
            ...prod,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: newAvgRating,
          };
        }
        return prod;
      }),
    );
  };

  const getVendorById = (vendorId: string) => {
    return vendors.find((v) => v.id === vendorId);
  };

  const getProductsByVendor = (vendorId: string) => {
    return products.filter((p) => p.vendorId === vendorId);
  };

  const getOrdersByVendor = (vendorId: string) => {
    return orders.filter((o) => o.items.some((i) => i.vendorId === vendorId));
  };

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        vendors,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        createOrder,
        updateOrderStatus,
        addProductReview,
        getVendorById,
        getProductsByVendor,
        getOrdersByVendor,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}
