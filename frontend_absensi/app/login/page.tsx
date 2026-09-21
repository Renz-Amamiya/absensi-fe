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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        // Cookie is set by API, just reload to trigger middleware/auth-provider
        window.location.replace(`/${data.user.role}/dashboard`);
      } else {
        setError(data.error || "Login gagal");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
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
            Masuk untuk mengakses dashboard Anda
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
            <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-11">
              {loading ? "Memproses..." : "Masuk"}
            </Button>
            {error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}
          </form>

        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-100 pt-6 pb-6">
          <p className="text-xs text-slate-400">
            Sistem didukung oleh Jetson Nano AI
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
