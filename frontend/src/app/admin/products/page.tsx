<<<<<<< HEAD
import { apiFetch } from "@/lib/api";
import type { Product } from "@/types";
import ProductToggle from "./product-toggle";

export default async function AdminProductsPage() {
  let products: Product[] = [];
  try {
    products = await apiFetch<Product[]>("/products");
  } catch {
    // empty on error
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Products</h1>

      {products.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-500">No products found. Add your first product to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Slug</th>
                <th className="px-4 py-3 text-left font-medium">Published</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{product.name}</td>
                  <td className="px-4 py-3 text-slate-700 font-mono text-xs">{product.slug}</td>
                  <td className="px-4 py-3">
                    <ProductToggle product={product} />
                  </td>
                  <td className="px-4 py-3 text-slate-700 max-w-xs truncate">
                    {product.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
