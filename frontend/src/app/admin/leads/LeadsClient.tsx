"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { statusLabel, statusPillClass } from "../_lib/mockData";

export default function LeadsClient({ initialLeads, products }: { initialLeads: any[], products: any[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [product, setProduct] = useState("all");
  const [discoveryOpen, setDiscoveryOpen] = useState(false);

  const industries = Array.from(new Set(initialLeads.map(l => l.industry).filter(Boolean)));

  const rows = initialLeads.filter(l => {
    if (status !== 'all' && l.status !== status) return false;
    if (industry !== 'all' && l.industry !== industry) return false;
    if (product !== 'all' && l.product_id !== product) return false;
    if (q && !l.company.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const getProductName = (id: string) => {
    const p = products.find(prod => prod.id === id);
    return p ? p.name : '—';
  };

  return (
    <div className="view">
      <div className="view-header">
        <div>
          <h1>Leads</h1>
          <p>{initialLeads.length} companies discovered so far · {rows.length} shown</p>
        </div>
        <button className="btn btn-primary" onClick={() => setDiscoveryOpen(true)}>+ Start lead discovery</button>
      </div>

      <div className="filters">
        <input 
          type="text" 
          placeholder="Search company…" 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="responded">Responded</option>
          <option value="needs-followup">Needs follow-up</option>
          <option value="meeting">Meeting</option>
          <option value="customer">Customer</option>
          <option value="lost">Not interested</option>
        </select>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="all">All industries</option>
          {industries.map(i => <option key={i as string} value={i as string}>{i as string}</option>)}
        </select>
        <select value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="all">All products</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <div className="spacer"></div>
      </div>

      <div className="card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Industry</th>
              <th>Location</th>
              <th>Matched product</th>
              <th>Status</th>
              <th>Last contact</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? rows.map(l => (
              <tr 
                key={l.id} 
                className="clickable" 
                onClick={() => router.push(`/admin/leads/${l.id}`)}
              >
                <td className="co">
                  {l.company}
                  <div className="sub">{l.website}</div>
                </td>
                <td>{l.industry}</td>
                <td>{l.location}</td>
                <td>{getProductName(l.product_id)}</td>
                <td><span className={`pill ${statusPillClass(l.status)}`}>{statusLabel(l.status)}</span></td>
                <td className="mono" style={{ fontSize: '11.5px', color: 'var(--ink-muted)' }}>{l.last_contact}</td>
              </tr>
            )) : <tr><td colSpan={6} className="empty">No leads match these filters.</td></tr>}
          </tbody>
        </table>
      </div>

      {discoveryOpen && (
        <div className="panel-overlay" onClick={() => setDiscoveryOpen(false)}>
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-head">
              <h3>Start lead discovery</h3>
              <button className="close-x" onClick={() => setDiscoveryOpen(false)}>✕</button>
            </div>
            <div className="panel-body">
              <p style={{ margin: '0 0 16px 0', color: 'var(--ink-muted)', fontSize: '12.8px' }}>
                Tell the system what kind of companies to look for. It will search, collect public business information, and add the results as new leads.
              </p>
              <div className="field-row">
                <div className="field">
                  <label>Company type</label>
                  <input type="text" placeholder="e.g. logistics companies" defaultValue="e.g. dental clinics" />
                </div>
                <div className="field">
                  <label>Location</label>
                  <input type="text" placeholder="e.g. Nairobi, Kenya" defaultValue="" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Industry</label>
                  <input type="text" placeholder="e.g. Healthcare" defaultValue="" />
                </div>
                <div className="field">
                  <label>AI Pod product to promote</label>
                  <select>
                    {products.map(p => <option key={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="panel-foot">
              <button className="btn btn-ghost" onClick={() => setDiscoveryOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                alert("Discovery started (mock)");
                setDiscoveryOpen(false);
              }}>Start search</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
