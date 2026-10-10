"use client";

import { useState } from "react";

// Shows Apple-style emoji images from /public/emoji (same look on every device).
// If an image is missing, it falls back to the normal text emoji.
export default function Emoji({ value, size = 24 }: { value: string; size?: number }) {
  const [failed, setFailed] = useState(false);

  const file = Array.from(value)
    .map((c) => c.codePointAt(0)!.toString(16))
    .filter((cp) => cp !== "fe0f")
    .join("-");

  if (failed || !file) {
    return (
      <span style={{ fontSize: size * 0.9, lineHeight: 1 }} aria-hidden="true">
        {value}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/emoji/${file}.png`}
      alt=""
      width={size}
      height={size}
      draggable={false}
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
      className="inline-block shrink-0 select-none"
    />
  );
}
