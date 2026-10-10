import Hero from "@/components/Hero";
import MoversSection from "@/components/MoversSection";
import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <div className="space-y-10">
      <Hero />
      <MoversSection title="আজ দাম বেড়েছে" direction="up" products={risers} />
      <MoversSection title="আজ দাম কমেছে" direction="down" products={fallers} />

      <section id="সব-পণ্য" className="scroll-mt-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold">সব পণ্য</h2>
          <p className="mt-1 text-sm text-base-content/70">
            মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
