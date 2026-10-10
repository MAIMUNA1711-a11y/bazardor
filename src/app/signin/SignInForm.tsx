"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/";
  const [loading, setLoading] = useState(false);
  const toasted = useRef(false);

  // Came here from a protected page -> tell the user why
  useEffect(() => {
    if (params.get("reason") === "protected" && !toasted.current) {
      toasted.current = true;
      toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন");
    }
  }, [params]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-[13px]">ইমেইল</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="input input-md w-full border-base-300 bg-base-200/50 text-[13px]"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-[13px]">পাসওয়ার্ড</span>
          <input
            name="password"
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input input-md w-full border-base-300 bg-base-200/50 text-[13px]"
          />
        </label>
        <button type="submit" disabled={loading} className="btn btn-primary shadow-green w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>
      </form>

      <div className="mt-4">
        <SocialButtons callbackURL={redirectTo} />
      </div>

      <p className="mt-4 text-center text-[13px]">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </AuthShell>
  );
}
