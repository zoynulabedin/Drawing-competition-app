import { prisma } from "./prisma";
import { Student } from "./types";

function mapToStudent(data: any): Student {
  return {
    ...data,
    registrationDate: data.registrationDate.toISOString(),
  };
}

export async function getStudents(): Promise<Student[]> {
  const students = await prisma.student.findMany({
    orderBy: { registrationDate: "desc" },
    select: {
      id: true,
      rollNumber: true,
      studentName: true,
      fatherName: true,
      motherName: true,
      mobileNo: true,
      group: true,
      registrationDate: true,
      position: true,
    },
  });

  return students.map((student) => ({
    ...student,
    registrationDate: student.registrationDate.toISOString(),
    profilePhoto: `/api/students/photo?id=${student.id}`,
  }));
}

export async function saveStudent(student: Student) {
  return await prisma.student.create({
    data: {
      id: student.id,
      rollNumber: student.rollNumber,
      studentName: student.studentName,
      fatherName: student.fatherName,
      motherName: student.motherName,
      mobileNo: student.mobileNo,
      group: student.group,
      profilePhoto: student.profilePhoto,
      registrationDate: new Date(student.registrationDate),
      position: student.position,
    },
  });
}

export async function updateStudent(updatedStudent: Student) {
  const { id, ...data } = updatedStudent;

  // Remove undefined fields if any, though the type implies complete Student object
  // For position updates, we usually get the full object or partial.
  // The previous implementation replaced the object.

  await prisma.student.update({
    where: { id },
    data: {
      ...data,
      registrationDate: new Date(data.registrationDate),
    },
  });
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  const student = await prisma.student.findUnique({
    where: { id },
  });
  if (!student) return undefined;
  return mapToStudent(student);
}

export async function getNextRollNumber(): Promise<string> {
  const lastStudent = await prisma.student.findFirst({
    orderBy: {
      rollNumber: "desc",
    },
  });

  if (!lastStudent) return "001";

  // Parse int to be safe
  const lastRoll = parseInt(lastStudent.rollNumber, 10);
  if (isNaN(lastRoll)) return "001";

  const nextRoll = lastRoll + 1;
  return nextRoll.toString().padStart(3, "0");
}
