import { apiFetch } from "@/lib/api";
import type { Product } from "@/types";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // const product = await apiFetch<Product>(`/products/${slug}`);
  return (
    <section className="px-8 py-16">
      <h1 className="text-3xl font-semibold">Product: {slug}</h1>
      <p className="mt-2 text-gray-600">TODO: port product detail hero + capabilities grid</p>
    </section>
  );
}
