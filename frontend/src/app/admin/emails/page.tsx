import { query } from "@/lib/db";
import EmailsClient from "./EmailsClient";

export const dynamic = 'force-dynamic';

export default async function EmailsPage() {
  const emailsRes = await query("SELECT * FROM emails ORDER BY created_at DESC");
  
  return <EmailsClient initialEmails={emailsRes.rows} />;
}
