import Link from "next/link";
import { PRODUCTS as MarketingProducts, ICONS } from "../../../admin/_lib/mockData";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const res = await query('SELECT * FROM products WHERE id = $1', [resolvedParams.id]);
  const dbProduct = res.rows[0];
  
  if (!dbProduct) {
    notFound();
  }

  const mProd: any = MarketingProducts.find((p: any) => p.id === resolvedParams.id) || MarketingProducts[0];
  const heavyVisual = mProd.id === 'dojo' || mProd.id === 'world';
  const SvgComponent = mProd.svg;

  return (
    <div style={{ '--accent': mProd.accent, '--accent-tint': mProd.tint, '--accent-dark': mProd.dark } as React.CSSProperties}>
      <section className="pd-hero">
        <div className="wrap">
          <div className="pd-hero-grid">
            <div>
              <h1>{dbProduct.name}</h1>
              <p className="pd-tagline">{mProd.tagline}</p>
              <p style={{ fontSize: '15px', color: 'var(--ink-muted)', maxWidth: '460px', marginBottom: '26px' }}>{dbProduct.description}</p>
              <div className="hero-cta" style={{ justifyContent: 'flex-start' }}>
                <Link href={`/contact?preset=${dbProduct.name}`} className="btn btn-primary btn-lg">Contact us about {dbProduct.name}</Link>
                <Link href="/products" className="btn btn-secondary btn-lg">All products</Link>
              </div>
            </div>
            <div className="pd-visual"><SvgComponent /></div>
          </div>
        </div>
      </section>

      {heavyVisual && (
        <section>
          <div className="wrap">
            <div className="sec-head"><h2>{mProd.id === 'dojo' ? 'The avatar experience' : 'Explore Japan'}</h2></div>
            <div className="gallery-grid">
              {[0, 1, 2, 3].map((_, i) => (
                <div key={i} className="gallery-tile"><SvgComponent /></div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-tight">
        <div className="wrap">
          <div className="sec-head"><h2>What it does</h2></div>
          <div className="cap-grid">
            {mProd.capabilities.map((c, i) => (
              <div key={i} className="cap-card">
                <div className="ic">{ICONS[c.icon]}</div>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="who-row">
            <div>
              <h3>The problem</h3>
              <p>{dbProduct.problem}</p>
            </div>
            <div>
              <h3>Who it’s for</h3>
              <p>{dbProduct.target}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h3>Curious whether {dbProduct.name} fits what you need?</h3>
              <p>Tell us about your situation and we’ll give you a straight answer.</p>
            </div>
            <Link href={`/contact?preset=${dbProduct.name}`} className="btn btn-primary btn-lg" style={{ background: 'var(--on-primary)', color: 'var(--primary)', borderColor: 'var(--on-primary)' }}>
              Contact us about {dbProduct.name}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const res = await query('SELECT id FROM products');
    return res.rows.map((p: any) => ({ id: p.id }));
  } catch (err) {
    return MarketingProducts.map((p: any) => ({ id: p.id }));
  }
}
