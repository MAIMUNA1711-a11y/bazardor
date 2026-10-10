import Link from "next/link";

export default function EmptyState({
  title = "কিছু পাওয়া যায়নি",
  message = "আপনি যা খুঁজছেন তা এখানে নেই।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-20 text-center">
      <div className="text-6xl">🛒</div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-2">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
