"use client";

import { Student } from "@/lib/types";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { Printer } from "lucide-react";

export default function AdmitCard({ student }: { student: Student }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <div
        id="print-area"
        className="bg-white text-gray-900 p-4 md:p-8 rounded-xl shadow-2xl max-w-2xl w-full border-4 md:border-[10px] border-double border-purple-200 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <div className="w-32 h-32 rounded-full bg-purple-600 blur-3xl"></div>
        </div>

        <div className="text-center border-b-2 border-dashed border-gray-300 pb-6 mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-purple-700 uppercase tracking-wider">
            Admit Card
          </h2>
          <h3 className="text-lg md:text-xl font-bold text-gray-600 mt-2">
            Annual Drawing Competition 2025
          </h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-4 border-gray-200 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={student.profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <span className="block text-xs text-gray-500 uppercase font-bold tracking-widest">
                Roll Number
              </span>
              <span className="block text-3xl md:text-4xl font-black text-indigo-600 font-mono tracking-tighter">
                {student.rollNumber}
              </span>
            </div>
          </div>

          <div className="flex-grow space-y-4 w-full">
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="block text-gray-500 text-xs uppercase font-bold">
                  Name
                </span>
                <span className="block text-lg font-semibold text-gray-800">
                  {student.studentName}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="block text-gray-500 text-xs uppercase font-bold">
                    Father's Name
                  </span>
                  <span className="font-medium">{student.fatherName}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="block text-gray-500 text-xs uppercase font-bold">
                    Mother's Name
                  </span>
                  <span className="font-medium">{student.motherName}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="block text-gray-500 text-xs uppercase font-bold">
                    Group
                  </span>
                  <span className="font-medium text-purple-600 font-bold">
                    {student.group}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="block text-gray-500 text-xs uppercase font-bold">
                    Age Category
                  </span>
                  <span className="font-medium">
                    {student.group === "4-6"
                      ? "4-6 Years"
                      : student.group === "7-9"
                      ? "7-9 Years"
                      : "10 Years Old"}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="block text-gray-500 text-xs uppercase font-bold">
                  Mobile
                </span>
                <span className="font-medium font-mono">
                  {student.mobileNo}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
              <QRCodeSVG
                value={`https://drawing.appaza.dev/verify/${student.id}`}
                size={120}
              />
            </div>
            <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">
              Scan to Verify
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-end gap-4 sm:gap-0">
          <div className="text-xs text-gray-400 max-w-full sm:max-w-[200px] text-center sm:text-left">
            * Please bring this admit card to the venue. <br /> * Reporting
            time: 9:00 AM.
          </div>
          <div className="text-right flex flex-col items-center sm:items-end w-full sm:w-auto">
            <div className="h-10 w-32 border-b border-gray-400 mb-1"></div>
            <span className="text-xs text-gray-500 uppercase font-bold">
              Authorized Signature
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full backpack-blur-lg border border-white/40 transition-all flex items-center gap-2 shadow-lg hover:scale-105 print:hidden"
      >
        <Printer size={20} />
        Print Admit Card
      </button>
      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
          }
          body * {
            visibility: hidden;
          }
          #print-area,
          #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            border: none;
            box-shadow: none;
          }
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
