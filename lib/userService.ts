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
    company: input.company,
  };
}
