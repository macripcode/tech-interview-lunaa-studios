import Link from "next/link";
import { type User } from "@/types/user";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/users/${user.id}`}>
      <div className="rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
            {user.name.charAt(0)}
          </div>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            @{user.username}
          </span>
        </div>
        <h3 className="mt-3 text-base font-semibold text-gray-900">
          {user.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{user.email}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {user.company.name}
          </span>
        </div>
        <p className="mt-2 text-xs text-gray-400">{user.phone}</p>
      </div>
    </Link>
  );
}
