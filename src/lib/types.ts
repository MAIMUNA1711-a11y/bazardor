export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  category: string; // category slug, e.g. "chal"
  categoryName: string;
  unit: string; // e.g. "প্রতি কেজি"
  price: number; // today's price
  yesterday: number;
  change: number; // percent, + = up, - = down, 0 = flat
  diff: number; // today - yesterday (taka)
  summary: string;
  markets: MarketPrice[];
}

export type SortKey = "default" | "asc" | "desc";
