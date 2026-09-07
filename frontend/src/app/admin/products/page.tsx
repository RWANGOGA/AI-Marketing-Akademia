import { query } from "@/lib/db";
import ProductsClient from "./ProductsClient";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const productsRes = await query("SELECT * FROM products ORDER BY created_at ASC");
  
  return <ProductsClient initialProducts={productsRes.rows} />;
}
