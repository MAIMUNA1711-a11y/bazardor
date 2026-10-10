import { formatPercent, formatPrice } from "@/lib/bn";
import { Product } from "@/lib/types";
import Emoji from "@/components/Emoji";

function Item({ p }: { p: Product }) {
  // up = red, down = green (as in the design)
  const color =
    p.change > 0 ? "text-error" : p.change < 0 ? "text-success" : "text-base-content/60";
  const arrow = p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—";
  return (
    <span className="flex items-center gap-2 whitespace-nowrap border-r border-base-300 px-5 py-2.5 text-sm">
      <Emoji value={p.emoji} size={16} />
      <span className="font-semibold">{p.name}</span>
      <span>
        {formatPrice(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}
      </span>
      <span className={`font-bold ${color}`}>
        <span className="text-[11px]">{arrow}</span> {formatPercent(p.change)}
      </span>
    </span>
  );
}

export default function Ticker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div className="ticker-wrap overflow-hidden border-b border-base-300 bg-base-100">
      <div className="ticker-track" aria-label="দামের তালিকা">
        {[...products, ...products].map((p, i) => (
          <Item key={`${p.id}-${i}`} p={p} />
        ))}
      </div>
    </div>
  );
}
