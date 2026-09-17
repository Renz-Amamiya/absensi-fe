"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu } from "lucide-react";

interface TopHeaderProps {
  onMenuClick?: () => void;
}

export function TopHeader({ onMenuClick }: TopHeaderProps = {}) {
  const { user } = useAuth();

  return (
    <header className="h-16 mx-4 mt-4 mb-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-blue-100 shadow-[0_4px_24px_-8px_rgba(37,99,235,0.15)] flex items-center justify-between px-6 sticky top-4 z-10 transition-all duration-300">
      <div className="flex items-center">
        <h2 className="text-xl font-extrabold text-blue-900 tracking-tight">
          {user?.role === "admin" ? "Portal Admin" : "Portal Pengguna"}
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <button className="relative p-2.5 text-blue-600 hover:text-blue-800 transition-all duration-300 rounded-xl hover:bg-blue-50 shadow-sm hover:shadow-md">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
        </button>

        <Link href={`/${user?.role || 'user'}/profile`} className="hidden md:flex items-center gap-4 pl-6 cursor-pointer group">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-blue-900 leading-none group-hover:text-blue-700 transition-colors">
              {user?.name}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {user?.role === 'admin' ? 'Administrator' : 'Siswa'}
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity"></div>
            <Avatar className="relative h-10 w-10 border-2 border-yellow-400 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <AvatarImage src="" alt="@avatar" />
              <AvatarFallback className="bg-gradient-to-br from-blue-700 to-blue-800 text-white font-bold">
                {user?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </Link>
        
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-blue-600 hover:text-blue-800 transition-colors rounded-lg hover:bg-blue-50"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
