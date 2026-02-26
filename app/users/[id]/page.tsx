"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useUsers } from "@/contexts/UsersContext";
import Layout from "@/components/Layout";
import UserProfile from "@/components/UserProfile";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const { getUserById } = useUsers();

  if (isNaN(numericId)) notFound();

  const user = getUserById(numericId);
  if (!user) notFound();

  return (
    <Layout>
      <UserProfile user={user} />
    </Layout>
  );
}
