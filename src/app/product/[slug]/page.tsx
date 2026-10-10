import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { auth } from "@/lib/auth";
import { getCategories, getProduct } from "@/lib/api";
import { formatAvg, formatPrice, toBn } from "@/lib/bn";
import Emoji from "@/components/Emoji";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Protected route: only logged-in users can see this page
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}&reason=protected`);
  }

  const [product, categories] = await Promise.all([getProduct(slug), getCategories()]);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.category);
  const unitShort = product.unit.replace("প্রতি ", "");

  // per-market average = (min + max) / 2, table sorted by average (low -> high)
  const rows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const minPrice = rows.length ? Math.min(...rows.map((r) => r.min)) : product.price;
  const maxPrice = rows.length ? Math.max(...rows.map((r) => r.max)) : product.price;
  const avgPrice = rows.length
    ? Math.round(rows.reduce((s, r) => s + r.avg, 0) / rows.length)
    : product.price;

  const stats = [
    { label: "সর্বনিম্ন দাম", value: minPrice, note: "সবচেয়ে কম দামের বাজার", color: "text-success" },
    { label: "সর্বাধিক দাম", value: maxPrice, note: "সবচেয়ে বেশি দামের বাজার", color: "text-error" },
    { label: "গড় দাম", value: avgPrice, note: `প্রতি ${unitShort}-এর হিসাবে`, color: "text-success" },
  ];

  const diffText = `${toBn(Math.abs(product.diff))} টাকা`;

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 py-1 text-xs">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span className="text-base-content/50">›</span>
        {category && (
          <>
            <Link href={`/category/${category.slug}`} className="hover:text-primary">
              {category.name}
            </Link>
            <span className="text-base-content/50">›</span>
          </>
        )}
        <span>{product.name}</span>
      </nav>

      {/* Top summary card */}
      <section className="flex flex-col gap-5 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-base-200">
            <Emoji value={product.emoji} size={36} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
            <p className="text-sm text-base-content/70">
              {product.unit}
              {product.categoryName ? ` · ${product.categoryName}` : ""}
            </p>
            <p className="text-[13px]">
              {product.change > 0 ? (
                <>গতকালের তুলনায় আজ দাম <b>বেড়েছে</b> · {diffText}</>
              ) : product.change < 0 ? (
                <>গতকালের তুলনায় আজ দাম <b>কমেছে</b> · {diffText}</>
              ) : (
                <>গতকালের তুলনায় দামে <b>কোনো পরিবর্তন নেই</b></>
              )}
            </p>
          </div>
        </div>

        <div className="flex min-w-36 flex-col items-center gap-0.5 rounded-2xl bg-base-200 px-5 py-4 text-center">
          <p className="text-xs text-base-content/70">আজকের দাম</p>
          <p className="text-3xl font-extrabold leading-none">{formatPrice(product.price)}</p>
          <p className="text-xs text-base-content/70">টাকা / {unitShort}</p>
          <div className="mt-1">
            <ChangeBadge change={product.change} />
          </div>
        </div>
      </section>

      {/* Price summary + market table */}
      <section className="space-y-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="text-base font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-base-300 p-4">
              <p className="text-[11px] text-base-content/70">{s.label}</p>
              <p className={`mt-1 text-xl font-bold ${s.color}`}>
                {formatPrice(s.value)} <span className="text-sm font-normal">টাকা</span>
              </p>
              <p className="mt-0.5 text-[11px] text-base-content/70">{s.note}</p>
            </div>
          ))}
        </div>

        <h2 className="pt-2 text-base font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {rows.length === 0 ? (
          <p className="rounded-xl border border-base-300 p-6 text-center text-sm text-base-content/70">
            এই পণ্যের বাজারভিত্তিক তথ্য এখনো পাওয়া যায়নি।
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="w-full min-w-[640px] text-[13px]">
              <thead>
                <tr className="text-base-content/70">
                  <th className="px-3 py-3 text-left font-normal">বাজার</th>
                  <th className="px-3 py-3 text-left font-normal">বিভাগ</th>
                  <th className="px-3 py-3 text-right font-normal">সর্বনিম্ন</th>
                  <th className="px-3 py-3 text-right font-normal">সর্বাধিক</th>
                  <th className="px-3 py-3 text-right font-normal">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={`${r.market}-${i}`}
                    className={`border-t border-base-content/25 ${i % 2 === 1 ? "bg-base-200/70" : ""}`}
                  >
                    <td className="px-3 py-3 font-medium">{r.market}</td>
                    <td className="px-3 py-3">{r.division}</td>
                    <td className="px-3 py-3 text-right">{formatPrice(r.min)} টাকা</td>
                    <td className="px-3 py-3 text-right">{formatPrice(r.max)} টাকা</td>
                    <td className="px-3 py-3 text-right font-bold">{formatAvg(r.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
