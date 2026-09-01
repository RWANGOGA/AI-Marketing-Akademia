import { query } from "@/lib/db";
import CampaignsClient from "./CampaignsClient";

export const dynamic = 'force-dynamic';

export default async function CampaignsPage() {
  const campaignsRes = await query("SELECT * FROM campaigns ORDER BY created_at ASC");
  const productsRes = await query("SELECT id, name FROM products");
  
  return <CampaignsClient initialCampaigns={campaignsRes.rows} products={productsRes.rows} />;
}
