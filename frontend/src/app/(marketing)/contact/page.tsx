<<<<<<< HEAD
export default function ContactPage() {
  return (
    <section className="px-8 py-16">
      <h1 className="text-3xl font-semibold">Contact us</h1>
      <p className="mt-2 text-gray-600">TODO: port contact form, POST to /api/leads or /api/contact</p>
    </section>
=======
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactForm() {
  const searchParams = useSearchParams();
  const preset = searchParams.get('preset');
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [product, setProduct] = useState(preset || "General Enquiry");

  useEffect(() => {
    if (preset) {
      setProduct(preset);
    }
  }, [preset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => {
      setShowConfirm(false);
    }, 5000);
  };

  return (
    <>
      <div className={`confirm ${showConfirm ? 'show' : ''}`}>
        <h3>Message sent</h3>
        <p>Thanks someone from AI Marketer will get back to you shortly.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="field-row">
          <div className="field">
            <label>Name</label>
            <input type="text" required placeholder="Your name" />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" required placeholder="you@company.com" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Company <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>(if applicable)</span></label>
            <input type="text" placeholder="Company name" />
          </div>
          <div className="field">
            <label>Product</label>
            <select value={product} onChange={(e) => setProduct(e.target.value)}>
              {['AI Pod', 'AI Recruiter', 'AI Dojo', 'AI World', 'General Enquiry'].map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="field">
          <label>Message</label>
          <textarea rows={6} required placeholder="Tell us a bit about what you need..."></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-lg">Send message</button>
      </form>
    </>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="hero hero-left" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <h1 style={{ fontSize: '36px' }}>Tell us what you’re trying to solve.</h1>
        </div>
      </section>
      
      <section className="section-tight">
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <Suspense fallback={<div>Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
            
            <div className="contact-info">
              <h3>Other ways to reach us</h3>
              <div className="ci-row">
                <div className="lab">Email</div>
                <div>hello@aimarketer.com</div>
              </div>
              <div className="ci-row">
                <div className="lab">Phone</div>
                <div>+256 700 000 000</div>
              </div>
              <div className="ci-row">
                <div className="lab">Hours</div>
                <div>Mon–Fri, 9:00–17:00 EAT</div>
              </div>
              <div className="ci-row">
                <div className="lab">Products</div>
                <div>AI Pod · AI Recruiter · AI Dojo · AI World</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
>>>>>>> frontend-setup
  );
}
