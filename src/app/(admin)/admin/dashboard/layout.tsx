"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Quote as QuoteIcon, Image, Trophy, ShoppingBag, Users, BarChart3, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: FileText, label: "Artikel", href: "/admin/dashboard/articles" },
  { icon: QuoteIcon, label: "Quote", href: "/admin/dashboard/quotes" },
  { icon: Image, label: "Wallpaper", href: "/admin/dashboard/wallpapers" },
  { icon: Trophy, label: "Challenge", href: "/admin/dashboard/challenges" },
  { icon: ShoppingBag, label: "Store", href: "/admin/dashboard/store" },
  { icon: Users, label: "Pengguna", href: "/admin/dashboard/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/dashboard/analytics" },
  { icon: Settings, label: "Pengaturan", href: "/admin/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Sidebar Panel */}
      <aside className="w-64 border-r border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-900 px-4 py-6 flex flex-col justify-between fixed h-full z-30">
        <div className="space-y-6">
          <div className="px-2 py-1">
            <span className="font-serif text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">TM Admin Portal</span>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    isActive 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50" 
                      : "text-neutral-500 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-900/50"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div>
          <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-all">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        <header className="h-14 border-b border-neutral-200 dark:border-neutral-900 bg-white/80 dark:bg-neutral-900/80 backdrop-blur sticky top-0 z-20 px-8 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 capitalize">
            {pathname.split("/").pop() || "Overview"}
          </h2>
          <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </header>
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
