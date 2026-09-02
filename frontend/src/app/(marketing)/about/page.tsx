import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="hero about-hero" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <h1 style={{ fontSize: '36px' }}>We market four AI products we can actually explain.</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="about-list">
            <div className="row">
              <div className="k">What we do</div>
              <p>We market and explain four practical AI products and connect interested organisations with the right one for their situation.</p>
            </div>
            <div className="row">
              <div className="k">How we work</div>
              <p>No pricing games, no forced bundles. You ask about a product, we explain it plainly and you decide if it’s worth a conversation.</p>
            </div>
            <div className="row">
              <div className="k">Who it’s for</div>
              <p>Teams managing work, HR teams hiring people, anyone exploring AI avatars and travellers or organisations interested in Japan.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h3>Want to talk to someone directly?</h3>
              <p>Reach out and tell us what you’re trying to solve.</p>
            </div>
            <Link href="/contact" className="btn btn-primary btn-lg" style={{ background: 'var(--on-primary)', color: 'var(--primary)', borderColor: 'var(--on-primary)' }}>
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
