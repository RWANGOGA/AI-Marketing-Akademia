"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function toggleAutomationStatus(automationId: string, currentStatus: string) {
  const newStatus = currentStatus === 'running' ? 'stopped' : 'running';
  const lastRun = newStatus === 'running' ? 'just now' : undefined; // we'd normally set this dynamically, but for now we'll just update status.
  
  if (lastRun) {
    await query('UPDATE automations SET status = $1, last_run = $2 WHERE id = $3', [newStatus, lastRun, automationId]);
  } else {
    await query('UPDATE automations SET status = $1 WHERE id = $2', [newStatus, automationId]);
  }
  revalidatePath('/admin/automation');
}
