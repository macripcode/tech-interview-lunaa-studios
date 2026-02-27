import api from "./api";
import { User, CreateUserInput } from "@/types/user";

const DEFAULT_GEO = { lat: "0", lng: "0" };
const USERNAME_SLUG_REGEX = /\s+/g;

export async function getUsers(): Promise<User[]> {
  try {
    const { data } = await api.get<User[]>("/users");
    return data;
  } catch {
    return [];
  }
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
}

export function buildLocalUser(input: CreateUserInput): User {
  return {
    id: Date.now(),
    name: input.name,
    username: input.username || input.name.toLowerCase().replace(USERNAME_SLUG_REGEX, ""),
    email: input.email,
    address: input.address
      ? { ...input.address, geo: DEFAULT_GEO }
      : { street: "", suite: "", city: "", zipcode: "", geo: DEFAULT_GEO },
    phone: input.phone ?? "",
    website: input.website ?? "",
    company: input.company,
  };
}
