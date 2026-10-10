import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[416px] pt-6 pb-10">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-[13px] text-base-content/70">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-5">{children}</div>
      <p className="mt-6 text-center">
        <Link href="/" className="text-[13px] text-base-content/70 hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
