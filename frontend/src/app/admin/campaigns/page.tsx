import { apiFetch } from "@/lib/api";
import type { Campaign } from "@/types";

export default async function CampaignsPage() {
  // const campaigns = await apiFetch<Campaign[]>("/campaigns");
  return (
    <section>
      <h1 className="text-2xl font-semibold">Campaigns</h1>
      <p className="mt-2 text-slate-600">TODO: campaign funnel table, fetch from /api/campaigns</p>
    </section>
  );
}
