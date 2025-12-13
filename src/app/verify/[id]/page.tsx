import { getStudentById } from "@/lib/db";
import { notFound } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function VerifyPage({ params }: PageProps) {
  const student = await getStudentById(params.id);

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center">
      {student ? (
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-green-100 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <CheckCircle2 size={150} className="text-green-500" />
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full ring-4 ring-green-50">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Student Verified
          </h1>
          <p className="text-gray-500 mb-8">This admit card is valid.</p>

          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 ring-4 ring-purple-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={student.profilePhoto}
              alt={student.studentName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-left bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Student Name
              </span>
              <span className="font-semibold text-lg text-gray-800">
                {student.studentName}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Roll Number
                </span>
                <span className="font-mono font-bold text-purple-600">
                  {student.rollNumber}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Group
                </span>
                <span className="font-semibold text-gray-800">
                  {student.group}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Father's Name
                </span>
                <span className="font-medium text-gray-700">
                  {student.fatherName}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Mother's Name
                </span>
                <span className="font-medium text-gray-700">
                  {student.motherName}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="block mt-8 text-purple-600 font-semibold hover:underline"
          >
            Go to Home
          </Link>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-red-100 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full ring-4 ring-red-50">
              <XCircle size={48} className="text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Verification Failed
          </h1>
          <p className="text-gray-500 mb-8">
            This admit card is invalid or does not exist.
          </p>
          <Link
            href="/"
            className="block mt-4 text-gray-500 hover:text-gray-800 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      )}
    </div>
  );
}
