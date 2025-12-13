export interface Student {
  id: string;
  rollNumber: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  mobileNo: string;
  group: "4-6" | "7-9" | "10";
  profilePhoto: string; // Base64 or URL
  registrationDate: string;
  position?: number;
}
