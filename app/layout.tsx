import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import { UsersProvider } from "@/contexts/UsersContext";
import { getUsers } from "@/lib/userService";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Customer Management Dashboard",
  description: "Panel de gestión de clientes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const users = await getUsers();

  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ToastProvider>
          <UsersProvider initialUsers={users}>{children}</UsersProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
