import { NextResponse } from "next/server";
import { getStudents, updateStudent, getStudentById } from "@/lib/db";
import { cookies } from "next/headers";
import { Student } from "@/lib/types";

export async function GET() {
  const token = cookies().get("admin_token");
  if (!token || token.value !== "secret-token-123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const students = await getStudents();
  return NextResponse.json(students);
}

export async function PUT(request: Request) {
  const token = cookies().get("admin_token");
  if (!token || token.value !== "secret-token-123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, position } = body;

    const student = await getStudentById(id);

    if (student) {
      const updatedStudent: Student = {
        ...student,
        position: parseInt(position),
      };
      await updateStudent(updatedStudent);
      return NextResponse.json({ success: true, student: updatedStudent });
    }

    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
