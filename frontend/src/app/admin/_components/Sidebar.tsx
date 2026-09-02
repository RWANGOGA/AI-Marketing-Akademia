"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICONS, LEADS, EMAILS, AUTOMATIONS } from "../_lib/mockData";
import { useEffect, useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItem = (id: keyof typeof ICONS, label: string, route: string, badge?: number) => {
    const active = pathname.startsWith(`/admin/${route}`);
    return (
      <Link href={`/admin/${route}`} className={`nav-item ${active ? 'active' : ''}`}>
        <span dangerouslySetInnerHTML={{ __html: ICONS[id] }} />
        <span>{label}</span>
        {mounted && badge ? <span className="badge">{badge}</span> : null}
      </Link>
    );
  };

  return (
    <div className="nav">
      <div className="nav-brand">
        <div className="mark">AP</div>
        <div>
          <div className="name">AI Marketer</div>
          <div className="sub">ADMIN</div>
        </div>
      </div>
      <div className="nav-list">
        {navItem('dashboard', 'Dashboard', 'dashboard')}
        {navItem('leads', 'Leads', 'leads', LEADS.filter(l => l.status === 'needs-followup').length)}
        {navItem('campaigns', 'Campaigns', 'campaigns')}
        {navItem('emails', 'Emails', 'emails', EMAILS.filter(e => e.status === 'pending').length)}
        {navItem('automation', 'Automation', 'automation', AUTOMATIONS.filter(a => a.status === 'failed').length)}
        {navItem('products', 'Products', 'products')}
        {navItem('content', 'Content', 'content')}
        {navItem('settings', 'Settings', 'settings')}
      </div>
      <div className="nav-foot">v0.9 · Prototype</div>
    </div>
  );
}
