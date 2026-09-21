import prisma from "@/lib/prisma";
import MasterDataClient from "./master-data-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const dbUsers = await prisma.user.findMany({
    orderBy: { create_at: "desc" },
    select: {
      id: true,
      nama: true,
      email: true,
      role: true,
    }
  });

  const users = dbUsers.map(user => ({
    id: user.id,
    nama: user.nama,
    email: user.email,
    role: user.role === "admin" ? "Admin" : "User",
    status: "Aktif", // You can add status logic if needed
  }));

  return <MasterDataClient initialUsers={users} />;
}
