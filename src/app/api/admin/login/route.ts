import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  // Check specific credentials first (fallback/super-admin)
  if (username === "admin" && password === "admin123") {
    cookies().set("admin_token", "secret-token-123", {
      httpOnly: true,
      path: "/",
    });
    return NextResponse.json({ success: true });
  }

  // Check database for other admins
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (admin && admin.password === password) {
      cookies().set("admin_token", "secret-token-123", {
        httpOnly: true,
        path: "/",
      });
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
