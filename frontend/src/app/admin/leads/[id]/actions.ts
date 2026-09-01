"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(leadId: string, status: string) {
  await query('UPDATE leads SET status = $1 WHERE id = $2', [status, leadId]);
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath(`/admin/leads`);
  revalidatePath(`/admin/dashboard`);
}

export async function updateLeadProduct(leadId: string, productId: string) {
  await query('UPDATE leads SET product_id = $1 WHERE id = $2', [productId, leadId]);
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath(`/admin/leads`);
}

export async function approveLeadPitch(leadId: string) {
  await query('UPDATE leads SET pitch_approved = true WHERE id = $1', [leadId]);
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath(`/admin/dashboard`);
}
