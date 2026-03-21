"use client";

import { LayoutDashboard, MessageSquare, Settings, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: MessageSquare, label: "Tickets", href: "/dashboard/tickets" },
  { icon: Users, label: "Customers", href: "/dashboard/customers" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen glass border-r border-white/10 flex flex-col p-4 fixed left-0 top-0 z-40">
      <div className="flex items-center gap-2 mb-10 px-2 pt-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <MessageSquare className="text-white" size={18} />
        </div>
        <span className="font-bold text-lg tracking-tight">SmartSupport</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              pathname === item.href 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "hover:bg-white/5 text-neutral-400 hover:text-white"
            )}
          >
            <item.icon size={20} className={cn(pathname === item.href ? "text-white" : "group-hover:scale-110 transition-transform")} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-neutral-400 hover:text-red-500 transition-all mt-auto group">
        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}
