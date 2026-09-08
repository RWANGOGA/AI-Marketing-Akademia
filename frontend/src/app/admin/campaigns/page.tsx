"use client";

import { useEffect, useState } from "react";
import { apiFetchWithAuth } from "@/lib/api";
import type { Campaign } from "@/types";
import { useAuth } from "../_components/auth-context";

const stages = [
  { key: "found", label: "Found", color: "bg-slate-400" },
  { key: "contacted", label: "Contacted", color: "bg-blue-400" },
  { key: "responded", label: "Responded", color: "bg-green-400" },
  { key: "interested", label: "Interested", color: "bg-yellow-400" },
  { key: "meetings", label: "Meetings", color: "bg-purple-400" },
  { key: "customers", label: "Customers", color: "bg-emerald-400" },
];

const statusStyles: Record<string, string> = {
  running: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  completed: "bg-slate-100 text-slate-800",
};

export default function CampaignsPage() {
  const { token } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    if (!token) return;
    apiFetchWithAuth<Campaign[]>("/campaigns", token)
      .then(setCampaigns)
      .catch(() => {});
  }, [token]);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Campaigns</h1>

      {campaigns.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-500">No campaigns found. Create your first campaign to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Found</th>
                <th className="px-4 py-3 text-left font-medium">Contacted</th>
                <th className="px-4 py-3 text-left font-medium">Responded</th>
                <th className="px-4 py-3 text-left font-medium">Interested</th>
                <th className="px-4 py-3 text-left font-medium">Meetings</th>
                <th className="px-4 py-3 text-left font-medium">Customers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((campaign) => {
                const maxVal = Math.max(
                  ...stages.map((s) => campaign[s.key as keyof Campaign] as number),
                  1
                );

                return (
                  <tr key={campaign.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{campaign.name}</td>
                    <td className="px-4 py-3 text-slate-700 font-mono text-xs">{campaign.product_id}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusStyles[campaign.status]}`}>
                        {campaign.status}
                      </span>
                    </td>
                    {stages.map((stage) => {
                      const value = campaign[stage.key as keyof Campaign] as number;
                      return (
                        <td key={stage.key} className="px-4 py-3">
                          <div className="flex flex-col gap-1 w-24">
                            <span className="font-semibold text-slate-900">{value}</span>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${stage.color} rounded-full`}
                                style={{ width: `${(value / maxVal) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
