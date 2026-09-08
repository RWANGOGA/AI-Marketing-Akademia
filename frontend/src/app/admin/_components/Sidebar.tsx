"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/leads", label: "Leads", icon: "👥" },
  { href: "/admin/campaigns", label: "Campaigns", icon: "📢" },
  { href: "/admin/products", label: "Products", icon: "📦" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>
      <aside className={`nav ${mobileOpen ? "nav-open" : ""}`}>
        <div className="nav-brand">
          <div className="mark">AM</div>
          <div>
            <div className="name">AI Marketer</div>
            <div className="sub">ADMIN</div>
          </div>
        </div>
        <div className="nav-list">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="nav-foot">v0.9 · Prototype</div>
      </aside>
      <div
        className={`nav-overlay ${mobileOpen ? "nav-overlay-open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />
    </>
  );
}
