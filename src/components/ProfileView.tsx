"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface Props {
  name: string;
  email: string;
  image?: string | null;
}

export default function ProfileView({ name, email, image }: Props) {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-[736px] space-y-4 pb-6">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-xs text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex items-center gap-4">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} className="h-[60px] w-[60px] rounded-xl object-cover" />
          ) : (
            <span className="grid h-[60px] w-[60px] place-items-center rounded-xl bg-primary text-2xl font-bold text-primary-content">
              {name?.charAt(0).toUpperCase()}
            </span>
          )}
          <div>
            <p className="text-lg font-medium">{name}</p>
            <p className="text-sm text-base-content/70">{email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-lg border border-error px-3 py-1.5 text-[13px] text-error hover:bg-error/5"
        >
          ↩ সাইন আউট
        </button>
      </div>

      <div className="space-y-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="text-sm font-semibold">তথ্য</h2>
        <label className="block space-y-1.5 pt-2">
          <span className="text-[13px]">নাম</span>
          <input
            value={name}
            readOnly
            type="text"
            className="input input-md w-full border-base-300 bg-base-200/50 text-[13px]"
          />
        </label>
        {/* C3: the update button takes the user to another route */}
        <Link href="/profile/update" className="btn btn-primary shadow-green w-full">
          আপডেট
        </Link>
      </div>
    </div>
  );
}
