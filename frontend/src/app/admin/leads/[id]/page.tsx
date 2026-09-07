import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import LeadDetailClient from "./LeadDetailClient";

export const dynamic = 'force-dynamic';

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const leadRes = await query("SELECT * FROM leads WHERE id = $1", [resolvedParams.id]);
  const lead = leadRes.rows[0];

  if (!lead) {
    notFound();
  }

  const productsRes = await query("SELECT id, name FROM products");

  return <LeadDetailClient lead={lead} products={productsRes.rows} />;
}
