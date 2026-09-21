import prisma from "@/lib/prisma";
import AttendanceLogsClient, { AbsenLog } from "./logs-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const dbLogs = await prisma.absen.findMany({
    orderBy: { scan_time: "desc" },
    include: {
      user: {
        select: {
          nama: true,
        }
      }
    }
  });

  const logs: AbsenLog[] = dbLogs.map(log => {
    const scanDate = new Date(log.scan_time);
    const dateStr = scanDate.toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = scanDate.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return {
      id: log.id,
      name: log.user.nama,
      date: dateStr,
      checkIn: timeStr,
      checkOut: "-", // Placeholder, since checkOut might need logic if a user scans twice
      status: log.status,
      confidence: log.confidence_score,
      device: log.device_loc,
    };
  });

  return <AttendanceLogsClient initialLogs={logs} />;
}
