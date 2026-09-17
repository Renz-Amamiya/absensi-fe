"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export type Role = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextProps {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Load user from cookie on mount
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(c => c.trim().startsWith('auth_role='));
    
    if (authCookie) {
      const roleValue = authCookie.split('=')[1] as Role;
      if (roleValue === "admin") {
        setUser({ id: "admin-1", name: "System Admin", email: "admin@jetson.ai", role: "admin" });
      } else if (roleValue === "user") {
        setUser({ id: "user-1", name: "John Doe", email: "john.doe@student.edu", role: "user" });
      }
    }
  }, []);

  // Use useLayoutEffect on client to prevent flashing of cached pages before redirect
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  // Client-side route protection (catches bfcache / manual URL entry / cached history)
  useIsomorphicLayoutEffect(() => {
    // Re-verify cookie on client to bypass any React state caching (BFCache)
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(c => c.trim().startsWith('auth_role='));
    const roleValue = authCookie ? authCookie.split('=')[1] : null;

    // If no cookie, they must be on login page
    if (!roleValue) {
      if (pathname !== "/login" && pathname !== "/") {
        // Use replace synchronously before paint
        window.location.replace("/login");
      }
      return;
    }

    // If they have cookie, enforce role boundaries
    if (pathname === "/login" || pathname === "/") {
      router.replace(`/${roleValue}/dashboard`);
    } else if (roleValue === "user" && pathname.startsWith("/admin")) {
      router.replace("/user/dashboard");
    } else if (roleValue === "admin" && pathname.startsWith("/user")) {
      router.replace("/admin/dashboard");
    }
  }, [pathname, router]);

  // Force hard refresh on Back/Forward browser navigation to trigger Server Middleware
  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const login = (role: Role) => {
    // Set cookie for middleware (expires in 1 day)
    document.cookie = `auth_role=${role}; path=/; max-age=86400`;
    
    // Use replace to prevent back button from returning to login page
    window.location.replace(`/${role}/dashboard`);
  };

  const logout = () => {
    // Remove cookie
    document.cookie = "auth_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    // Use replace to prevent back button from returning to protected pages
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
