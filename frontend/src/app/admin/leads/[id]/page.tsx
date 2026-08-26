import { apiFetch } from "@/lib/api";
import type { Lead } from "@/types";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // const lead = await apiFetch<Lead>(`/leads/${id}`);
  return (
    <section>
      <h1 className="text-2xl font-semibold">Lead: {id}</h1>
      <p className="mt-2 text-slate-600">TODO: discovery notes, reasoning, pitch draft</p>
    </section>
  );
}
