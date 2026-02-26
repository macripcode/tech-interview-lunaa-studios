import { getUserById } from "@/lib/userService";
import Layout from "@/components/Layout";
import UserProfile from "@/components/UserProfile";
import { notFound } from "next/navigation";

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    notFound();
  }

  let user;
  try {
    user = await getUserById(numericId);
  } catch {
    notFound();
  }

  return (
    <Layout>
      <UserProfile user={user} />
    </Layout>
  );
}
