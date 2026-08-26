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
}
