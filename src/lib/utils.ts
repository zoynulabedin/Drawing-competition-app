import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple unique ID generator for roll numbers
export function generateRollNumber(currentCount: number): string {
  const next = currentCount + 1;
  return next.toString().padStart(3, "0");
}
