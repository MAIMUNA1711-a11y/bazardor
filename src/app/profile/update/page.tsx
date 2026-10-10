import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { auth } from "@/lib/auth";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=/profile/update&reason=protected");

  return <UpdateProfileForm name={session.user.name} />;
}
