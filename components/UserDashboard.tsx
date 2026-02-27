"use client";

import { useState, useMemo, useCallback } from "react";
import { type CreateUserInput } from "@/types/user";
import UserListToolbar from "@/components/UserListToolbar";
import UserCard from "@/components/UserCard";
import dynamic from "next/dynamic";

const CreateEditUserModal = dynamic(() => import("@/components/CreateEditUserModal"));
import { useToast } from "@/components/ToastProvider";
import { useUsers } from "@/contexts/UsersContext";

export default function UserDashboard() {
  const { users, addUser } = useUsers();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.company.name.toLowerCase().includes(term)
    );
  }, [users, search]);

  const totalUsers = users.length;
  const matchedCount = filteredUsers.length;

  const handleUserCreated = useCallback(
    (input: CreateUserInput) => {
      addUser(input);
      showToast("Usuario creado exitosamente", "success");
    },
    [addUser, showToast]
  );

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div>
      <UserListToolbar
        search={search}
        totalUsers={totalUsers}
        matchedCount={matchedCount}
        onSearchChange={setSearch}
        onNewUser={handleOpenModal}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {totalUsers === 0 && (
        <div className="flex flex-col items-center py-20">
          <p className="text-base font-medium text-gray-700">No hay usuarios registrados</p>
          <p className="mt-1 text-sm text-gray-500">Crea el primero para comenzar.</p>
          <button
            onClick={handleOpenModal}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Crear primer usuario
          </button>
        </div>
      )}

      {totalUsers > 0 && filteredUsers.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-sm text-gray-500">
            No se encontraron usuarios para{" "}
            <span className="font-medium text-gray-700">«{search}»</span>.
          </p>
        </div>
      )}

      <CreateEditUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleUserCreated}
      />
    </div>
  );
}
