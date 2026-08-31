import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuthUser();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {auth && <AdminSidebar />}
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
