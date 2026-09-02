"use client";

import { useState } from "react";
import { toggleCampaignStatus } from "./actions";

export default function CampaignsClient({ initialCampaigns, products }: { initialCampaigns: any[], products: any[] }) {
  const [newCampaignOpen, setNewCampaignOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const getProductName = (id: string) => {
    const p = products.find(prod => prod.id === id);
    return p ? p.name : '—';
  };

  const handleToggle = async (id: string, currentStatus: string) => {
    setIsPending(true);
    await toggleCampaignStatus(id, currentStatus);
    setIsPending(false);
  };

  return (
    <div className="view">
      <div className="view-header">
        <div>
          <h1>Campaigns</h1>
          <p>{initialCampaigns.length} marketing efforts tracked</p>
        </div>
        <button className="btn btn-primary" onClick={() => setNewCampaignOpen(true)}>+ New campaign</button>
      </div>
      
      <div className="card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Product</th>
              <th>Found</th>
              <th>Contacted</th>
              <th>Responded</th>
              <th>Interested</th>
              <th>Meetings</th>
              <th>Customers</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {initialCampaigns.map(c => (
              <tr key={c.id}>
                <td className="co">
                  {c.name}
                  <div className="sub">{c.target}</div>
                </td>
                <td>{getProductName(c.product_id)}</td>
                <td>{c.found}</td>
                <td>{c.contacted}</td>
                <td>{c.responded}</td>
                <td>{c.interested}</td>
                <td>{c.meetings}</td>
                <td>{c.customers}</td>
                <td>
                  <span className={`pill pill-${c.status === 'running' ? 'running' : 'stopped'}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm" onClick={() => handleToggle(c.id, c.status)} disabled={isPending}>
                    {c.status === 'running' ? 'Pause' : 'Resume'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {newCampaignOpen && (
        <div className="panel-overlay" onClick={() => setNewCampaignOpen(false)}>
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-head">
              <h3>New campaign</h3>
              <button className="close-x" onClick={() => setNewCampaignOpen(false)}>✕</button>
            </div>
            <div className="panel-body">
              <div className="field">
                <label>Campaign name</label>
                <input type="text" placeholder="e.g. Retail — Kenya, Q4" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Target industry</label>
                  <input type="text" placeholder="e.g. Retail" />
                </div>
                <div className="field">
                  <label>Location</label>
                  <input type="text" placeholder="e.g. Kenya" />
                </div>
              </div>
              <div className="field">
                <label>AI Pod product</label>
                <select>
                  {products.map(p => <option key={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <div className="panel-foot">
              <button className="btn btn-ghost" onClick={() => setNewCampaignOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                alert('Campaign created.');
                setNewCampaignOpen(false);
              }}>Create campaign</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
