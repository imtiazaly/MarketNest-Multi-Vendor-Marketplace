import type { NextConfig } from "next";

// Vercel pe deploy hoga toh VERCEL=1 automatically set hoti hai
// GitHub Pages pe deploy ke liye output=export aur basePath zaroori hai
const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Static export sirf GitHub Pages ke liye — Vercel pe nahi chahiye
  ...(isVercel ? {} : { output: "export" }),

  // basePath sirf GitHub Pages ke liye — Vercel root pe host karta hai
  ...(isVercel
    ? {}
    : { basePath: "/MarketNest-Multi-Vendor-Marketplace" }),

  images: {
    unoptimized: true,
  },
};

export default nextConfig;