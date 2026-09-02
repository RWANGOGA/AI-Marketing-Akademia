"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function toggleProductPublished(productId: string, currentlyPublished: boolean) {
  const newStatus = !currentlyPublished;
  await query('UPDATE products SET published = $1 WHERE id = $2', [newStatus, productId]);
  revalidatePath('/admin/products');
  // the marketing site also uses the products table for published products
  revalidatePath('/products');
}
