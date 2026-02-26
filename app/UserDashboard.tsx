"use client";

import { useState } from "react";
import { type User } from "@/types/user";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import CreateUserModal from "@/components/CreateUserModal";
import { useToast } from "@/components/ToastProvider";

interface UserDashboardProps {
  initialUsers: User[];
}

export default function UserDashboard({ initialUsers }: UserDashboardProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const filteredUsers = users.filter(
    (user) =>
      user.name.includes(search) ||
      user.email.includes(search) ||
      user.company.name.includes(search)
  );

  const totalUsers = users.length;
  const matchedCount = filteredUsers.length;

  const handleUserCreated = (input: {
    name: string;
    email: string;
    company: string;
  }) => {
    const newUser: User = {
      id: users.length + 1,
      name: input.name,
      username: input.name.toLowerCase().replace(/\s+/g, ""),
      email: input.email,
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: { lat: "0", lng: "0" },
      },
      phone: "",
      website: "",
      company: { name: input.company, catchPhrase: "", bs: "" },
    };
    setUsers((prev) => [...prev, newUser]);
    showToast("Usuario creado exitosamente", "success");
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 max-w-md">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {matchedCount} de {totalUsers} usuarios
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Nuevo Usuario
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-sm text-gray-500">
            No se encontraron usuarios que coincidan con la búsqueda.
          </p>
        </div>
      )}

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
}
