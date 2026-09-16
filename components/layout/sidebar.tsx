"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { LayoutDashboard, Users, FileText, CalendarCheck, ShieldCheck, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const adminLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Master Data", href: "/admin/master-data", icon: Users },
  { name: "Global Logs", href: "/admin/logs", icon: FileText },
];

const userLinks = [
  { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
  { name: "My History", href: "/user/history", icon: CalendarCheck },
];

interface SidebarProps {
  onLinkClick?: () => void;
}

export function Sidebar({ onLinkClick }: SidebarProps = {}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = user?.role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen flex flex-col shadow-lg transition-all duration-300">
      <div className="p-6 border-b border-blue-600 flex items-center gap-3">
        <ShieldCheck className="w-8 h-8 text-yellow-400" />
        <h1 className="text-xl font-bold tracking-tight">Jetson Attend</h1>
      </div>
      <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm",
                isActive
                  ? "bg-white text-blue-700 shadow-sm"
                  : "hover:bg-blue-600 text-blue-100"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-blue-700" : "text-blue-200")} />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <Link 
        href={`/${user?.role || 'user'}/profile`} 
        onClick={onLinkClick}
        className="md:hidden p-4 border-t border-blue-600 flex items-center gap-3 bg-blue-800/30 hover:bg-blue-800/50 transition-colors"
      >
        <Avatar className="h-10 w-10 border border-blue-500">
          <AvatarImage src="" alt="@avatar" />
          <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
            {user?.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white truncate max-w-[140px]">{user?.name}</span>
          <span className="text-xs text-blue-200 truncate max-w-[140px]">{user?.email}</span>
        </div>
      </Link>
      <div className="p-4 border-t border-blue-600">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors font-medium text-sm hover:bg-blue-600 text-blue-100"
        >
          <LogOut className="w-5 h-5 text-blue-200" />
          Logout
        </button>
      </div>
    </aside>
  );
}
