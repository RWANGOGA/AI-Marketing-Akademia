import { apiFetch } from "@/lib/api";
import type { Lead, LeadStatus } from "@/types";

const statusStyles: Record<LeadStatus, string> = {
  new: "pill-new",
  contacted: "pill-contacted",
  responded: "pill-responded",
  "needs-followup": "pill-followup",
  meeting: "pill-meeting",
  customer: "pill-customer",
  lost: "pill-lost",
};

const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  responded: "Responded",
  "needs-followup": "Needs Follow-up",
  meeting: "Meeting",
  customer: "Customer",
  lost: "Lost",
};

type DashboardSummary = {
  new: number;
  contacted: number;
  responded: number;
  needs_followup: number;
  meetings: number;
  customers: number;
  lost: number;
};

export default async function DashboardPage() {
  let summary: DashboardSummary = {
    new: 0,
    contacted: 0,
    responded: 0,
    needs_followup: 0,
    meetings: 0,
    customers: 0,
    lost: 0,
  };

  let leads: Lead[] = [];
  let campaigns: { status: string }[] = [];

  try {
    summary = await apiFetch<DashboardSummary>("/dashboard/summary");
  } catch {
    // use empty defaults on error
  }

  try {
    leads = await apiFetch<Lead[]>("/leads");
  } catch {
    // empty on error
  }

  try {
    campaigns = await apiFetch<{ status: string }[]>("/campaigns");
  } catch {
    // empty on error
  }

  const needsAttention = leads.filter(
    (l) => l.status === "needs-followup" || l.status === "new"
  );

  const runningAutomations = campaigns.filter((c) => c.status === "running").length;
  const pausedAutomations = campaigns.filter((c) => c.status === "paused").length;
  const completedAutomations = campaigns.filter((c) => c.status === "completed").length;

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
          <h1>Dashboard</h1>
          <p>Here&apos;s what&apos;s happening across marketing right now.</p>
        </div>
      </div>

      <div className="stat-row">
        {statCard("New leads", summary.new, "discovered this week")}
        {statCard("Contacted", summary.contacted, "have received outreach")}
        {statCard("Responded", summary.responded, "replied to a message")}
        {statCard("Meetings", summary.meetings, "booked or held")}
        {statCard("Customers won", summary.customers, "converted this quarter")}
      </div>

      <div className="card pipeline">
        {pipelineStage(String(summary.new), "Discovery")}
        {pipelineLine()}
        {pipelineStage(String(summary.contacted), "Analysis")}
        {pipelineLine()}
        {pipelineStage(String(summary.responded), "Pitch drafted")}
        {pipelineLine()}
        {pipelineStage(String(summary.meetings), "Approved")}
        {pipelineLine()}
        {pipelineStage(String(summary.customers), "Sent")}
        {pipelineLine()}
        {pipelineStage(String(summary.responded), "Responded")}
        {pipelineLine()}
        {pipelineStage(String(summary.meetings), "Meeting")}
        {pipelineLine()}
        {pipelineStage(String(summary.customers), "Customer")}
      </div>

      <div className="dash-grid">
        <div className="card pad">
          <div className="section-title">
            Needs your attention
          </div>
          {needsAttention.length > 0 ? needsAttention.map((l) => (
            <div className="attn-row" key={l.id}>
              <div className="attn-dot"></div>
              <div>
                <div className="co">{l.company}</div>
                <div className="why">
                  {l.status === "needs-followup"
                    ? `No response in ${l.last_contact || "awhile"} — ready for follow-up`
                    : "New lead — pitch not yet generated"}
                </div>
              </div>
            </div>
          )) : (
            <div className="empty">Nothing needs attention right now.</div>
          )}
        </div>

        <div className="card pad">
          <div className="section-title">Campaign status</div>
          <div className="automation-strip">
            <div className="auto-chip">
              <div className="name">Running</div>
              <span className="pill pill-running st">{runningAutomations}</span>
            </div>
            <div className="auto-chip">
              <div className="name">Paused</div>
              <span className="pill pill-stopped st">{pausedAutomations}</span>
            </div>
            <div className="auto-chip">
              <div className="name">Completed</div>
              <span className="pill pill-completed st">{completedAutomations}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
