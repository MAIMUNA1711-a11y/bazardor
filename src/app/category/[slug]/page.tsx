import { notFound } from "next/navigation";
import CategoryView from "@/components/CategoryView";
import EmptyState from "@/components/EmptyState";
import { getCategories, getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import Emoji from "@/components/Emoji";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug),
  ]);
  const category = categories.find((c) => c.slug === slug);

  // Unknown category and nothing found -> 404 page
  if (!category && products.length === 0) notFound();

  if (products.length === 0) {
    return (
      <EmptyState
        title="এই বিভাগে কোনো পণ্য নেই"
        message="অন্য কোনো বিভাগ দেখুন অথবা হোম পেজে ফিরে যান।"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <Emoji value={category?.emoji ?? "🛒"} size={40} />
        <div>
          <h1 className="text-2xl font-bold leading-tight">{category?.name ?? slug}</h1>
          <p className="text-xs text-base-content/70">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
      <CategoryView products={products} />
    </div>
  );
}
