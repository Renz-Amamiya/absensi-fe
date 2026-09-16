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
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
          {user?.role === "admin" ? "Admin Portal" : "User Portal"}
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <button className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors rounded-full hover:bg-slate-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-yellow-400 rounded-full border border-white"></span>
        </button>

        <Link href={`/${user?.role || 'user'}/profile`} className="hidden md:flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-700 leading-none">
              {user?.name}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {user?.email}
            </p>
          </div>
          <Avatar className="h-9 w-9 border border-slate-200">
            <AvatarImage src="" alt="@avatar" />
            <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
              {user?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
        
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-slate-100"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
