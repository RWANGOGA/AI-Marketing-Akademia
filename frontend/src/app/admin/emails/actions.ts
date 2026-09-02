"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateEmailStatus(emailId: string, action: string) {
  let newStatus = 'draft';
  if (action === 'approve') newStatus = 'approved';
  if (action === 'send') newStatus = 'sent';

  if (action === 'regenerate') {
    // We would call an AI API here, for now just keep status
    // Not actually changing DB status on regenerate mock
    return;
  }

  await query('UPDATE emails SET status = $1 WHERE id = $2', [newStatus, emailId]);
  revalidatePath('/admin/emails');
}
