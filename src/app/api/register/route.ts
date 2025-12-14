import { NextResponse } from "next/server";
import { saveStudent, getNextRollNumber } from "@/lib/db";
import { Student } from "@/lib/types";
import fs from "fs";
import path from "path";

import cloudinary from "@/lib/cloudinary";

const reloadEnv = () => {
  try {
    const envPath = path.join(process.cwd(), ".env");
    console.log(`Loading env from: ${envPath}`);
    if (fs.existsSync(envPath)) {
      const fileContent = fs.readFileSync(envPath, "utf-8");
      fileContent.split("\n").forEach((line) => {
        // Skip comments and empty lines
        if (!line || line.trim().startsWith("#")) return;

        const firstEquals = line.indexOf("=");
        if (firstEquals === -1) return;

        const key = line.substring(0, firstEquals).trim();
        let value = line.substring(firstEquals + 1).trim();

        // Remove surrounding quotes if present
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.substring(1, value.length - 1);
        }

        if (key && value) {
          process.env[key] = value;
        }
      });
    } else {
      console.warn("No .env file found at " + envPath);
    }
  } catch (error) {
    console.error("Error reloading env:", error);
  }
};

export async function POST(request: Request) {
  reloadEnv(); // Force reload env vars

  // Re-configure Cloudinary explicitly to ensure it picks up the latest env vars
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY || process.env.API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET;

  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

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

    // Upload image to Cloudinary
    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUD_NAME;
    if (!cloudName) {
      throw new Error(
        `Cloudinary Cloud Name is not configured. CWD: ${process.cwd()}. Env exists: ${fs.existsSync(
          path.join(process.cwd(), ".env")
        )}`
      );
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
