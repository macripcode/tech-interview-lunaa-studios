import api from "./api";
import { User } from "@/types/user";

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");
  return data;
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
}
