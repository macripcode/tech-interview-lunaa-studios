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

  return (
    <UsersContext.Provider value={{ users, addUser }}>
      {children}
    </UsersContext.Provider>
  );
}
