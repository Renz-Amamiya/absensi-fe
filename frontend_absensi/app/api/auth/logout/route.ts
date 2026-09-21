import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  
  // Clear all cookies
  cookieStore.delete("auth_role");
  cookieStore.delete("auth_user_id");
  cookieStore.delete("auth_user_name");
  cookieStore.delete("auth_user_email");
  
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
}
