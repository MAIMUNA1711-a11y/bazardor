import { Product } from "@/lib/types";
import { ProductGrid } from "./ProductGrid";

export default function MoversSection({
  title,
  direction,
  products,
}: {
  title: string;
  direction: "up" | "down";
  products: Product[];
}) {
  if (products.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <span className={`text-xs ${direction === "up" ? "text-error" : "text-success"}`}>
          {direction === "up" ? "▲" : "▼"}
        </span>
        {title}
      </h2>
      <ProductGrid products={products} />
    </section>
  );
}
