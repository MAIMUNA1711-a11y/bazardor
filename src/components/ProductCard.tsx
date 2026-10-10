import Link from "next/link";
import { formatPrice } from "@/lib/bn";
import { Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";
import Emoji from "@/components/Emoji";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:border-primary/40 hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-base-200">
          <Emoji value={product.emoji} size={26} />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-tight">{product.name}</h3>
          <p className="text-xs text-base-content/70">{product.unit}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs">আজকের দাম</p>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="text-lg font-bold">
            {formatPrice(product.price)}{" "}
            <span className="text-sm font-normal">টাকা</span>
          </p>
          <ChangeBadge change={product.change} />
        </div>
      </div>
    </Link>
  );
}
