import { apiFetch } from "@/lib/api";
import Link from "next/link";
import type { Product } from "@/types";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await apiFetch<Product>(`/products/${slug}`);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-3 text-gray-600">
          The product you are looking for does not exist.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-2 text-sm font-semibold text-white"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/products"
        className="text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        ← Back to products
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="mt-4 text-lg text-gray-600">{product.description}</p>
      </div>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            The problem
          </h2>
          <p className="mt-2 text-gray-700">{product.problem}</p>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Who it&apos;s for
          </h2>
          <p className="mt-2 text-gray-700">{product.target}</p>
        </section>

        {product.features.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Features
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {product.benefits.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Benefits
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
              {product.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Interested in this product?
          </h2>
          <p className="mt-2 text-gray-600">
            Let&apos;s talk about how {product.name} can help your business.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Contact us about this product
          </Link>
        </section>
      </div>
    </div>
  );
}
