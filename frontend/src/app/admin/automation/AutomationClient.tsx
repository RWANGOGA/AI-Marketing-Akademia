"use client";

import { useState } from "react";
import { toggleAutomationStatus } from "./actions";

export default function AutomationClient({ initialAutomations }: { initialAutomations: any[] }) {
  const [isPending, setIsPending] = useState(false);

  const toggleAutomation = async (id: string, currentStatus: string) => {
    setIsPending(true);
    await toggleAutomationStatus(id, currentStatus);
    setIsPending(false);
  };

  return (
    <div className="view">
      <div className="view-header">
        <div>
          <h1>Automation</h1>
          <p>The repetitive marketing work n8n runs on your behalf.</p>
        </div>
      </div>
      <div className="card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Automation</th>
              <th>Status</th>
              <th>Last run</th>
              <th>Result</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {initialAutomations.map(a => (
              <tr key={a.id}>
                <td className="co">{a.name}</td>
                <td><span className={`pill pill-${a.status}`}>{a.status}</span></td>
                <td className="mono" style={{ fontSize: '11.5px', color: 'var(--ink-muted)' }}>{a.last_run}</td>
                <td style={{ color: 'var(--ink-muted)', fontSize: '12.5px' }}>{a.result}</td>
                <td>
                  {a.status === 'running' ? (
                    <button className="btn btn-sm" onClick={() => toggleAutomation(a.id, a.status)} disabled={isPending}>Stop</button>
                  ) : a.status === 'failed' ? (
                    <button className="btn btn-sm btn-danger" onClick={() => toggleAutomation(a.id, a.status)} disabled={isPending}>Retry</button>
                  ) : (
                    <button className="btn btn-sm" onClick={() => toggleAutomation(a.id, a.status)} disabled={isPending}>Start</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
