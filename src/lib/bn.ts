const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** 1850 -> "১,৮৫০" */
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** "১২৫.৫০" -> "125.50" */
export function fromBn(value: string): string {
  return value.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

/** Any number / "১২৫ টাকা" / "▼ ২.৯%" -> number */
export function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const cleaned = fromBn(value).replace(/,/g, "");
    const match = cleaned.match(/-?\d+(\.\d+)?/);
    if (match) {
      const n = Number(match[0]);
      return value.includes("▼") ? -Math.abs(n) : n;
    }
  }
  return fallback;
}

export function formatPrice(n: number): string {
  return toBn(n.toLocaleString("en-US", { maximumFractionDigits: 2 }));
}

export function formatPercent(n: number): string {
  return toBn(Math.abs(n).toFixed(1)) + "%";
}

/** 63.5 -> "৬৩.৫০", 62 -> "৬২" */
export function formatAvg(n: number): string {
  return Number.isInteger(n) ? formatPrice(n) : toBn(n.toFixed(2));
}
