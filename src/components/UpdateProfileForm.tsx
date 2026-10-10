"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ name }: { name: string }) {
  const router = useRouter();
  const [value, setValue] = useState(name);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!value.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    setLoading(true);
    const { error } = await authClient.updateUser({ name: value.trim() });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-[416px] pt-6 pb-10">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-[13px] text-base-content/70">আপনার নাম পরিবর্তন করুন।</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-base-300 bg-base-100 p-5"
      >
        <label className="block space-y-1.5">
          <span className="text-[13px]">নাম</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="আপনার নাম"
            className="input input-md w-full border-base-300 bg-base-200/50 text-[13px]"
          />
        </label>
        <button type="submit" disabled={loading} className="btn btn-primary shadow-green w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
        </button>
      </form>
      <p className="mt-6 text-center">
        <Link href="/profile" className="text-[13px] text-base-content/70 hover:text-primary">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
