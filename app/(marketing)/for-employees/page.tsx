import type { Metadata } from "next";
import { ForEmployeesContent } from "@/components/marketing/ForEmployeesContent";

export const metadata: Metadata = {
  title: "For Employees — Pantri",
  description:
    "Your salary. Your food. Your choice. Pantri lets employees of participating employers buy food today and pay through payroll — not a personal loan.",
};

export default function ForEmployeesPage() {
  return <ForEmployeesContent />;
}
