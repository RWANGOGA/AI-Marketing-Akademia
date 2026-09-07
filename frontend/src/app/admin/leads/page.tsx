import { apiFetch } from "@/lib/api";
import type { Lead, LeadStatus } from "@/types";
import Link from "next/link";

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  responded: "bg-green-100 text-green-800",
  "needs-followup": "bg-orange-100 text-orange-800",
  meeting: "bg-purple-100 text-purple-800",
  customer: "bg-emerald-100 text-emerald-800",
  lost: "bg-red-100 text-red-800",
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

export default async function LeadsPage() {
  let leads: Lead[] = [];
  try {
    leads = await apiFetch<Lead[]>("/leads");
  } catch {
    // empty on error
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>

      {leads.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-500">No leads found. Add your first lead to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Company</th>
                <th className="px-4 py-3 text-left font-medium">Contact</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{lead.company}</td>
                  <td className="px-4 py-3 text-slate-700">{lead.contact}</td>
                  <td className="px-4 py-3 text-slate-700">{lead.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusStyles[lead.status]}`}>
                      {statusLabels[lead.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{lead.product_id}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
