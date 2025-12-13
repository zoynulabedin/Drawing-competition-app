import { getStudentById } from "@/lib/db";
import { notFound } from "next/navigation";
import Certificate from "@/components/Certificate";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CertificatePage({ params }: PageProps) {
  const student = await getStudentById(params.id);

  if (!student) {
    notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <Certificate student={student} />
    </div>
  );
}
