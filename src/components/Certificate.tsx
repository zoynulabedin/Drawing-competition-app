"use client";

import { Student } from "@/lib/types";
import { useRef } from "react";
import { Printer } from "lucide-react";

export default function Certificate({ student }: { student: Student }) {
  const isWinner = student.position && student.position <= 3;
  const title = isWinner
    ? "Certificate of Achievement"
    : "Certificate of Participation";
  const subtext = isWinner
    ? `This is to certify that ${student.studentName} has achieved ${
        student.position
      }${getOrdinal(
        student.position!
      )} Position in the Annual Drawing Competition 2025.`
    : `This is to certify that ${student.studentName} has successfully participated in the Annual Drawing Competition 2025.`;

  function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-4xl">
      <div
        id="print-area"
        className="w-full aspect-[1.414/1] bg-white text-gray-900 relative border-[20px] border-double border-[#d4af37] p-10 shadow-2xl flex flex-col items-center justify-between overflow-hidden"
      >
        {/* Decorative Pattern Background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#4a5568 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Corner Ornaments */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-[#d4af37]"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-[#d4af37]"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-[#d4af37]"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-[#d4af37]"></div>

        <div className="text-center z-10 w-full mt-8">
          <h2 className="text-2xl font-serif text-[#d4af37] uppercase tracking-[0.2em] mb-4">
            Annual Drawing Competition 2025
          </h2>
          <h1 className="text-6xl font-serif font-bold text-gray-900 mb-2 font-display">
            {title}
          </h1>
          <div className="w-48 h-1 bg-[#d4af37] mx-auto mb-10"></div>
        </div>

        <div className="text-center z-10 max-w-3xl px-8">
          <h3 className="text-xl text-gray-500 italic mb-2">Presented to</h3>
          <h2
            className="text-5xl font-script text-purple-800 mb-8 font-cursive"
            style={{ fontFamily: "cursive" }}
          >
            {student.studentName}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed font-serif">
            {subtext}
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Group: <span className="font-semibold">{student.group} Years</span>{" "}
            | Roll No:{" "}
            <span className="font-semibold">{student.rollNumber}</span>
          </p>
        </div>

        <div className="flex justify-between w-full px-20 mb-12 z-10 items-end">
          <div className="text-center">
            <div className="w-48 border-b border-gray-400 mb-2"></div>
            <p className="text-sm font-bold uppercase text-gray-500 tracking-wider">
              Date
            </p>
            <p className="font-serif italic">
              {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Seal */}
          <div
            className="w-32 h-32 rounded-full border-4 border-[#d4af37] flex items-center justify-center text-[#d4af37] font-bold text-xs uppercase tracking-widest text-center p-2 opacity-80"
            style={{ transform: "rotate(-10deg)" }}
          >
            <div className="border border-[#d4af37] w-full h-full rounded-full flex items-center justify-center">
              Official
              <br />
              Seal
            </div>
          </div>

          <div className="text-center">
            <div className="w-48 border-b border-gray-400 mb-2"></div>
            <p className="text-sm font-bold uppercase text-gray-500 tracking-wider">
              Principal / Organizer
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: landscape;
          }
          body {
            background: none;
          }
          body * {
            visibility: hidden;
          }
          #print-area,
          #print-area * {
            visibility: visible;
          }
          #print-area {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            border: 20px double #d4af37;
            box-shadow: none;
          }
          button {
            display: none;
          }
        }
      `}</style>
      <button
        onClick={handlePrint}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-all flex items-center gap-2 shadow-lg hover:scale-105 print:hidden"
      >
        <Printer size={20} />
        Print Certificate
      </button>
    </div>
  );
}
