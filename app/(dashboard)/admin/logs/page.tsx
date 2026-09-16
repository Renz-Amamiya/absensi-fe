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
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const logsData = [
  { id: "1", name: "John Doe", timestamp: "07:45:12 AM", status: "Present", confidence: 98.5 },
  { id: "2", name: "Jane Smith", timestamp: "07:50:33 AM", status: "Present", confidence: 97.2 },
  { id: "3", name: "Bob Williams", timestamp: "08:15:02 AM", status: "Late", confidence: 95.8 },
  { id: "4", name: "Charlie Brown", timestamp: "08:22:45 AM", status: "Late", confidence: 92.1 },
];

export default function GlobalLogs() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Global Scan Logs</h1>
          <p className="text-slate-500 mt-1">Real-time attendance scan results from Jetson Nano.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="pl-8 bg-white border-slate-200"
          />
        </div>
      </div>

      <Card className="bg-white border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-700">User Name</TableHead>
              <TableHead className="font-semibold text-slate-700">Timestamp</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="font-semibold text-slate-700 text-right">AI Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logsData.map((log) => (
              <TableRow key={log.id} className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-slate-800">{log.name}</TableCell>
                <TableCell className="text-slate-500">{log.timestamp}</TableCell>
                <TableCell>
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
                <TableCell className="text-right">
                  <span className="text-sm text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                    {log.confidence}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
