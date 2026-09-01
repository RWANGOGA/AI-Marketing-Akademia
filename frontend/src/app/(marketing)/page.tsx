import Link from "next/link";
import { PRODUCTS, ICONS } from "./_lib/marketingData";

export default function HomePage() {
  return (
    <>
      <section className="hero hero-left">
        <div className="wrap">
          <h1>Four practical AI products. One place to find the right one.</h1>
          <div className="hero-cta">
            <Link href="/products" className="btn btn-primary btn-lg">Get started free</Link>
            <Link href="/contact" className="btn btn-secondary btn-lg">Book a demo</Link>
          </div>
          <div className="dock">
            {PRODUCTS.map(p => {
              const SvgComponent = p.svg;
              return (
                <Link key={p.id} href={`/products/${p.id}`} className="dock-tile" style={{ '--tile-accent': p.accent, '--tile-tint': p.tint } as React.CSSProperties}>
                  <div className="dock-icon">{ICONS[p.icon]}</div>
                  <div className="t-name">{p.name}</div>
                  <div className="t-go">Learn more</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="sec-head"><h2>Why AI Marketer</h2></div>
          <div className="why-grid">
            <div className="why-item">
              <div className="num">01</div>
              <h3>Four products, one place to start</h3>
              <p>You don’t need to evaluate ten different AI vendors. We represent four practical tools and can point you to the one that actually fits.</p>
            </div>
            <div className="why-item">
              <div className="num">02</div>
              <h3>Plain explanations, not sales pitches</h3>
              <p>Ask what a product does and we’ll tell you clearly including when it isn’t the right fit for what you need.</p>
            </div>
            <div className="why-item">
              <div className="num">03</div>
              <h3>A real team on the other end</h3>
              <p>Contact goes to people who know these products, not an automated queue.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <h2>Our products</h2>
            <p>Four tools, four different jobs. See what each one actually does.</p>
          </div>
          <div className="products-grid">
            {PRODUCTS.map(p => {
              const SvgComponent = p.svg;
              return (
                <div key={p.id} className="pcard" style={{ '--accent': p.accent, '--accent-tint': p.tint, '--accent-dark': p.dark } as React.CSSProperties}>
                  <div className="pcard-visual">
                    <SvgComponent />
                  </div>
                  <div className="pcard-body">
                    <h3>{p.name}</h3>
                    <p className="desc">{p.desc}</p>
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
