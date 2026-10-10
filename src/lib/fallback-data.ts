import { Category, Product } from "./types";

// Used only when the live API does not respond, so the site never looks empty.
export const FALLBACK_CATEGORIES: Category[] = [
  { slug: "chal", name: "চাল", emoji: "🍚" },
  { slug: "dal", name: "ডাল", emoji: "🫘" },
  { slug: "tel", name: "তেল", emoji: "🛢️" },
  { slug: "sobji", name: "সবজি", emoji: "🥬" },
  { slug: "mach", name: "মাছ", emoji: "🐟" },
  { slug: "mangsho", name: "মাংস", emoji: "🥩" },
  { slug: "dim-dui", name: "ডিম-দুধ", emoji: "🥛" },
  { slug: "mosla", name: "মসলা", emoji: "🌶️" },
];

const MARKETS: [string, string][] = [
  ["কারওয়ান বাজার", "ঢাকা"],
  ["গ্রীন মার্কেট, মিরপুর", "ঢাকা"],
  ["চৌদগ্রাম বাজার", "চট্টগ্রাম"],
  ["সদর বাজার", "রাজশাহী"],
  ["বাজারহাট", "খুলনা"],
  ["আমবাজার", "সিলেট"],
];
const FACTORS = [1, 0.97, 1.02, 0.95, 1.04, 0.99];

// slug, name, emoji, category, unit, price, change%
type Row = [string, string, string, string, string, number, number];
const ROWS: Row[] = [
  ["sworno-machhi-chal", "স্বর্ণমাছি চাল", "🍚", "chal", "প্রতি কেজি", 66, 2.1],
  ["miniket-chal", "মিনিকেট চাল", "🍚", "chal", "প্রতি কেজি", 74, -2.9],
  ["nazir-chal", "নাজির চাল", "🍚", "chal", "প্রতি কেজি", 78, 0],
  ["batam-chal", "বাটাম সাইজ চাল", "🍚", "chal", "প্রতি কেজি", 60, 1.2],
  ["masur-dal", "মসুর ডাল", "🫘", "dal", "প্রতি কেজি", 125, 3.1],
  ["mug-dal", "মুগ ডাল", "🫘", "dal", "প্রতি কেজি", 142, -1.2],
  ["chola", "ছোলা", "🫘", "dal", "প্রতি কেজি", 99, 2.6],
  ["amon-dal", "আমন ডাল (খোসাসিলা)", "🫘", "dal", "প্রতি কেজি", 120, 0],
  ["soriser-tel", "ঘানি ভাঙা সরিষার তেল", "🛢️", "tel", "প্রতি লিটার", 285, 4.4],
  ["soyabin-tel", "সয়াবিন তেল", "🫙", "tel", "প্রতি লিটার", 168, -2.4],
  ["palm-tel", "পাম তেল", "🛢️", "tel", "প্রতি লিটার", 145, -1.3],
  ["alu", "আলু", "🥔", "sobji", "প্রতি কেজি", 36, -3.1],
  ["peyaj", "পেঁয়াজ", "🧅", "sobji", "প্রতি কেজি", 74, 12.5],
  ["begun", "বেগুন", "🍆", "sobji", "প্রতি কেজি", 59, 4.5],
  ["dheros", "ঢেঁড়স", "🥬", "sobji", "প্রতি কেজি", 54, -6.2],
  ["roshun", "রসুন", "🧄", "sobji", "প্রতি কেজি", 215, 7.4],
  ["ada", "আদা", "🫚", "sobji", "প্রতি কেজি", 245, 3.9],
  ["kacha-morich", "কাঁচামরিচ", "🌶️", "sobji", "প্রতি কেজি", 156, -9.0],
  ["ilish", "ইলিশ মাছ", "🐟", "mach", "প্রতি কেজি", 1850, 2.1],
  ["rui", "রুই মাছ", "🐟", "mach", "প্রতি কেজি", 330, -2.9],
  ["katla", "কাতলা মাছ", "🐟", "mach", "প্রতি কেজি", 345, 1.3],
  ["telapia", "তেলাপিয়া", "🐠", "mach", "প্রতি কেজি", 190, -4.8],
  ["chingri", "চিংড়ি মাছ (খোলা)", "🦐", "mach", "প্রতি কেজি", 790, 3.6],
  ["goru", "গরুর মাংস", "🥩", "mangsho", "প্রতি কেজি", 790, 0],
  ["khashi", "খাসির মাংস", "🍖", "mangsho", "প্রতি কেজি", 1290, 2.6],
  ["murgi", "মুরগির মাংস", "🍗", "mangsho", "প্রতি কেজি", 265, -3.9],
  ["hash", "হাঁসের মাংস", "🦆", "mangsho", "প্রতি কেজি", 225, 0],
  ["dim", "ডিম", "🥚", "dim-dui", "প্রতি ডজন", 135, -0.5],
  ["dudh", "দুধ", "🥛", "dim-dui", "প্রতি লিটার", 102, 3.4],
  ["doi", "দই", "🥣", "dim-dui", "প্রতি কেজি", 168, 0],
  ["makhon", "মাখন (১০০ গ্রাম)", "🧈", "dim-dui", "প্রতি পিস", 92, -7.4],
  ["morich-gura", "মরিচ গুঁড়া", "🌶️", "mosla", "প্রতি কেজি", 490, 4.8],
  ["dhonepata-gura", "ধনেপাতা গুঁড়া", "🍃", "mosla", "প্রতি কেজি", 215, -2.0],
];

export const FALLBACK_PRODUCTS: Product[] = ROWS.map(
  ([slug, name, emoji, category, unit, price, change], i) => {
    const cat = FALLBACK_CATEGORIES.find((c) => c.slug === category)!;
    return {
      id: String(i + 1),
      slug,
      name,
      emoji,
      category,
      categoryName: cat.name,
      unit,
      price,
      yesterday: price - Math.round((price * change) / 100),
      change,
      diff: Math.round((price * change) / 100),
      summary:
        change > 0
          ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${Math.round((price * change) / 100)} টাকা`
          : change < 0
            ? `গতকালের তুলনায় আজ দাম কমেছে · ${Math.abs(Math.round((price * change) / 100))} টাকা`
            : "গতকালের তুলনায় দামে কোনো পরিবর্তন নেই",
      markets: MARKETS.map(([market, division], m) => {
        const base = price * FACTORS[(m + i) % FACTORS.length];
        return {
          market,
          division,
          min: Math.round(base * 0.98),
          max: Math.round(base * 1.08),
        };
      }),
    };
  },
);
