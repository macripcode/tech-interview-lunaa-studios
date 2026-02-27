import api from "./api";
import { User, CreateUserInput } from "@/types/user";

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");
  return data;
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
}

export function buildLocalUser(input: CreateUserInput): User {
  return {
    id: Date.now(),
    name: input.name,
    username: input.username || input.name.toLowerCase().replace(/\s+/g, ""),
    email: input.email,
    address: input.address
      ? { ...input.address, geo: { lat: "0", lng: "0" } }
      : { street: "", suite: "", city: "", zipcode: "", geo: { lat: "0", lng: "0" } },
    phone: input.phone ?? "",
    website: input.website ?? "",
    company: input.company,
  };
}
