import { query } from "@/lib/db";
import AutomationClient from "./AutomationClient";

export const dynamic = 'force-dynamic';

export default async function AutomationPage() {
  const automationsRes = await query("SELECT * FROM automations ORDER BY created_at ASC");
  
  return <AutomationClient initialAutomations={automationsRes.rows} />;
}
