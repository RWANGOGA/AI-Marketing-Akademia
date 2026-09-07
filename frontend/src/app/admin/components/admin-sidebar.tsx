"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/leads", label: "Leads", icon: "👥" },
  { href: "/admin/campaigns", label: "Campaigns", icon: "📢" },
  { href: "/admin/products", label: "Products", icon: "📦" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-slate-900 text-slate-100 p-4 flex flex-col">
      <div className="font-bold text-lg mb-8 tracking-tight">Akademia Admin</div>
      <nav className="flex flex-col gap-1 text-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
