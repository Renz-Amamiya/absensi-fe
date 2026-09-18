import { prisma } from "@/lib/prisma"
import { FaceVerificationTable } from "./components/face-verification-table"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Verifikasi Wajah | Admin",
  description: "Kelola permintaan verifikasi wajah user",
}

export default async function FaceVerificationPage() {
  // Ambil data request verifikasi wajah dari database
  // Karena prisma sedang dalam update, kita siapkan struktur pemanggilannya
  // await prisma.faceRegistration.findMany(...)
  
  // Untuk saat ini kita gunakan data dummy agar UI terlihat
  const dummyRequests = [
    {
      id: "req-1",
      user: { nama: "Budi Santoso", email: "budi@example.com" },
      photo_url: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      status: "pending",
      created_at: new Date(),
    },
    {
      id: "req-2",
      user: { nama: "Siti Aminah", email: "siti@example.com" },
      photo_url: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      status: "pending",
      created_at: new Date(),
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Verifikasi Wajah</h1>
          <p className="text-blue-800/60 mt-1">
            Kelola dan proses pengajuan data wajah dari pengguna untuk sistem absensi AI.
          </p>
        </div>
      </div>
      
      <Card className="bg-white border-none shadow-sm overflow-hidden">
        <FaceVerificationTable requests={dummyRequests} />
      </Card>
    </div>
  )
}
