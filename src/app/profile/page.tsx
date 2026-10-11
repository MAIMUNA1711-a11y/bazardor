import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileView from "@/components/ProfileView";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=/profile&reason=protected");

  const { user } = session;
  return <ProfileView name={user.name} email={user.email} image={user.image} />;
}