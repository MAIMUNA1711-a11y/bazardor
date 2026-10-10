"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-4 sm:p-4">
      <div className="max-w-xl space-y-4 pb-4 sm:pb-6">
        <span className="inline-block min-h-7 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {date || "\u00a0"}
        </span>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-[15px] leading-relaxed text-base-content/70">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
          সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        {/* Anchor link: scrolls to the section on the same page */}
        <a href="#সব-পণ্য" className="btn btn-primary btn-md shadow-green mt-2">
          সব পণ্য দেখুন
        </a>
      </div>

      <Image
        src="/bazar-hero.png"
        alt="বাজারের ঝুড়ি"
        width={315}
        height={263}
        priority
        className="pointer-events-none mx-auto mt-2 h-auto w-56 md:absolute md:bottom-0 md:right-24 md:mt-0 md:w-[290px]"
      />
    </section>
  );
}
