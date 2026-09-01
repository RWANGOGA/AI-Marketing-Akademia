import { query } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const leadsRes = await query('SELECT * FROM leads');
  const automationsRes = await query('SELECT * FROM automations LIMIT 4');
  
  const LEADS = leadsRes.rows;
  const AUTOMATIONS = automationsRes.rows;

  const newLeads = LEADS.filter(l => l.status === 'new').length;
  const contacted = LEADS.filter(l => ['contacted', 'responded', 'meeting', 'customer', 'needs-followup'].includes(l.status)).length;
  const responded = LEADS.filter(l => ['responded', 'meeting', 'customer'].includes(l.status)).length;
  const meetings = LEADS.filter(l => ['meeting', 'customer'].includes(l.status)).length;
  const customers = LEADS.filter(l => l.status === 'customer').length;
  const needsAttention = LEADS.filter(l => l.status === 'needs-followup' || (l.status === 'new' && !l.pitch_approved));

  const statCard = (label: string, num: number, delta: string) => (
    <div className="card stat-card">
      <div className="label">{label}</div>
      <div className="num">{num}</div>
      <div className="delta">{delta}</div>
    </div>
  );

  const pipelineStage = (num: string, label: string) => (
    <div className="pl-stage">
      <div className="pl-node">{num}</div>
      <div className="pl-label">{label}</div>
    </div>
  );

  const pipelineLine = () => <div className="pl-line"></div>;

  return (
    <div className="view">
      <div className="view-header">
        <div>
          <h1>Good morning, Jamila.</h1>
          <p>Here's what's happening across marketing right now.</p>
        </div>
        <Link href="/admin/leads?discovery=1" className="btn btn-primary">+ Start lead discovery</Link>
      </div>

      <div className="stat-row">
        {statCard('New leads', newLeads, 'discovered this week')}
        {statCard('Contacted', contacted, 'have received outreach')}
        {statCard('Responded', responded, 'replied to a message')}
        {statCard('Meetings', meetings, 'booked or held')}
        {statCard('Customers won', customers, 'converted this quarter')}
      </div>

      <div className="card pipeline">
        {pipelineStage('38', 'Discovery')}
        {pipelineLine()}
        {pipelineStage('26', 'Analysis')}
        {pipelineLine()}
        {pipelineStage('19', 'Pitch drafted')}
        {pipelineLine()}
        {pipelineStage('15', 'Approved')}
        {pipelineLine()}
        {pipelineStage('15', 'Sent')}
        {pipelineLine()}
        {pipelineStage(String(responded), 'Responded')}
        {pipelineLine()}
        {pipelineStage(String(meetings), 'Meeting')}
        {pipelineLine()}
        {pipelineStage(String(customers), 'Customer')}
      </div>

      <div className="dash-grid">
        <div className="card pad">
          <div className="section-title">
            Needs your attention
            <Link href="/admin/leads" className="btn btn-ghost btn-sm">View all leads →</Link>
          </div>
          {needsAttention.length > 0 ? needsAttention.map(l => (
            <div className="attn-row" key={l.id}>
              <div className="attn-dot"></div>
              <div>
                <div className="co">{l.company}</div>
                <div className="why">
                  {l.status === 'needs-followup' ? `No response in ${l.last_contact} — ready for follow-up` : 'New lead — pitch not yet generated'}
                </div>
              </div>
              <Link href={`/admin/leads/${l.id}`} className="btn btn-sm go">Open</Link>
            </div>
          )) : <div className="empty">Nothing needs attention right now.</div>}
        </div>

        <div className="card pad">
          <div className="section-title">Recent activity</div>
          <div className="feed-row"><div className="t mono">08:12</div><div>Email to <b>Tembo Retail Group</b> got a reply.</div></div>
          <div className="feed-row"><div className="t mono">07:40</div><div>Lead Discovery found <b>6 new companies</b> for Logistics — East Africa.</div></div>
          <div className="feed-row"><div className="t mono">07:00</div><div>Follow-up check flagged <b>3 leads</b> with no response.</div></div>
          <div className="feed-row"><div className="t mono">Yest</div><div>Pitch approved and sent to <b>Metro Builders Uganda</b>.</div></div>
          <div className="feed-row"><div className="t mono">Yest</div><div>Lead Discovery — Retail KE <b>failed</b> (source site blocked requests).</div></div>
        </div>
      </div>

      <div className="section-title" style={{ marginTop: '20px' }}>Automation status</div>
      <div className="automation-strip">
        {AUTOMATIONS.slice(0, 4).map(a => (
          <div className="auto-chip" key={a.id}>
            <div className="name">{a.name}</div>
            <span className={`pill pill-${a.status} st`}>{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
