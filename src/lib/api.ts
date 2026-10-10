import { toBn, toNumber } from "./bn";
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "./fallback-data";
import { Category, MarketPrice, Product } from "./types";

const BASES = [
  "https://openapi.programming-hero.com/api/bazardor", // official API
  "https://api.abcz.workers.dev/api/bazardor", // backup mirror
];

type Raw = Record<string, unknown>;

const str = (v: unknown, fallback = "") =>
  typeof v === "string" ? v : typeof v === "number" ? String(v) : fallback;

const UNIT_MAP: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  gram: "গ্রাম",
  hali: "হালি",
};

function banglaUnit(v: unknown): string {
  const u = str(v).trim().replace(/^প্রতি\s*/, "");
  if (!u) return "প্রতি কেজি";
  return `প্রতি ${UNIT_MAP[u.toLowerCase()] ?? u}`;
}

async function fetchJson(path: string): Promise<unknown | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 60 } });
      if (!res.ok) continue;
      return await res.json();
    } catch {
      // try the next base url
    }
  }
  return null;
}

function unwrapList(data: unknown, keys: string[]): Raw[] | null {
  if (Array.isArray(data)) return data as Raw[];
  if (data && typeof data === "object") {
    for (const k of keys) {
      const v = (data as Raw)[k];
      if (Array.isArray(v)) return v as Raw[];
    }
  }
  return null;
}

function normalizeCategory(raw: Raw): Category {
  const slug = str(raw.slug ?? raw.id);
  return {
    slug,
    name: str(raw.nameBn ?? raw.name, slug),
    emoji: str(raw.icon ?? raw.emoji, "🛒"),
  };
}

function normalizeMarket(raw: Raw): MarketPrice {
  const min = toNumber(raw.min ?? raw.price);
  const max = toNumber(raw.max ?? raw.price);
  return {
    market: str(raw.market ?? raw.name),
    division: str(raw.division ?? raw.area ?? raw.city),
    min,
    max,
  };
}

// API shape:
// { id, slug, nameBn, category, categoryNameBn, categoryIcon, unit, image,
//   today, yesterday, lastWeek, lastMonth,
//   change: { dir: "up" | "down" | "flat", pct }, markets: [{ market, division, min, max }] }
function normalizeProduct(raw: Raw, index: number): Product {
  const price = toNumber(raw.today ?? raw.price);
  const yesterday = toNumber(raw.yesterday, price);

  // change can be { dir, pct } or a plain number
  let change = 0;
  const c = raw.change;
  if (c && typeof c === "object") {
    const o = c as Raw;
    const pct = Math.abs(toNumber(o.pct ?? o.percent));
    const dir = str(o.dir ?? o.direction).toLowerCase();
    change = dir === "down" ? -pct : dir === "up" ? pct : 0;
  } else if (c !== undefined) {
    change = toNumber(c);
  } else if (yesterday > 0) {
    change = Math.round(((price - yesterday) / yesterday) * 1000) / 10;
  }

  const diff = Math.round((price - yesterday) * 100) / 100;
  const diffText = toBn(Math.abs(diff));
  const summary =
    change > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${diffText} টাকা`
      : change < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে · ${diffText} টাকা`
        : "গতকালের তুলনায় দামে কোনো পরিবর্তন নেই";

  const id = str(raw.id, String(index + 1));
  const markets = Array.isArray(raw.markets)
    ? (raw.markets as Raw[]).map(normalizeMarket).filter((m) => m.market)
    : [];

  return {
    id,
    slug: str(raw.slug, id),
    name: str(raw.nameBn ?? raw.name, "নামহীন পণ্য"),
    emoji: str(raw.image ?? raw.emoji ?? raw.categoryIcon, "🛒"),
    category: str(raw.category),
    categoryName: str(raw.categoryNameBn, str(raw.category)),
    unit: banglaUnit(raw.unit),
    price,
    yesterday,
    change,
    diff,
    summary,
    markets,
  };
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson("/categories");
  const list = unwrapList(data, ["categories", "data"]);
  if (!list || list.length === 0) return FALLBACK_CATEGORIES;
  return list.map(normalizeCategory);
}

export async function getProducts(category?: string): Promise<Product[]> {
  const path = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";
  const data = await fetchJson(path);
  const list = unwrapList(data, ["products", "data", "items"]);
  if (!list) {
    return category
      ? FALLBACK_PRODUCTS.filter((p) => p.category === category)
      : FALLBACK_PRODUCTS;
  }
  return list.map(normalizeProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  // the API's single-product endpoint uses the numeric id (/products/1)
  const all = await getProducts();
  const found = all.find((p) => p.slug === slug || p.id === slug);
  return found ?? null;
}
