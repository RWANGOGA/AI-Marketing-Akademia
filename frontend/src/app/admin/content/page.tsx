import { query } from "@/lib/db";
import ContentClient from "./ContentClient";

export const dynamic = 'force-dynamic';

export default async function ContentPage() {
  const contentRes = await query("SELECT * FROM content ORDER BY created_at DESC");
  
  return <ContentClient initialContent={contentRes.rows} />;
}
