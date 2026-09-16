"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, BrainCircuit, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const initialUsers = [
  { id: "1", name: "John Doe", role: "Student", faceTrained: true },
  { id: "2", name: "Jane Smith", role: "Student", faceTrained: true },
  { id: "3", name: "Alice Johnson", role: "Student", faceTrained: false },
  { id: "4", name: "Bob Williams", role: "Student", faceTrained: false },
  { id: "5", name: "Charlie Brown", role: "Student", faceTrained: true },
];

export default function MasterData() {
  const [users, setUsers] = useState(initialUsers);
  const [isTraining, setIsTraining] = useState<string | null>(null);

  const handleTrainModel = (userId: string) => {
    setIsTraining(userId);
    // Simulate sending data to Jetson Nano
    setTimeout(() => {
      setUsers(users.map(u => u.id === userId ? { ...u, faceTrained: true } : u));
      setIsTraining(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Master Data</h1>
          <p className="text-slate-500 mt-1">Manage users and face recognition models.</p>
        </div>
        
        <Dialog>
          <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-md" />}>
            <Plus className="w-4 h-4" /> Add New User
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="Student / Staff" defaultValue="Student" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-700">Name</TableHead>
              <TableHead className="font-semibold text-slate-700">Role</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Face Trained</TableHead>
              <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-slate-800">{user.name}</TableCell>
                <TableCell className="text-slate-500">{user.role}</TableCell>
                <TableCell className="text-center">
                  {user.faceTrained ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Yes
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
                      <XCircle className="w-3 h-3" /> No
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    disabled={user.faceTrained || isTraining === user.id}
                    onClick={() => handleTrainModel(user.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 shadow-sm disabled:opacity-50"
                  >
                    {isTraining === user.id ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <BrainCircuit className="w-4 h-4 mr-2" />
                    )}
                    {isTraining === user.id ? "Training to Jetson..." : "Train Face Model"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
