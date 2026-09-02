<<<<<<< HEAD
import { apiFetch } from "@/lib/api";
import type { Product } from "@/types";

export default async function ProductsPage() {
  // const products = await apiFetch<Product[]>("/products");
  return (
    <section className="px-8 py-16">
      <h1 className="text-3xl font-semibold">Our products</h1>
      <p className="mt-2 text-gray-600">TODO: render product cards, fetch from /api/products</p>
    </section>
=======
import Link from "next/link";
import { PRODUCTS as MarketingProducts } from "../../admin/_lib/mockData";
import { query } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function ProductsOverviewPage() {
  const res = await query('SELECT * FROM products WHERE published = true ORDER BY created_at ASC');
  const dbProducts = res.rows;

  return (
    <>
      <section className="hero hero-left" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <h1 style={{ fontSize: '36px' }}>One company, four practical AI tools.</h1>
        </div>
      </section>
      
      <section>
        <div className="wrap">
          <div className="products-grid">
            {dbProducts.map(p => {
              // Find the matching marketing product for SVGs and visual styles
              const mProd = MarketingProducts.find(mp => mp.id === p.id) || MarketingProducts[0];
              const SvgComponent = mProd.svg;
              
              return (
                <div key={p.id} className="pcard full" style={{ '--accent': mProd.accent, '--accent-tint': mProd.tint, '--accent-dark': mProd.dark } as React.CSSProperties}>
                  <div className="pcard-visual">
                    <SvgComponent />
                  </div>
                  <div className="pcard-body">
                    <h3>{p.name}</h3>
                    <p className="desc">{p.description}</p>
                    <div className="meta-row">
                      <div><div className="k">Problem it solves</div>{p.problem}</div>
                    </div>
                    <div className="meta-row">
                      <div><div className="k">Who it’s for</div>{p.target}</div>
                    </div>
                    <Link href={`/products/${p.id}`} className="learn">Learn more</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
>>>>>>> frontend-setup
  );
}
