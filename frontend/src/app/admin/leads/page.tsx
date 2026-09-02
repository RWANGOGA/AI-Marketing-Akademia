<<<<<<< HEAD
import { apiFetch } from "@/lib/api";
import type { Lead } from "@/types";

export default async function LeadsPage() {
  // const leads = await apiFetch<Lead[]>("/leads");
  return (
    <section>
      <h1 className="text-2xl font-semibold">Leads</h1>
      <p className="mt-2 text-slate-600">TODO: leads table, fetch from /api/leads</p>
    </section>
  );
=======
import { query } from "@/lib/db";
import LeadsClient from "./LeadsClient";

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const leadsRes = await query("SELECT * FROM leads ORDER BY created_at DESC");
  const productsRes = await query("SELECT id, name FROM products");
  
  return <LeadsClient initialLeads={leadsRes.rows} products={productsRes.rows} />;
>>>>>>> frontend-setup
}
