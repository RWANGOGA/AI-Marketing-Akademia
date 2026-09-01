"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function toggleCampaignStatus(campaignId: string, currentStatus: string) {
  const newStatus = currentStatus === 'running' ? 'paused' : 'running';
  await query('UPDATE campaigns SET status = $1 WHERE id = $2', [newStatus, campaignId]);
  revalidatePath('/admin/campaigns');
}
