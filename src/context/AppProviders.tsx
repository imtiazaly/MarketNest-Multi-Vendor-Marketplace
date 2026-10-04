"use client";

import React from "react";
import { AuthProvider } from "./AuthContext";
import { MarketplaceProvider } from "./MarketplaceContext";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { CompareProvider } from "./CompareContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>{children}</CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </MarketplaceProvider>
    </AuthProvider>
  );
}