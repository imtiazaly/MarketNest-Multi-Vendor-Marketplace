// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { MOCK_USERS } from "@/data/mockData";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password?: string,
  ) => { success: boolean; error?: string };
  quickLogin: (role: UserRole, vendorId?: string) => void;
  register: (data: {
    name: string;
    email: string;
    role: UserRole;
    storeName?: string;
  }) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  availableUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  // Default to Alex Morgan for demo fluidity or null
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[0]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedActiveUser = localStorage.getItem("marketnest_active_user");
    const savedUsersList = localStorage.getItem("marketnest_all_users");

    let currentUsersList = MOCK_USERS;
    if (savedUsersList) {
      try {
        currentUsersList = JSON.parse(savedUsersList);
        setUsers(currentUsersList);
      } catch (e) {
        console.error(e);
      }
    }

    if (savedActiveUser) {
      try {
        const parsed = JSON.parse(savedActiveUser);
        setCurrentUser(parsed);
      } catch (e) {
        setCurrentUser(currentUsersList[0]);
      }
    }
    setIsInitialized(true);
  }, []);

  const saveSession = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem("marketnest_active_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("marketnest_active_user");
    }
  };

  const login = (email: string) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (!found) {
      return { success: false, error: "No account found with this email." };
    }
    saveSession(found);
    return { success: true };
  };

  const quickLogin = (role: UserRole, vendorId?: string) => {
    if (role === "vendor") {
      const vendorUser = vendorId
        ? users.find((u) => u.vendorId === vendorId)
        : users.find((u) => u.role === "vendor");
      if (vendorUser) saveSession(vendorUser);
    } else {
      const matched = users.find((u) => u.role === role);
      if (matched) saveSession(matched);
    }
  };

  const register = (data: {
    name: string;
    email: string;
    role: UserRole;
    storeName?: string;
  }) => {
    const exists = users.some(
      (u) => u.email.toLowerCase() === data.email.trim().toLowerCase(),
    );
    if (exists) {
      return {
        success: false,
        error: "Email is already registered. Please sign in.",
      };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      role: data.role,
      vendorId: data.role === "vendor" ? `vnd-${Date.now()}` : undefined,
    };

    const updatedList = [newUser, ...users];
    setUsers(updatedList);
    localStorage.setItem("marketnest_all_users", JSON.stringify(updatedList));
    saveSession(newUser);
    return { success: true };
  };

  const logout = () => {
    saveSession(null);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    saveSession(updated);

    const updatedList = users.map((u) => (u.id === updated.id ? updated : u));
    setUsers(updatedList);
    localStorage.setItem("marketnest_all_users", JSON.stringify(updatedList));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        quickLogin,
        register,
        logout,
        updateProfile,
        availableUsers: users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}