import { getUsers } from "@/lib/userService";
import Layout from "@/components/Layout";
import UserDashboard from "./UserDashboard";

export default async function HomePage() {
  const users = await getUsers();

  return (
    <Layout>
      <UserDashboard initialUsers={users} />
    </Layout>
  );
}
