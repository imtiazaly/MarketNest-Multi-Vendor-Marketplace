// src/types/index.ts

export type UserRole = "customer" | "vendor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  vendorId?: string; // Present if user is a vendor
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  banner: string;
  rating: number;
  totalReviews: number;
  totalProducts: number;
  totalSales: number;
  joinedDate: string;
  isVerified: boolean;
  email: string;
  phone: string;
  address: string;
}

export type ProductCategory =
  | "Electronics"
  | "Fashion"
  | "Home & Living"
  | "Art & Crafts"
  | "Wellness";

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number; // For discount display
  category: ProductCategory;
  tags: string[];
  images: string[];
  stock: number;
  vendorId: string;
  vendorName: string;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  isFeatured?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  price: number;
  quantity: number;
  vendorId: string;
  vendorName: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  totalAmount: number;
  subtotal: number;
  shippingFee: number;
  tax: number;
  status: OrderStatus;
  createdAt: string;
}

export interface VendorAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  monthlyRevenue: { month: string; amount: number }[];
  orderStatusCounts: { status: OrderStatus; count: number }[];
}
