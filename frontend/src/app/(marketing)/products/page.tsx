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
            {dbProducts.map((p: any) => {
              // Find the matching marketing product for SVGs and visual styles
              const mProd: any = MarketingProducts.find((mp: any) => mp.id === p.id) || MarketingProducts[0];
              const SvgComponent = mProd.svg;

              return (
                <div key={p.id} className="pcard full" style={{ '--accent': mProd.accent, '--accent-tint': mProd.tint, '--accent-dark': mProd.dark } as React.CSSProperties}>
                  <div className="pcard-visual">
                    {SvgComponent && <SvgComponent />}
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
  );
}
