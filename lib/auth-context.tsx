"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { LoginUser } from "@/app/login/login-action";
import {
  getUserFromStorage,
  removeUserFromStorage,
  hasRole,
  hasAnyRole,
} from "@/lib/auth";

type AuthContextType = {
  user: LoginUser | null;
  isLoading: boolean;
  logout: () => void;
  refreshUser: () => void;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = () => {
    const currentUser = getUserFromStorage();
    setUser(currentUser);
  };

  useEffect(() => {
    // Load user from localStorage on mount
    refreshUser();
    setIsLoading(false);

    // Listen for storage changes (e.g., when login happens in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "loggedInUser") {
        refreshUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    removeUserFromStorage();
    setUser(null);
    window.location.href = "/login";
  };

  const checkRole = (role: string) => {
    return hasRole(user, role);
  };

  const checkAnyRole = (roles: string[]) => {
    return hasAnyRole(user, roles);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        logout,
        refreshUser,
        hasRole: checkRole,
        hasAnyRole: checkAnyRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

