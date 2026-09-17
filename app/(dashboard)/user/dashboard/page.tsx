"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, ScanFace, Calendar, Clock, Camera } from "lucide-react";
import { CheckInModal } from "@/components/check-in-modal";
import { useState } from "react";

const initialPersonalLogs = [
  { id: "1", date: new Date().toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' }), checkIn: "07:45:12 AM", checkOut: "-", status: "Hadir" },
  { id: "2", date: "15 Sep 2026", checkIn: "08:05:00 AM", checkOut: "17:00:15 PM", status: "Terlambat" },
  { id: "3", date: "14 Sep 2026", checkIn: "07:55:10 AM", checkOut: "17:15:20 PM", status: "Hadir" },
  { id: "4", date: "11 Sep 2026", checkIn: "07:40:22 AM", checkOut: "16:55:40 PM", status: "Hadir" },
];

export default function UserDashboard() {
  const [logs, setLogs] = useState(initialPersonalLogs);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);

  const handleScan = (mode: "checkIn" | "checkOut", name: string) => {
    const today = new Date().toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' });
    const now = new Date().toLocaleTimeString('id-ID', { hour12: false });

    setLogs(prev => {
      const todayLogIndex = prev.findIndex(log => log.date === today);
      
      if (todayLogIndex >= 0) {
        const newLogs = [...prev];
        const log = { ...newLogs[todayLogIndex] };
        
        if (mode === "checkIn" && (!log.checkIn || log.checkIn === "-")) {
          log.checkIn = now;
        } else if (mode === "checkOut") {
          log.checkOut = now;
        }
        
        newLogs[todayLogIndex] = log;
        return newLogs;
      } else {
        const newLog = {
          id: Date.now().toString(),
          date: today,
          checkIn: mode === "checkIn" ? now : "-",
          checkOut: mode === "checkOut" ? now : "-",
          status: "Hadir"
        };
        return [newLog, ...prev];
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-blue-900">Dashboard Saya</h1>
        <p className="text-blue-600/80 mt-1 font-medium">Selamat datang kembali, John Doe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative rounded-2xl">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-colors"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-bold text-blue-800">Tingkat Kehadiran</CardTitle>
            <div className="p-2.5 bg-blue-50 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm border border-blue-100">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-extrabold text-blue-900 tracking-tight">92%</div>
            <p className="text-xs font-medium text-blue-500 mt-2">Bulan ini</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative rounded-2xl">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-400/10 rounded-full blur-2xl group-hover:bg-green-400/20 transition-colors"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-bold text-blue-800">Jadwal Hari Ini</CardTitle>
            <div className="p-2.5 bg-blue-50 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm border border-blue-100">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-lg font-extrabold text-blue-900 tracking-tight">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-xs font-medium text-slate-500">Masuk: <span className="font-bold text-blue-700">07:00</span></div>
              <div className="text-xs font-medium text-slate-500">Pulang: <span className="font-bold text-blue-700">15:00</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative rounded-2xl">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-bold text-blue-800">Absensi Hari Ini</CardTitle>
            <div className="p-2.5 bg-blue-50 rounded-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-sm border border-blue-100">
              <Camera className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-2 py-0.5 font-bold shadow-sm text-[10px]">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Wajah Terverifikasi
              </Badge>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => setIsCheckInModalOpen(true)} 
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Camera className="w-5 h-5" /> Absen Sekarang
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="bg-white border border-blue-100 shadow-md overflow-hidden h-full rounded-2xl">
          <CardHeader className="border-b border-blue-100/50 pb-4 bg-blue-50/30 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-extrabold text-blue-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" /> Riwayat Kehadiran Saya
            </CardTitle>
          </CardHeader>
            <Table>
              <TableHeader className="bg-blue-50/50">
                <TableRow className="border-blue-100">
                  <TableHead className="font-bold text-blue-900">Tanggal</TableHead>
                  <TableHead className="font-bold text-blue-900">Masuk</TableHead>
                  <TableHead className="font-bold text-blue-900">Keluar</TableHead>
                  <TableHead className="font-bold text-blue-900 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-blue-50/50 border-blue-100 transition-colors">
                    <TableCell className="font-bold text-slate-700">{log.date}</TableCell>
                    <TableCell className="text-blue-700 font-mono text-xs font-bold">{log.checkIn}</TableCell>
                    <TableCell className="text-blue-700 font-mono text-xs font-bold">{log.checkOut || "-"}</TableCell>
                    <TableCell className="text-right">
                      {log.status === "Terlambat" ? (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 font-bold border border-yellow-200">
                          {log.status}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 font-bold border border-green-200">
                          {log.status}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
      </div>

      <CheckInModal 
        isOpen={isCheckInModalOpen} 
        onClose={() => setIsCheckInModalOpen(false)} 
        onLog={handleScan} 
      />
    </div>
  );
}
