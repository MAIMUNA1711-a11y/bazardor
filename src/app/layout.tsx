import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import { getCategories, getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজার দর।",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <html lang="bn" data-theme="bazardor">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Header categories={categories} />
        <Ticker products={products} />
        <main className="mx-auto w-full max-w-[1152px] flex-1 px-4 py-6">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
