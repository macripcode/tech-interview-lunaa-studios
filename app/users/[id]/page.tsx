"use client";

import { useParams } from "next/navigation";
import { useUsers } from "@/contexts/UsersContext";
import Layout from "@/components/Layout";
import UserProfile from "@/components/UserProfile";
import Link from "next/link";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const { getUserById } = useUsers();

  const user = !isNaN(numericId) ? getUserById(numericId) : undefined;

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-semibold text-gray-900">
            Usuario no encontrado
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            El usuario que buscas no existe o fue eliminado.
          </p>
          <Link
            href="/"
            className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Volver al inicio
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <UserProfile user={user} />
    </Layout>
  );
}
