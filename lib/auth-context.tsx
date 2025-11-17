"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
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
  const hasSyncedRef = useRef(false);

  const syncUserFromCookie = () => {
    if (typeof window === "undefined") return null;
    
    try {
      // Get user data from cookie
      const cookies = document.cookie.split("; ");
      const userCookie = cookies.find((row) => row.trim().startsWith("user="));
      
      if (userCookie) {
        
        const cookieValue = userCookie.split("user=")[1]?.trim();
        
        if (!cookieValue) return null;
       
        let decodedValue = cookieValue;
        try {
          // Try to decode if it looks URL-encoded (starts with %)
          if (decodedValue.includes("%")) {
            decodedValue = decodeURIComponent(decodedValue);
          }
        } catch (e) {
          
        }
        
    
        const userFromCookies = JSON.parse(decodedValue) as LoginUser;
        
      
        const { saveUserToStorage } = require("@/lib/auth");
        saveUserToStorage(userFromCookies);
        return userFromCookies;
      }
    } catch (error) {
      console.error("Error syncing user from cookie:", error);
    }
    return null;
  };

  const refreshUser = () => {
    let currentUser = getUserFromStorage();
    
    // If no user in localStorage, try to sync from cookie
    if (!currentUser) {
      const userFromCookie = syncUserFromCookie();
      if (userFromCookie) {
        currentUser = userFromCookie;
      }
    }
    
    setUser(currentUser);
  };

  useEffect(() => {
    
    let currentUser = getUserFromStorage();
    
  //  get user from the cookie if no user in localStorage
    if (!currentUser) {
      const userFromCookie = syncUserFromCookie();
      if (userFromCookie) {
        currentUser = userFromCookie;
      }
    }

    setUser(currentUser);
    setIsLoading(false);

    const checkCookieInterval = setInterval(() => {
      if (!hasSyncedRef.current) {
        const userFromCookie = syncUserFromCookie();
        if (userFromCookie) {
          setUser(userFromCookie);
          hasSyncedRef.current = true;
        }
      }
    }, 100); // Check every 100ms

    // Clear interval after 2 seconds
    const timeoutId = setTimeout(() => {
      clearInterval(checkCookieInterval);
      hasSyncedRef.current = true; 
    }, 2000);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "loggedInUser") {
        refreshUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(checkCookieInterval);
      clearTimeout(timeoutId);
    };
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

