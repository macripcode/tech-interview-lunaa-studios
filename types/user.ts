export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type CreateUserInput = Pick<User, "name" | "email" | "company"> & {
  username?: string;
  phone?: string;
  website?: string;
  address?: Omit<User["address"], "geo">;
};
