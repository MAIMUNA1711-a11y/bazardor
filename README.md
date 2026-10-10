# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে দেখার একটি ওয়েব অ্যাপ। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, দাম বাড়া/কমার হার এবং বাজারভিত্তিক তুলনা দেখা যায়।

## Technologies
- Next.js (App Router) + TypeScript
- Tailwind CSS + DaisyUI
- BetterAuth (Email/Password, Google, GitHub) + MongoDB
- react-hot-toast

## Features
1. লাইভ প্রাইস টিকার (marquee) সহ নেভবার ও ক্যাটাগরি নেভিগেশন
2. আজ কোন পণ্যের দাম বেড়েছে ▲ / কমেছে ▼ — টপ ৬টি করে
3. রেসপন্সিভ প্রোডাক্ট গ্রিড (বাংলা সংখ্যায় দাম ও পরিবর্তনের ব্যাজ)
4. ক্যাটাগরি পেজে দাম অনুযায়ী সাজানো (সংখ্যা ধরে sort) ও skeleton loading
5. প্রোটেক্টেড প্রোডাক্ট ডিটেইল পেজ: সর্বনিম্ন/গড়/সর্বাধিক দাম ও বাজারভিত্তিক তালিকা
6. BetterAuth দিয়ে সাইন ইন/সাইন আপ, সোশ্যাল লগইন, প্রোফাইল ও নাম আপডেট

## Run locally
```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```
