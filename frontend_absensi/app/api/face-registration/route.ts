import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";
import fs from "fs";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("auth_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized. Please login first." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("photo") || formData.get("file");
    
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Simpan foto ke disk (seperti kode awal)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'faces');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const path = join(uploadDir, filename);
    await writeFile(path, buffer);
    const photoUrl = `/uploads/faces/${filename}`;

    // 2. Simpan record pendaftaran ke database dengan status "pending"
    // Tidak langsung memproses ke AI agar muncul di halaman persetujuan Admin
    const registration = await prisma.faceRegistration.create({
      data: {
        user_id: userId,
        photo_url: photoUrl,
        status: "pending" // Harus pending agar admin bisa melihatnya
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Pengajuan berhasil dikirim ke Admin!",
      data: registration 
    });
  } catch (error: any) {
    console.error("Error in face registration:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
