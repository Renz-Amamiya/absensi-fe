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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

type User = {
  id: string;
  nama: string;
  email: string;
  role: string;
  status?: string;
};

export default function MasterDataClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Master Data</h1>
          <p className="text-blue-800/60 mt-1">Manage users and face recognition models.</p>
        </div>
        
        <Dialog>
          <DialogTrigger render={<Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold gap-2 shadow-[0_0_15px_rgba(250,204,21,0.3)]" />}>
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
          <TableHeader className="bg-blue-50/50 border-b border-blue-100">
            <TableRow>
              <TableHead className="font-semibold text-blue-900">Name</TableHead>
              <TableHead className="font-semibold text-blue-900">Role</TableHead>
              <TableHead className="font-semibold text-blue-900">Email</TableHead>
              <TableHead className="font-semibold text-blue-900 text-center">Status</TableHead>
              <TableHead className="font-semibold text-blue-900 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-blue-50/30">
                <TableCell className="font-medium text-blue-900">{user.nama}</TableCell>
                <TableCell className="text-blue-800/70">
                  <Badge variant="outline" className={user.role === "Admin" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-slate-50 text-slate-700 border-slate-200"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-blue-800/70">{user.email}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={user.status === "Aktif" ? "bg-blue-600 text-white border-blue-700" : "bg-white text-blue-400 border-blue-200"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Dialog>
                    <DialogTrigger render={<Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50" />}>
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Pengguna</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4 text-left">
                        <div className="grid gap-2">
                          <Label>Nama Lengkap</Label>
                          <Input defaultValue={user.nama} />
                        </div>
                        <div className="grid gap-2">
                          <Label>Email</Label>
                          <Input defaultValue={user.email} />
                        </div>
                        <div className="grid gap-2">
                          <Label>Role</Label>
                          <Input defaultValue={user.role} />
                        </div>
                        <div className="grid gap-2">
                          <Label>Status</Label>
                          <Input defaultValue={user.status} />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => alert(`Simulasi: Data ${user.nama} berhasil disimpan!`)}>
                          Simpan Perubahan
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(user.id)}
                    className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Hapus
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
