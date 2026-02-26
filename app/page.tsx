import { getUsers } from "@/lib/userService";
import Layout from "@/components/Layout";
import UserDashboard from "./UserDashboard";
import { UsersProvider } from "@/contexts/UsersContext";

export default async function HomePage() {
  const users = await getUsers();

  return (
    <Layout>
      <UsersProvider initialUsers={users}>
        <UserDashboard />
      </UsersProvider>
    </Layout>
  );
}
