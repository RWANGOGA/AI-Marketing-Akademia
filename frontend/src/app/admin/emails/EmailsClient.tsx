"use client";

import { useState } from "react";
import { updateEmailStatus } from "./actions";

export default function EmailsClient({ initialEmails }: { initialEmails: any[] }) {
  const [filter, setFilter] = useState("all");
  const [openEmailId, setOpenEmailId] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const rows = initialEmails.filter(e => filter === "all" || e.status === filter);
  const openEmail = initialEmails.find(e => e.id === openEmailId);

  const handleAction = async (id: string, action: string) => {
    setIsPending(true);
    await updateEmailStatus(id, action);
    setIsPending(false);
    
    if (action === 'approve') alert('Email approved.');
    if (action === 'reject') alert('Email rejected — sent back to draft.');
    if (action === 'regenerate') alert('Regenerating message…');
    if (action === 'send') {
      alert('Email sent.');
      setOpenEmailId(null);
    }
  };

  return (
    <div className="view">
      <div className="view-header">
        <div>
          <h1>Emails</h1>
          <p>Every AI-generated message, from draft to sent.</p>
        </div>
      </div>
      <div className="filters">
        {['all', 'draft', 'pending', 'approved', 'sent', 'failed', 'responded'].map(s => (
          <button 
            key={s}
            className={`btn btn-sm ${filter === s ? 'btn-primary' : ''}`} 
            onClick={() => setFilter(s)}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      <div className="card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Lead</th>
              <th>Subject</th>
              <th>Product</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(e => (
              <tr key={e.id} className="clickable" onClick={() => setOpenEmailId(e.id)}>
                <td className="co">{e.lead_name}</td>
                <td>{e.subject}</td>
                <td>{e.product_name}</td>
                <td><span className={`pill pill-${e.status}`}>{e.status}</span></td>
                <td>
                  <button className="btn btn-sm" onClick={(ev) => {
                    ev.stopPropagation();
                    setOpenEmailId(e.id);
                  }}>
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openEmail && (
        <div className="panel-overlay" onClick={() => setOpenEmailId(null)}>
          <div className="panel" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="panel-head">
              <div>
                <h3>{openEmail.subject}</h3>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', marginTop: '3px' }}>
                  To: {openEmail.lead_name} · {openEmail.product_name}
                </div>
              </div>
              <button className="close-x" onClick={() => setOpenEmailId(null)}>✕</button>
            </div>
            <div className="panel-body">
              <div className="field">
                <label>Subject</label>
                <input type="text" defaultValue={openEmail.subject} disabled={isPending} />
              </div>
              <div className="field">
                <label>Message</label>
                <textarea rows={12} defaultValue={openEmail.body} disabled={isPending}></textarea>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>
                Status: <span className={`pill pill-${openEmail.status}`} style={{ marginLeft: '4px' }}>{openEmail.status}</span>
              </div>
            </div>
            <div className="panel-foot">
              {openEmail.status === 'draft' || openEmail.status === 'pending' ? (
                <>
                  <button className="btn btn-danger" onClick={() => handleAction(openEmail.id, 'reject')} disabled={isPending}>Reject</button>
                  <button className="btn" onClick={() => handleAction(openEmail.id, 'regenerate')} disabled={isPending}>Regenerate</button>
                  <button className="btn btn-primary" onClick={() => handleAction(openEmail.id, 'approve')} disabled={isPending}>Approve</button>
                </>
              ) : openEmail.status === 'approved' ? (
                <>
                  <button className="btn btn-ghost" onClick={() => setOpenEmailId(null)} disabled={isPending}>Close</button>
                  <button className="btn btn-primary" onClick={() => handleAction(openEmail.id, 'send')} disabled={isPending}>Send now</button>
                </>
              ) : (
                <button className="btn btn-ghost" onClick={() => setOpenEmailId(null)} disabled={isPending}>Close</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
