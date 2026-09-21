import prisma from "@/lib/prisma";
import UserDashboardClient, { AbsenLog } from "./dashboard-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("auth_user_id")?.value;
  const userName = cookieStore.get("auth_user_name")?.value || "Pengguna";

  if (!userId) {
    return <div className="p-8 text-center text-red-500 font-bold">Error: auth_user_id cookie not found on server! Please clear your cookies.</div>;
  }

  const dbLogs = await prisma.absen.findMany({
    where: { user_id: userId },
    orderBy: { scan_time: "desc" },
    take: 10 // Only show recent ones on dashboard
  });

  const logs: AbsenLog[] = dbLogs.map(log => {
    const scanDate = new Date(log.scan_time);
    const dateStr = scanDate.toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = scanDate.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return {
      id: log.id,
      date: dateStr,
      checkIn: timeStr,
      checkOut: "-", // Same, needs logic if multiple scans a day
      status: log.status,
    };
  });

  return <UserDashboardClient initialLogs={logs} userName={decodeURIComponent(userName)} />;
}
