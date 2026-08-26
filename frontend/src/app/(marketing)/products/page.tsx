import { apiFetch } from "@/lib/api";
import type { Product } from "@/types";

export default async function ProductsPage() {
  // const products = await apiFetch<Product[]>("/products");
  return (
    <section className="px-8 py-16">
      <h1 className="text-3xl font-semibold">Our products</h1>
      <p className="mt-2 text-gray-600">TODO: render product cards, fetch from /api/products</p>
    </section>
  );
}
