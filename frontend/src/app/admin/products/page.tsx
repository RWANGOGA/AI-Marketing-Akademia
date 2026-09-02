<<<<<<< HEAD
import { apiFetch } from "@/lib/api";
import type { Product } from "@/types";

export default async function AdminProductsPage() {
  // const products = await apiFetch<Product[]>("/products");
  return (
    <section>
      <h1 className="text-2xl font-semibold">Products</h1>
      <p className="mt-2 text-slate-600">TODO: product list with publish/unpublish toggle</p>
    </section>
  );
=======
import { query } from "@/lib/db";
import ProductsClient from "./ProductsClient";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const productsRes = await query("SELECT * FROM products ORDER BY created_at ASC");
  
  return <ProductsClient initialProducts={productsRes.rows} />;
>>>>>>> frontend-setup
}
