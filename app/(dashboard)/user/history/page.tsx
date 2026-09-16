"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const extendedLogs = [
  { id: "1", date: "Sep 16, 2026", timestamp: "07:45:12 AM", status: "Present", device: "Jetson Nano Gate A" },
  { id: "2", date: "Sep 15, 2026", timestamp: "08:05:00 AM", status: "Late", device: "Jetson Nano Gate A" },
  { id: "3", date: "Sep 14, 2026", timestamp: "07:55:10 AM", status: "Present", device: "Jetson Nano Gate B" },
  { id: "4", date: "Sep 11, 2026", timestamp: "07:40:22 AM", status: "Present", device: "Jetson Nano Gate A" },
  { id: "5", date: "Sep 10, 2026", timestamp: "-", status: "Absent", device: "-" },
  { id: "6", date: "Sep 09, 2026", timestamp: "07:58:15 AM", status: "Present", device: "Jetson Nano Gate A" },
  { id: "7", date: "Sep 08, 2026", timestamp: "08:12:44 AM", status: "Late", device: "Jetson Nano Gate B" },
  { id: "8", date: "Sep 07, 2026", timestamp: "07:50:01 AM", status: "Present", device: "Jetson Nano Gate A" },
];

export default function MyHistoryPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My History</h1>
          <p className="text-slate-500 mt-1">Detailed log of your attendance records.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by date..."
              className="pl-8 bg-white border-slate-200"
            />
          </div>
          <Button variant="outline" className="border-slate-200 text-slate-600 bg-white shadow-sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Card className="bg-white border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-700">Date</TableHead>
              <TableHead className="font-semibold text-slate-700">Scan Time</TableHead>
              <TableHead className="font-semibold text-slate-700">Device Location</TableHead>
              <TableHead className="font-semibold text-slate-700 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {extendedLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-slate-800">{log.date}</TableCell>
                <TableCell className="text-slate-500">{log.timestamp}</TableCell>
                <TableCell className="text-slate-500 text-sm">{log.device}</TableCell>
                <TableCell className="text-right">
                  {log.status === "Late" ? (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                      {log.status}
                    </Badge>
                  ) : log.status === "Absent" ? (
                    <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">
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
