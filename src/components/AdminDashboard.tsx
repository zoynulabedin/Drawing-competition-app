"use client";

import { useEffect, useState } from "react";
import { Student } from "@/lib/types";
import { useRouter } from "next/navigation";
import { LogOut, Save, Award, Search, FileText } from "lucide-react";

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const updatePosition = async (id: string, position: string) => {
    const p = parseInt(position);
    if (isNaN(p)) return;

    try {
      const res = await fetch("/api/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, position: p }),
      });
      if (res.ok) {
        fetchStudents(); // Refresh
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateCertificate = (studentId: string) => {
    // Open certificate in new tab or mock action
    // For now, just alert or navigate
    router.push(`/certificate/${studentId}`);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.studentName.toLowerCase().includes(filter.toLowerCase()) ||
      s.rollNumber.includes(filter)
  );

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/70">Manage students and results</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-100 px-4 py-2 rounded-lg border border-red-500/30 transition-all font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or roll number..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className="bg-purple-50 px-4 py-2 rounded-lg text-purple-700 font-bold border border-purple-100 flex-shrink-0">
              Total Students: {students.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                <tr>
                  <th className="p-4">Roll No</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Group</th>
                  <th className="p-4">Mobile</th>
                  <th className="p-4">Position</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 font-mono font-bold text-gray-800">
                      {student.rollNumber}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.profilePhoto}
                          alt={student.studentName}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {student.studentName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {student.fatherName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                        {student.group} Years
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      {student.mobileNo}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {student.position &&
                          student.position > 0 &&
                          student.position <= 3 && (
                            <Award
                              size={20}
                              className={
                                student.position === 1
                                  ? "text-yellow-500"
                                  : student.position === 2
                                  ? "text-gray-400"
                                  : "text-amber-700"
                              }
                            />
                          )}
                        <input
                          type="number"
                          min="1"
                          max="100"
                          placeholder="Rank"
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                          defaultValue={student.position || ""}
                          onBlur={(e) =>
                            updatePosition(student.id, e.target.value)
                          }
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleGenerateCertificate(student.id)}
                        className="text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-1 text-sm font-medium"
                        title="Generate Certificate"
                      >
                        <FileText size={16} />
                        Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredStudents.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No students found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
