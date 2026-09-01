"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function toggleContentStatus(contentId: string, currentStatus: string) {
  const newStatus = currentStatus === 'published' ? 'draft' : 'published';
  await query('UPDATE content SET status = $1 WHERE id = $2', [newStatus, contentId]);
  revalidatePath('/admin/content');
  revalidatePath('/news');
  revalidatePath('/');
}

export async function deleteContentRecord(contentId: string) {
  await query('DELETE FROM content WHERE id = $1', [contentId]);
  revalidatePath('/admin/content');
  revalidatePath('/news');
  revalidatePath('/');
}
