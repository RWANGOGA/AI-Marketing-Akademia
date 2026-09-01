import Link from "next/link";
import { PRODUCTS } from "../_lib/marketingData";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="logo" style={{ color: 'var(--on-primary)' }}>
              <img src="/favicon.svg" className="mark" alt="Logo" />
              AI Marketer
            </Link>
            <p>Four practical AI products, explained plainly and matched to what you actually need.</p>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="foot-col">
            <h4>Products</h4>
            {PRODUCTS.map(p => (
              <Link key={p.id} href={`/products/${p.id}`}>{p.name}</Link>
            ))}
          </div>
          <div className="foot-col">
            <h4>Read</h4>
            <Link href="/news">News</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 AI Marketer. All rights reserved.</div>
          <div>Kampala · Nairobi · Remote</div>
        </div>
      </div>
    </footer>
  );
}
