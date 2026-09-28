// src/data/mockData.ts
import { User, Vendor, Product, Order } from "@/types";

export const MOCK_USERS: User[] = [
  {
    id: "usr-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    role: "customer",
  },
  {
    id: "usr-2",
    name: "Elena Rostova",
    email: "elena@nordichome.com",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    role: "vendor",
    vendorId: "vnd-1",
  },
  {
    id: "usr-3",
    name: "Marcus Vance",
    email: "marcus@vancetech.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: "vendor",
    vendorId: "vnd-2",
  },
  {
    id: "usr-admin",
    name: "MarketNest Admin",
    email: "admin@marketnest.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "admin",
  },
];

export const MOCK_VENDORS: Vendor[] = [
  {
    id: "vnd-1",
    name: "Nordic Living Studio",
    slug: "nordic-living-studio",
    description:
      "Curated minimalist Scandinavian home decor, handcrafted ceramics, and timeless furniture.",
    logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalReviews: 128,
    totalProducts: 14,
    totalSales: 45200,
    joinedDate: "2024-01-15",
    isVerified: true,
    email: "hello@nordicliving.com",
    phone: "+1 (555) 234-5678",
    address: "Copenhagen Design Hub, Denmark",
  },
  {
    id: "vnd-2",
    name: "Vance Tech Labs",
    slug: "vance-tech-labs",
    description:
      "Ergonomic workspace gear, high-fidelity audio accessories, and premium mechanical peripherals.",
    logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&h=400&fit=crop",
    rating: 4.8,
    totalReviews: 96,
    totalProducts: 10,
    totalSales: 89400,
    joinedDate: "2023-11-20",
    isVerified: true,
    email: "support@vancetech.com",
    phone: "+1 (555) 876-5432",
    address: "San Francisco, CA, USA",
  },
  {
    id: "vnd-3",
    name: "Artisan Leatherworks",
    slug: "artisan-leatherworks",
    description:
      "Handcrafted full-grain leather wallets, messenger bags, and timeless travel companions.",
    logo: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=400&fit=crop",
    rating: 4.7,
    totalReviews: 64,
    totalProducts: 8,
    totalSales: 31200,
    joinedDate: "2024-03-01",
    isVerified: true,
    email: "craft@artisanleather.com",
    phone: "+44 20 7946 0912",
    address: "Florence & London",
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Minimalist Ceramic Arc Vase",
    slug: "minimalist-ceramic-arc-vase",
    description:
      "Hand-thrown stoneware ceramic vase featuring a modern sculptural silhouette. Matte off-white glaze finish perfect for dried botanicals.",
    price: 68.0,
    compareAtPrice: 85.0,
    category: "Home & Living",
    tags: ["Ceramic", "Handmade", "Minimalist", "Decor"],
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&fit=crop",
    ],
    stock: 24,
    vendorId: "vnd-1",
    vendorName: "Nordic Living Studio",
    rating: 4.9,
    reviewCount: 32,
    reviews: [
      {
        id: "rev-1",
        userId: "usr-1",
        userName: "Alex Morgan",
        userAvatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        comment:
          "Exceptional craftsmanship. The texture and weight feel so premium on my coffee table.",
        createdAt: "2024-08-10",
      },
    ],
    isFeatured: true,
    createdAt: "2024-02-10",
  },
  {
    id: "prod-2",
    title: "Wireless ANC Studio Headphones",
    slug: "wireless-anc-studio-headphones",
    description:
      "40mm custom beryllium drivers with hybrid active noise cancellation, 45-hour battery life, and buttery sheepskin ear cushions.",
    price: 249.0,
    compareAtPrice: 299.0,
    category: "Electronics",
    tags: ["Audio", "Wireless", "Headphones", "Noise Cancellation"],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&fit=crop",
    ],
    stock: 15,
    vendorId: "vnd-2",
    vendorName: "Vance Tech Labs",
    rating: 4.8,
    reviewCount: 48,
    reviews: [],
    isFeatured: true,
    createdAt: "2024-01-20",
  },
  {
    id: "prod-3",
    title: "Heritage Full-Grain Leather Briefcase",
    slug: "heritage-full-grain-leather-briefcase",
    description:
      "Vegetable-tanned full-grain leather laptop satchel. Built with solid brass hardware, YKK Excella zippers, and dedicated 16-inch laptop protection.",
    price: 320.0,
    compareAtPrice: 380.0,
    category: "Fashion",
    tags: ["Leather", "Handcrafted", "Bags", "Work"],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&fit=crop",
    ],
    stock: 9,
    vendorId: "vnd-3",
    vendorName: "Artisan Leatherworks",
    rating: 5.0,
    reviewCount: 19,
    reviews: [],
    isFeatured: true,
    createdAt: "2024-03-05",
  },
  {
    id: "prod-4",
    title: "Custom Mechanical Keyboard (Hot-swappable)",
    slug: "custom-mechanical-keyboard",
    description:
      "CNC Anodized aluminum case with gasket mount structure, factory-lubed linear switches, and dye-sub PBT keycaps.",
    price: 185.0,
    category: "Electronics",
    tags: ["Mechanical Keyboard", "Tech", "Workstation"],
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&fit=crop",
    ],
    stock: 20,
    vendorId: "vnd-2",
    vendorName: "Vance Tech Labs",
    rating: 4.9,
    reviewCount: 27,
    reviews: [],
    isFeatured: false,
    createdAt: "2024-02-18",
  },
  {
    id: "prod-5",
    title: "Nordic Walnut Dining Chair",
    slug: "nordic-walnut-dining-chair",
    description:
      "Solid American walnut dining chair with ergonomic curved backrest and natural linen cushioned seat.",
    price: 210.0,
    compareAtPrice: 250.0,
    category: "Home & Living",
    tags: ["Furniture", "Woodwork", "Scandinavian", "Chair"],
    images: [
      "https://images.unsplash.com/photo-1580481077195-c328a37ea71a?w=800&fit=crop",
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&fit=crop",
    ],
    stock: 12,
    vendorId: "vnd-1",
    vendorName: "Nordic Living Studio",
    rating: 4.7,
    reviewCount: 14,
    reviews: [],
    isFeatured: true,
    createdAt: "2024-02-25",
  },
  {
    id: "prod-6",
    title: "Slim Bifold Leather Card Wallet",
    slug: "slim-bifold-leather-card-wallet",
    description:
      "Ultra-compact RFID-blocking wallet holding up to 8 cards and folded cash. Hand-stitched with waxed linen thread.",
    price: 48.0,
    category: "Fashion",
    tags: ["Wallet", "Accessories", "Leather", "Everyday Carry"],
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&fit=crop",
    ],
    stock: 35,
    vendorId: "vnd-3",
    vendorName: "Artisan Leatherworks",
    rating: 4.8,
    reviewCount: 42,
    reviews: [],
    isFeatured: false,
    createdAt: "2024-03-12",
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-9821",
    userId: "usr-1",
    customerName: "Alex Morgan",
    customerEmail: "alex@example.com",
    shippingAddress: {
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "OR",
      postalCode: "97477",
      country: "USA",
    },
    items: [
      {
        productId: "prod-1",
        productTitle: "Minimalist Ceramic Arc Vase",
        productImage:
          "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&fit=crop",
        price: 68.0,
        quantity: 1,
        vendorId: "vnd-1",
        vendorName: "Nordic Living Studio",
      },
      {
        productId: "prod-2",
        productTitle: "Wireless ANC Studio Headphones",
        productImage:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&fit=crop",
        price: 249.0,
        quantity: 1,
        vendorId: "vnd-2",
        vendorName: "Vance Tech Labs",
      },
    ],
    totalAmount: 317.0,
    subtotal: 317.0,
    shippingFee: 0.0,
    tax: 0.0,
    status: "Processing",
    createdAt: "2024-09-20T14:32:00Z",
  },
];

export const PRODUCT_CATEGORIES = [
  "All",
  "Home & Living",
  "Electronics",
  "Fashion",
  "Art & Crafts",
  "Wellness",
] as const;
