"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ICONS } from "../_lib/marketingData";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const NavLinks = () => (
    <>
      <Link href="/" className={isActive('/') ? 'active' : ''} onClick={() => setMobileOpen(false)}>Home</Link>
      <Link href="/products" className={isActive('/products') ? 'active' : ''} onClick={() => setMobileOpen(false)}>Products</Link>
      <Link href="/news" className={isActive('/news') ? 'active' : ''} onClick={() => setMobileOpen(false)}>News</Link>
      <Link href="/about" className={isActive('/about') ? 'active' : ''} onClick={() => setMobileOpen(false)}>About</Link>
      <Link href="/contact" className={isActive('/contact') ? 'active' : ''} onClick={() => setMobileOpen(false)}>Contact</Link>
    </>
  );

  return (
    <header>
      <div className="hd-inner">
        <Link href="/" className="logo" onClick={() => setMobileOpen(false)}>
          <img src="/favicon.svg" className="mark" alt="Logo" />
          AI Marketer
        </Link>
        <nav className="mainnav">
          <NavLinks />
        </nav>
        <div className="hd-right">
          <Link href="/contact" className="btn btn-secondary" style={{ borderColor: 'transparent' }}>Contact sales</Link>
          <Link href="/products" className="btn btn-primary">Get started free</Link>
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? ICONS.close : ICONS.menu}
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <NavLinks />
        <Link href="/contact" className="btn btn-secondary" style={{ borderColor: 'transparent' }}>Contact sales</Link>
        <Link href="/products" className="btn btn-primary">Get started free</Link>
      </div>
    </header>
  );
}
