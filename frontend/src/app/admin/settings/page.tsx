"use client";

export default function SettingsPage() {
  return (
    <div className="view">
      <div className="view-header">
        <div>
          <h1>Settings</h1>
          <p>General configuration for the marketing process.</p>
        </div>
      </div>
      <div className="card pad" style={{ maxWidth: '480px' }}>
        <div className="field">
          <label>Follow-up period</label>
          <select defaultValue="5 days with no response">
            <option>3 days with no response</option>
            <option>5 days with no response</option>
            <option>7 days with no response</option>
            <option>10 days with no response</option>
          </select>
        </div>
        <div className="field">
          <label>Default sender name on outreach emails</label>
          <input type="text" defaultValue="AI Pod Team" />
        </div>
        <div className="field">
          <label>Notify me when</label>
          <select defaultValue="An automation fails">
            <option>A pitch is generated and needs approval</option>
            <option>An automation fails</option>
            <option>A lead responds</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => alert('Settings saved.')}>Save settings</button>
      </div>
    </div>
  );
}
