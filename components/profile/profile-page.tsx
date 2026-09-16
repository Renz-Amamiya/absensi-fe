"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Save } from "lucide-react";

export function ProfilePageContent() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal information and settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-none shadow-sm flex flex-col items-center p-6 text-center">
          <div className="relative group mb-4">
            <Avatar className="h-32 w-32 border-4 border-blue-50 transition-transform duration-300 group-hover:scale-105">
              <AvatarImage src="" alt="@avatar" />
              <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-4xl">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
          <p className="text-sm text-slate-500">{user.role === 'admin' ? 'Administrator' : 'Student'}</p>
        </Card>

        <Card className="md:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue={user.name} className="bg-slate-50 border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user.email} className="bg-slate-50 border-slate-200" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role / Status</Label>
              <Input id="role" defaultValue={user.role === 'admin' ? 'System Administrator' : 'Student (Registered)'} className="bg-slate-50 border-slate-200 text-slate-500" disabled />
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all hover:shadow-lg">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
