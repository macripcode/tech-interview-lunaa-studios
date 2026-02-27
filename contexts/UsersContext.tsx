"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { type User, type CreateUserInput } from "@/types/user";
import { buildLocalUser } from "@/lib/userService";

interface UsersContextType {
  users: User[];
  addUser: (input: CreateUserInput) => void;
  updateUser: (id: number, input: CreateUserInput) => void;
  getUserById: (id: number) => User | undefined;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}

interface UsersProviderProps {
  initialUsers: User[];
  children: ReactNode;
}

export function UsersProvider({ initialUsers, children }: UsersProviderProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addUser = useCallback((input: CreateUserInput) => {
    setUsers((prev) => [...prev, buildLocalUser(input)]);
  }, []);

  const updateUser = useCallback((id: number, input: CreateUserInput) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...buildLocalUser(input), id } : u))
    );
  }, []);

  const getUserById = useCallback(
    (id: number) => users.find((u) => u.id === id),
    [users]
  );

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, getUserById }}>
      {children}
    </UsersContext.Provider>
  );
}
