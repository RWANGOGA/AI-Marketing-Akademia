"use client";

import { useState } from "react";
import { toggleProductPublished } from "./actions";

export default function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [isPending, setIsPending] = useState(false);

  const togglePublished = async (id: string, currentlyPublished: boolean) => {
    setIsPending(true);
    await toggleProductPublished(id, currentlyPublished);
    setIsPending(false);
    alert('Product visibility toggled.');
  };

  return (
    <div className="view">
      <div className="view-header">
        <div>
          <h1>Products</h1>
          <p>What AI Pod sells — used on the website and by the AI to match and pitch leads.</p>
        </div>
        <button className="btn btn-primary" onClick={() => alert('Opens a blank product form.')}>+ Add product</button>
      </div>

      {initialProducts.map(p => (
        <div key={p.id} className="card pad" style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '16px' }}>{p.name}</h3>
                <span className={`pill pill-${p.published ? 'published' : 'unpublished'}`}>
                  {p.published ? 'Published' : 'Unpublished'}
                </span>
              </div>
              <p style={{ margin: '8px 0 0 0', fontSize: '12.8px', color: 'var(--ink-muted)', maxWidth: '620px' }}>
                {p.description}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-sm" onClick={() => alert('Opens the product edit form.')}>Edit</button>
              <button className="btn btn-sm" onClick={() => togglePublished(p.id, p.published)} disabled={isPending}>
                {p.published ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          </div>
          <div className="kv" style={{ gridTemplateColumns: '150px 1fr', marginTop: '14px' }}>
            <div className="k">Problem it solves</div><div>{p.problem}</div>
            <div className="k">Target customer</div><div>{p.target}</div>
            <div className="k">Features</div><div>{p.features?.join(' · ') || ''}</div>
            <div className="k">Benefits</div><div>{p.benefits?.join(' · ') || ''}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
