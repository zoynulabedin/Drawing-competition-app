import { NextResponse } from "next/server";
import { saveStudent, getNextRollNumber } from "@/lib/db";
import { Student } from "@/lib/types";

import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.studentName ||
      !body.fatherName ||
      !body.motherName ||
      !body.mobileNo ||
      !body.group ||
      !body.profilePhoto
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Debug logging
    console.log("Cloudinary Config Check:", {
      NEXT_PUBLIC: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
      CLOUD_NAME: !!process.env.CLOUD_NAME,
      CLOUDINARY_URL: !!process.env.CLOUDINARY_URL,
      API_KEY: !!process.env.CLOUDINARY_API_KEY,
      API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
    });

    // Upload image to Cloudinary
    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUD_NAME;
    if (!cloudName) {
      throw new Error("Cloudinary Cloud Name is not configured");
    }

    const uploadResponse = await cloudinary.uploader.upload(body.profilePhoto, {
      folder: "drawing-competition",
    });

    const rollNumber = await getNextRollNumber();

    const newStudent: Student = {
      id: crypto.randomUUID(),
      rollNumber,
      studentName: body.studentName,
      fatherName: body.fatherName,
      motherName: body.motherName,
      mobileNo: body.mobileNo,
      group: body.group,
      profilePhoto: uploadResponse.secure_url,
      registrationDate: new Date().toISOString(),
    };

    await saveStudent(newStudent);

    return NextResponse.json({ success: true, student: newStudent });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
