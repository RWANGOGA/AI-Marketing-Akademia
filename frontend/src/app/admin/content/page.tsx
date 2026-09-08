import { apiFetch } from "@/lib/api";
import type { Content } from "@/types";

const statusStyles: Record<string, string> = {
  published: "bg-green-100 text-green-800",
  draft: "bg-gray-100 text-gray-800",
  scheduled: "bg-blue-100 text-blue-800",
};

export default async function ContentPage() {
  let content: Content[] = [];
  try {
    content = await apiFetch<Content[]>("/content");
  } catch {
    // empty on error
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Content</h1>

      {content.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-500">No content found. Create your first content to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Tag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {content.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.title}</td>
                  <td className="px-4 py-3 text-slate-700">{item.type}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusStyles[item.status] || "bg-gray-100 text-gray-800"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{item.date}</td>
                  <td className="px-4 py-3 text-slate-700">{item.tag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
