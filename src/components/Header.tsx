"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Category } from "@/lib/types";
import Emoji from "@/components/Emoji";

export default function Header({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Date is built in the browser so server/client text never mismatches.
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

  async function handleSignOut() {
    setMenuOpen(false);
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] ?? "";

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex h-[68px] max-w-[1152px] items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary">
            <Image
              src="/logo-icon.png"
              alt=""
              width={20}
              height={20}
              className="brightness-0 invert"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block min-h-4 text-[11px] text-base-content/70">{date}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-9 w-24 rounded-lg" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 hover:bg-base-200"
                aria-label="ইউজার মেনু"
              >
                <Avatar name={user.name} image={user.image} size={36} />
                <span className="text-sm font-medium">{firstName}</span>
                <span className="text-[8px] text-base-content/50">▼</span>
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 z-40 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-lg">
                    <p className="truncate text-[15px] font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-base-content/70">{user.email}</p>
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="mt-4 block text-sm hover:text-primary"
                    >
                      👤 আমার প্রোফাইল
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="mt-3 block text-sm text-error hover:underline"
                    >
                      ↩ সাইন আউট
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm px-3 font-semibold">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm shadow-green px-4">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-300">
        <div className="no-scrollbar mx-auto flex h-12 max-w-[1152px] items-center gap-2 overflow-x-auto px-4">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-content"
                    : "text-base-content hover:bg-base-200"
                }`}
              >
                <Emoji value={c.emoji} size={14} />
                {c.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

function Avatar({ name, image, size }: { name: string; image?: string | null; size: number }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={image}
        alt={name}
        width={size}
        height={size}
        className="rounded-lg object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="grid place-items-center rounded-lg bg-primary text-sm font-semibold text-primary-content"
      style={{ width: size, height: size }}
    >
      {name?.charAt(0).toUpperCase() || "U"}
    </span>
  );
}
