"use client";

import { useEffect, useState } from "react";
import { apiFetchWithAuth } from "@/lib/api";
import type { Lead } from "@/types";
import { useAuth } from "../_components/auth-context";

type DashboardSummary = {
  new: number;
  contacted: number;
  responded: number;
  needs_followup: number;
  meetings: number;
  customers: number;
  lost: number;
};

export default function DashboardPage() {
  const { token } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary>({
    new: 0,
    contacted: 0,
    responded: 0,
    needs_followup: 0,
    meetings: 0,
    customers: 0,
    lost: 0,
  });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<{ status: string }[]>([]);

  useEffect(() => {
    if (!token) return;

    apiFetchWithAuth<DashboardSummary>("/dashboard/summary", token)
      .then(setSummary)
      .catch(() => {});

    apiFetchWithAuth<Lead[]>("/leads", token)
      .then(setLeads)
      .catch(() => {});

    apiFetchWithAuth<{ status: string }[]>("/campaigns", token)
      .then(setCampaigns)
      .catch(() => {});
  }, [token]);

  const needsAttention = leads.filter(
    (l) => l.status === "needs-followup" || l.status === "new"
  );

  const runningAutomations = campaigns.filter((c) => c.status === "running").length;
  const pausedAutomations = campaigns.filter((c) => c.status === "paused").length;
  const completedAutomations = campaigns.filter((c) => c.status === "completed").length;

  const statCard = (label: string, num: number) => (
    <div className="card stat-card">
      <div className="label">{label}</div>
      <div className="num">{num}</div>
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
          <p>Marketing overview</p>
        </div>
      </div>

      <div className="stat-row">
        {statCard("New", summary.new)}
        {statCard("Contacted", summary.contacted)}
        {statCard("Responded", summary.responded)}
        {statCard("Meetings", summary.meetings)}
        {statCard("Customers", summary.customers)}
      </div>

      <div className="card pipeline">
        {pipelineStage(String(summary.new), "New")}
        {pipelineLine()}
        {pipelineStage(String(summary.contacted), "Contacted")}
        {pipelineLine()}
        {pipelineStage(String(summary.responded), "Responded")}
        {pipelineLine()}
        {pipelineStage(String(summary.meetings), "Meetings")}
        {pipelineLine()}
        {pipelineStage(String(summary.customers), "Customers")}
      </div>

      <div className="dash-grid">
        <div className="card pad">
          <div className="section-title">Needs your attention</div>
          {needsAttention.length > 0 ? needsAttention.map((l) => (
            <div className="attn-row" key={l.id}>
              <div className="attn-dot"></div>
              <div>
                <div className="co">{l.company}</div>
                <div className="why">{l.status === "needs-followup" ? "Needs follow-up" : "New lead"}</div>
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
