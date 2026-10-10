"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { toBn } from "@/lib/bn";
import { Product, SortKey } from "@/lib/types";

export default function CategoryView({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  // price is already a real number (Bengali digits are converted in lib/api.ts)
  const sorted = useMemo(() => {
    if (sort === "default") return products;
    const copy = [...products];
    copy.sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
    return copy;
  }, [products, sort]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-3 rounded-2xl border border-base-300 bg-base-100 p-4">
        <label htmlFor="sort" className="text-sm text-base-content/70">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="select select-sm w-auto bg-base-100"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="text-[13px] text-base-content/70">
        মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <ProductGrid products={sorted} />
    </div>
  );
}
