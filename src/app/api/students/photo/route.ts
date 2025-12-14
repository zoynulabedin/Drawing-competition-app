import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Buffer } from "buffer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse("Missing ID", { status: 400 });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id },
      select: { profilePhoto: true },
    });

    if (!student || !student.profilePhoto) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Check if it's already a URL (in case logic changes later)
    if (
      student.profilePhoto.startsWith("http") ||
      student.profilePhoto.startsWith("/")
    ) {
      return NextResponse.redirect(new URL(student.profilePhoto, request.url));
    }

    // Parse data URL
    const matches = student.profilePhoto.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    );

    if (!matches || matches.length !== 3) {
      // If it's not a data URL, return it as text? or 404?
      // It might be just a string if something went wrong, let's just 404 or cache it?
      return new NextResponse("Invalid image format", { status: 500 });
    }

    const type = matches[1];
    const buffer = Buffer.from(matches[2], "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error fetching photo:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
