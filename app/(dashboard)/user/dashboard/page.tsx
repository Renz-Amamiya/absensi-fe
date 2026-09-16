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
import { CheckCircle2, ScanFace, Calendar, Clock } from "lucide-react";

const personalLogs = [
  { id: "1", date: "Sep 16, 2026", timestamp: "07:45:12 AM", status: "Present" },
  { id: "2", date: "Sep 15, 2026", timestamp: "08:05:00 AM", status: "Late" },
  { id: "3", date: "Sep 14, 2026", timestamp: "07:55:10 AM", status: "Present" },
  { id: "4", date: "Sep 11, 2026", timestamp: "07:40:22 AM", status: "Present" },
];

export default function UserDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back, John Doe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Attendance Rate</CardTitle>
            <Calendar className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-slate-800">92%</div>
            <p className="text-xs text-slate-400 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Face Registration Status</CardTitle>
            <ScanFace className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Registered & Trained
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-2">Ready for Jetson Nano scanning.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-none shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-500" /> My Attendance History
          </CardTitle>
        </CardHeader>
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-700">Date</TableHead>
              <TableHead className="font-semibold text-slate-700">Time</TableHead>
              <TableHead className="font-semibold text-slate-700 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personalLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-slate-800">{log.date}</TableCell>
                <TableCell className="text-slate-500">{log.timestamp}</TableCell>
                <TableCell className="text-right">
                  {log.status === "Late" ? (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                      {log.status}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
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
  );
}
