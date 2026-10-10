"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("দুটি পাসওয়ার্ড মেলেনি");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
    router.push("/signin");
  }

  const input = "input input-md w-full border-base-300 bg-base-200/50 text-[13px]";

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-[13px]">নাম</span>
          <input name="name" type="text" placeholder="যেমন: রহিম উদ্দিন" className={input} />
        </label>
        <label className="block space-y-1.5">
          <span className="text-[13px]">ইমেইল</span>
          <input name="email" type="email" placeholder="you@example.com" className={input} />
        </label>
        <label className="block space-y-1.5">
          <span className="text-[13px]">পাসওয়ার্ড</span>
          <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className={input} />
        </label>
        <label className="block space-y-1.5">
          <span className="text-[13px]">পাসওয়ার্ড নিশ্চিত করুন</span>
          <input name="confirm" type="password" placeholder="আবার লিখুন" className={input} />
        </label>
        <button type="submit" disabled={loading} className="btn btn-primary shadow-green w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="mt-4">
        <SocialButtons callbackURL="/" />
      </div>

      <p className="mt-4 text-center text-[13px]">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthShell>
  );
}
