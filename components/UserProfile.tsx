"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { type User, type CreateUserInput } from "@/types/user";
import { useUsers } from "@/contexts/UsersContext";
import { useToast } from "@/components/ToastProvider";
import { userToFormValues } from "@/hooks/useUserForm";
import CreateEditUserModal from "@/components/CreateEditUserModal";
import ConfirmModal from "@/components/ConfirmModal";

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const { updateUser, deleteUser } = useUsers();
  const { showToast } = useToast();
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpenEdit = useCallback(() => setIsEditOpen(true), []);
  const handleCloseEdit = useCallback(() => setIsEditOpen(false), []);

  const handleOpenDelete = useCallback(() => setIsDeleteOpen(true), []);
  const handleCloseDelete = useCallback(() => setIsDeleteOpen(false), []);

  const handleUserUpdated = useCallback(
    (input: CreateUserInput) => {
      updateUser(user.id, input);
      showToast("Usuario actualizado exitosamente", "success");
    },
    [updateUser, user.id, showToast]
  );

  const handleConfirmDelete = useCallback(() => {
    deleteUser(user.id);
    showToast("Usuario eliminado exitosamente", "success");
    router.push("/");
  }, [deleteUser, user.id, showToast, router]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Volver al listado
        </Link>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenEdit}
            aria-label="Editar usuario"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button
            onClick={handleOpenDelete}
            aria-label="Eliminar usuario"
            className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50 hover:text-red-700"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700"
            >
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Contacto
            </h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-xs text-gray-500">Email</dt>
                <dd className="text-sm font-medium text-gray-900">{user.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Teléfono</dt>
                <dd className="text-sm font-medium text-gray-900">{user.phone}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Sitio web</dt>
                <dd className="text-sm font-medium text-blue-600">{user.website}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Empresa
            </h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-xs text-gray-500">Nombre</dt>
                <dd className="text-sm font-medium text-gray-900">{user.company.name}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Eslogan</dt>
                <dd className="text-sm text-gray-700">{user.company.catchPhrase}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">BS</dt>
                <dd className="text-sm text-gray-700">{user.company.bs}</dd>
              </div>
            </dl>
          </section>

          <section className="sm:col-span-2">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Dirección
            </h2>
            <p className="text-sm text-gray-700">
              {user.address.suite}, {user.address.street}
            </p>
            <p className="text-sm text-gray-700">
              {user.address.city}, {user.address.zipcode}
            </p>
          </section>
        </div>
      </div>

      <CreateEditUserModal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        onSubmit={handleUserUpdated}
        initialValues={userToFormValues(user)}
        title="Editar Usuario"
        submitLabel="Guardar Cambios"
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar usuario"
        message={`¿Estás seguro que deseas eliminar a ${user.name}? Esta acción no se puede deshacer.`}
      />
    </>
  );
}
