import { NextResponse } from "next/server";
import { saveStudent, getNextRollNumber } from "@/lib/db";
import { Student } from "@/lib/types";

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

    const rollNumber = await getNextRollNumber();

    const newStudent: Student = {
      id: crypto.randomUUID(),
      rollNumber,
      studentName: body.studentName,
      fatherName: body.fatherName,
      motherName: body.motherName,
      mobileNo: body.mobileNo,
      group: body.group,
      profilePhoto: body.profilePhoto,
      registrationDate: new Date().toISOString(),
    };

    await saveStudent(newStudent);

    return NextResponse.json({ success: true, student: newStudent });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
