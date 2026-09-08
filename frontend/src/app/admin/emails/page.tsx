import { apiFetch } from "@/lib/api";
import type { Email } from "@/types";

const statusStyles: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  sent: "bg-blue-100 text-blue-800",
  failed: "bg-red-100 text-red-800",
  responded: "bg-emerald-100 text-emerald-800",
};

export default async function EmailsPage() {
  let emails: Email[] = [];
  try {
    emails = await apiFetch<Email[]>("/emails");
  } catch {
    // empty on error
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Emails</h1>

      {emails.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-500">No emails found. Create your first email to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Lead</th>
                <th className="px-4 py-3 text-left font-medium">Subject</th>
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {emails.map((email) => (
                <tr key={email.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{email.lead_name}</td>
                  <td className="px-4 py-3 text-slate-700">{email.subject}</td>
                  <td className="px-4 py-3 text-slate-700">{email.product_name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusStyles[email.status] || "bg-gray-100 text-gray-800"}`}>
                      {email.status}
                    </span>
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
