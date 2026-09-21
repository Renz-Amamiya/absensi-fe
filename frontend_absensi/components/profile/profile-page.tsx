"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Save, ScanFace, CheckCircle2, AlertCircle, UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProfilePageContent() {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{type: 'success' | 'error' | null, msg: string}>({ type: null, msg: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus({ type: null, msg: "Mengunggah dan memproses wajah..." });

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch("/api/face-registration", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setUploadStatus({ type: 'success', msg: data.message || "Wajah berhasil didaftarkan!" });
      } else {
        setUploadStatus({ type: 'error', msg: data.error || "Gagal mendaftarkan wajah" });
      }
    } catch (error) {
      console.error(error);
      setUploadStatus({ type: 'error', msg: "Terjadi kesalahan jaringan" });
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Profil Saya</h1>
        <p className="text-slate-500 mt-1">Kelola informasi pribadi dan pengaturan Anda.</p>
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
          <p className="text-sm text-slate-500">{user.role === 'admin' ? 'Administrator' : 'Siswa'}</p>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
              <CardDescription>Perbarui detail pribadi Anda di sini.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input id="fullName" defaultValue={user.name} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Alamat Email</Label>
                <Input id="email" type="email" defaultValue={user.email} className="bg-slate-50 border-slate-200" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Peran / Status</Label>
                <Input id="role" defaultValue={user.role === 'admin' ? 'Administrator Sistem' : 'Siswa (Terdaftar)'} className="bg-slate-50 border-slate-200 text-slate-500" disabled />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all hover:shadow-lg">
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
              <div>
                <CardTitle className="text-lg font-bold text-blue-900">Registrasi Wajah (AI)</CardTitle>
                <CardDescription>Unggah foto wajah yang jelas agar AI dapat mengenali Anda saat absensi.</CardDescription>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-sm border border-blue-100">
                <ScanFace className="w-6 h-6 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center gap-2 mt-2">
                {uploadStatus.type === 'success' ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1 font-semibold shadow-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Terdaftar & Terlatih
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 px-3 py-1 font-semibold shadow-sm">
                    <AlertCircle className="w-4 h-4 mr-2" /> Menunggu Pendaftaran Foto
                  </Badge>
                )}
              </div>
              
              {uploadStatus.msg && (
                <p className={`text-sm mt-3 font-medium ${uploadStatus.type === 'error' ? 'text-red-500' : 'text-blue-600'}`}>
                  {uploadStatus.msg}
                </p>
              )}
              
              <div className="pt-6">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  variant="outline" 
                  className="w-full md:w-auto text-blue-700 border-blue-200 hover:bg-blue-50 transition-colors font-semibold shadow-sm"
                >
                  <UploadCloud className="w-4 h-4 mr-2" />
                  {isUploading ? "Memproses Wajah..." : "Unggah Foto Wajah"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
