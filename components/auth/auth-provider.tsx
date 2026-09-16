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

  // Client-side route protection (catches bfcache / manual URL entry)
  useEffect(() => {
    if (user && (pathname === "/login" || pathname === "/")) {
      router.replace(`/${user.role}/dashboard`);
    }
  }, [user, pathname, router]);

  const login = (role: Role) => {
    // Set cookie for middleware (expires in 1 day)
    document.cookie = `auth_role=${role}; path=/; max-age=86400`;
    
    if (role === "admin") {
      setUser({
        id: "admin-1",
        name: "System Admin",
        email: "admin@jetson.ai",
        role: "admin",
      });
      router.replace("/admin/dashboard");
    } else {
      setUser({
        id: "user-1",
        name: "John Doe",
        email: "john.doe@student.edu",
        role: "user",
      });
      router.replace("/user/dashboard");
    }
  };

  const logout = () => {
    // Remove cookie
    document.cookie = "auth_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
    router.replace("/login");
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
