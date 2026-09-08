"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ICONS } from "./icons";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: ICONS.dashboard },
  { href: "/admin/leads", label: "Leads", icon: ICONS.leads },
  { href: "/admin/campaigns", label: "Campaigns", icon: ICONS.campaigns },
  { href: "/admin/emails", label: "Emails", icon: ICONS.emails },
  { href: "/admin/automation", label: "Automation", icon: ICONS.automation },
  { href: "/admin/products", label: "Products", icon: ICONS.products },
  { href: "/admin/content", label: "Content", icon: ICONS.content },
  { href: "/admin/settings", label: "Settings", icon: ICONS.settings },
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
                <span
                  className="nav-icon"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
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
