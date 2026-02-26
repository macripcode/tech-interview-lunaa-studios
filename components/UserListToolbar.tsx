"use client";

import { memo } from "react";
import SearchBar from "./SearchBar";

interface UserListToolbarProps {
  search: string;
  totalUsers: number;
  matchedCount: number;
  onSearchChange: (value: string) => void;
  onNewUser: () => void;
}

function UserListToolbar({
  search,
  totalUsers,
  matchedCount,
  onSearchChange,
  onNewUser,
}: UserListToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 max-w-md">
        <SearchBar value={search} onChange={onSearchChange} />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">
          {matchedCount} de {totalUsers} usuarios
        </span>
        <button
          onClick={onNewUser}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
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
  );
}

export default memo(UserListToolbar);
