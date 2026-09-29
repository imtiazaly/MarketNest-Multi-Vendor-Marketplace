// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { MOCK_USERS } from "@/data/mockData";

interface AuthContextType {
  currentUser: User;
  switchUser: (userId: string) => void;
  switchRole: (role: UserRole) => void;
  availableUsers: User[];
  isVendor: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]); // Default: Alex (Customer)

  useEffect(() => {
    const savedUserId = localStorage.getItem("marketnest_active_user");
    if (savedUserId) {
      const found = MOCK_USERS.find((u) => u.id === savedUserId);
      if (found) setCurrentUser(found);
    }
  }, []);

  const switchUser = (userId: string) => {
    const selected = MOCK_USERS.find((u) => u.id === userId);
    if (selected) {
      setCurrentUser(selected);
      localStorage.setItem("marketnest_active_user", selected.id);
    }
  };

  const switchRole = (role: UserRole) => {
    const userWithRole = MOCK_USERS.find((u) => u.role === role);
    if (userWithRole) {
      switchUser(userWithRole.id);
    }
  };

  const value: AuthContextType = {
    currentUser,
    switchUser,
    switchRole,
    availableUsers: MOCK_USERS,
    isVendor: currentUser.role === "vendor",
    isAdmin: currentUser.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
