"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Clock, UserX } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const trendData = [
  { name: "Mon", present: 45, late: 3, absent: 2 },
  { name: "Tue", present: 48, late: 1, absent: 1 },
  { name: "Wed", present: 42, late: 5, absent: 3 },
  { name: "Thu", present: 47, late: 2, absent: 1 },
  { name: "Fri", present: 46, late: 4, absent: 0 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of today's attendance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Users</CardTitle>
            <Users className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">50</div>
            <p className="text-xs text-slate-400 mt-1">Registered in system</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Present</CardTitle>
            <UserCheck className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">42</div>
            <p className="text-xs text-green-600 mt-1 font-medium">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow border-b-4 border-b-yellow-400">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Late</CardTitle>
            <Clock className="w-5 h-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">5</div>
            <p className="text-xs text-yellow-600 mt-1 font-medium">Action required</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Absent</CardTitle>
            <UserX className="w-5 h-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">3</div>
            <p className="text-xs text-slate-400 mt-1">Unexcused</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-none shadow-sm p-2">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">Weekly Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
              <Tooltip
                cursor={{ stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line type="monotone" dataKey="present" name="Present" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="late" name="Late" stroke="#facc15" strokeWidth={3} dot={{ r: 4, fill: '#facc15', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="absent" name="Absent" stroke="#94a3b8" strokeWidth={3} dot={{ r: 4, fill: '#94a3b8', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
