import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Set simple cookies for session
    const cookieStore = await cookies();
    cookieStore.set("auth_role", user.role, { path: "/", maxAge: 86400 });
    cookieStore.set("auth_user_id", user.id, { path: "/", maxAge: 86400 });
    cookieStore.set("auth_user_name", user.nama, { path: "/", maxAge: 86400 });
    cookieStore.set("auth_user_email", user.email, { path: "/", maxAge: 86400 });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.nama,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
