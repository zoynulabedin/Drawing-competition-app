import { getStudentById } from "@/lib/db";
import { notFound } from "next/navigation";
import AdmitCard from "@/components/AdmitCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AdmitCardPage({ params }: PageProps) {
  const student = await getStudentById(params.id);

  if (!student) {
    notFound();
  }

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center">
      <div className="mb-6 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Registration Successful!</h1>
        <p className="opacity-90">
          Here is your admit card. Please print it and bring it to the venue.
        </p>
      </div>
      <AdmitCard student={student} />
    </div>
  );
}
