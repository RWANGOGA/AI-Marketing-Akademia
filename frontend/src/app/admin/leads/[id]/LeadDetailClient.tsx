"use client";

import { useState } from "react";
import { statusLabel, productName } from "../../_lib/mockData";
import Link from "next/link";
import { updateLeadStatus, updateLeadProduct, approveLeadPitch } from "./actions";

export default function LeadDetailClient({ lead, products }: { lead: any, products: any[] }) {
  const [pitchDraft, setPitchDraft] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsPending(true);
    await updateLeadStatus(lead.id, newStatus);
    setIsPending(false);
    alert(`Status updated to "${statusLabel(newStatus)}".`);
  };

  const handleProductChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProduct = e.target.value;
    setIsPending(true);
    await updateLeadProduct(lead.id, newProduct);
    setIsPending(false);
    alert('Recommended product updated.');
  };

  const getProductName = (id: string) => {
    const p = products.find(prod => prod.id === id);
    return p ? p.name : '—';
  };

  const samplePitch = () => `Hi ${lead.contact_name ? lead.contact_name.split(' ')[0] : 'there'},\n\n${lead.reasoning}\n\n${lead.problem}\n\n${getProductName(lead.product_id)} is built for exactly this. Would you be open to a short call this week to see how it could work for ${lead.company}?\n\nBest,\nAI Pod Team`;
  
  const altPitch = () => `Hi ${lead.contact_name ? lead.contact_name.split(' ')[0] : 'there'},\n\nQuick note — while researching ${lead.company} I noticed: ${lead.discovered?.[0]?.toLowerCase() || 'something interesting'}.\n\nThat's usually the moment ${getProductName(lead.product_id)} helps most: ${lead.problem?.toLowerCase()}\n\nHappy to share exactly how, no pressure — just reply if it's useful.\n\nBest,\nAI Pod Team`;

  const handleGenerate = () => {
    setPitchDraft(samplePitch());
  };

  const handleRegenerate = () => {
    setPitchDraft(prev => prev === samplePitch() ? altPitch() : samplePitch());
  };

  const handleApprove = async () => {
    setIsPending(true);
    await approveLeadPitch(lead.id);
    setPitchDraft(null);
    setIsPending(false);
    alert('Pitch approved — sent to Emails, ready to send.');
  };

  const handleDiscard = () => {
    setPitchDraft(null);
  };

  return (
    <div className="view">
      <Link href="/admin/leads" className="back-link">← Back to leads</Link>
      
      <div className="ld-head">
        <div>
          <h2>{lead.company}</h2>
          <div className="meta">{lead.website} · {lead.industry} · {lead.location}</div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select className="status-select" value={lead.status} onChange={handleStatusChange} disabled={isPending}>
            {['new', 'contacted', 'responded', 'needs-followup', 'meeting', 'customer', 'lost'].map(s => (
              <option key={s} value={s}>{statusLabel(s)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="ld-grid">
        <div>
          <div className="card pad" style={{ marginBottom: '14px' }}>
            <div className="block-title">Company information</div>
            <div className="kv">
              <div className="k">Contact person</div><div>{lead.contact_name || 'Not identified yet'}</div>
              <div className="k">Email</div><div>{lead.email || 'Not identified yet'}</div>
              <div className="k">Website</div><div>{lead.website}</div>
              <div className="k">Location</div><div>{lead.location}</div>
            </div>
          </div>

          <div className="card pad" style={{ marginBottom: '14px' }}>
            <div className="block-title">What we found</div>
            <ul className="discovered-list">
              {lead.discovered?.map((d: string, i: number) => <li key={i}>{d}</li>)}
            </ul>
          </div>

          <div className="card pad">
            <div className="block-title">AI analysis</div>
            <p style={{ fontSize: '12.8px', margin: '0 0 10px 0' }}><b>Likely problem:</b> {lead.problem}</p>
            <div className="insight-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="prod">Recommended: {getProductName(lead.product_id)}</div>
                <select className="status-select" value={lead.product_id} onChange={handleProductChange} style={{ background: '#fff' }} disabled={isPending}>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <p>{lead.reasoning}</p>
            </div>
          </div>
        </div>

        <div className="card pad">
          <div className="block-title">Sales pitch</div>
          {pitchDraft === null && !lead.pitch_approved ? (
            <>
              <p style={{ fontSize: '12.5px', color: 'var(--ink-muted)', margin: '0 0 14px 0' }}>No pitch has been generated for this lead yet.</p>
              <button className="btn btn-primary" onClick={handleGenerate} style={{ width: '100%', justifyContent: 'center' }}>Generate sales pitch</button>
            </>
          ) : (
            <>
              <textarea 
                id="pitch-text" 
                rows={14} 
                defaultValue={pitchDraft !== null ? pitchDraft : samplePitch()}
              />
              <div className="pitch-toolbar">
                <button className="btn btn-sm" onClick={handleRegenerate} disabled={isPending}>Regenerate</button>
                <button className="btn btn-sm btn-primary" onClick={handleApprove} disabled={isPending}>Approve</button>
                <button className="btn btn-sm btn-danger" onClick={handleDiscard} disabled={isPending}>Discard</button>
              </div>
              {lead.pitch_approved && pitchDraft === null && (
                <p style={{ fontSize: '11.5px', color: 'var(--good)', marginTop: '10px', fontWeight: 600 }}>✓ Approved — sent to Emails as ready to send.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
