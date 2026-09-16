"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, User as UserIcon } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy check: if email contains 'admin', login as admin, else user
    if (email.toLowerCase().includes("admin")) {
      login("admin");
    } else {
      login("user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md bg-white border-none shadow-xl">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">
            Jetson Attendance
          </CardTitle>
          <CardDescription className="text-slate-500">
            Login to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m.example@jetson.ai"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 border-slate-200 focus-visible:ring-blue-600"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-50 border-slate-200 focus-visible:ring-blue-600"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-11">
              Sign In
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">Or quick login as</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button 
                variant="outline" 
                onClick={() => login("admin")}
                className="border-slate-200 hover:bg-slate-50 hover:text-blue-700 text-slate-600"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Admin
              </Button>
              <Button 
                variant="outline"
                onClick={() => login("user")}
                className="border-slate-200 hover:bg-slate-50 hover:text-blue-700 text-slate-600"
              >
                <UserIcon className="w-4 h-4 mr-2" />
                User
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-100 pt-6 pb-6">
          <p className="text-xs text-slate-400">
            System powered by Jetson Nano AI
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
