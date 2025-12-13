"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, CheckCircle } from "lucide-react";

export default function RegistrationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    mobileNo: "",
    group: "",
    profilePhoto: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePhoto: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/admit-card/${data.student.id}`);
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Student Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600 block">
            Student Name
          </label>
          <input
            required
            name="studentName"
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
            placeholder="Enter full name"
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 block">
              Father's Name
            </label>
            <input
              required
              name="fatherName"
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
              placeholder="Father's name"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 block">
              Mother's Name
            </label>
            <input
              required
              name="motherName"
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
              placeholder="Mother's name"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600 block">
            Mobile Number
          </label>
          <input
            required
            name="mobileNo"
            type="tel"
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
            placeholder="017xxxxxxxx"
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600 block">
            Select Group
          </label>
          <div className="relative">
            <select
              required
              name="group"
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none appearance-none"
            >
              <option value="">Select Age Group</option>
              <option value="4-6">Age 4-6</option>
              <option value="7-9">Age 7-9</option>
              <option value="10">10 Years Old</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600 block">
            Profile Photo
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors bg-white/30 cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {formData.profilePhoto ? (
              <img
                src={formData.profilePhoto}
                alt="Preview"
                className="mx-auto h-24 w-24 object-cover rounded-full border-4 border-white shadow-md"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <Upload size={32} className="mb-2" />
                <span className="text-sm">Click to upload photo</span>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Registering...
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              Submit Registration
            </>
          )}
        </button>
      </form>
    </div>
  );
}
