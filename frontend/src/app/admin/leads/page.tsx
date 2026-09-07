import { query } from "@/lib/db";
import LeadsClient from "./LeadsClient";

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const leadsRes = await query("SELECT * FROM leads ORDER BY created_at DESC");
  const productsRes = await query("SELECT id, name FROM products");
  
  return <LeadsClient initialLeads={leadsRes.rows} products={productsRes.rows} />;
}
