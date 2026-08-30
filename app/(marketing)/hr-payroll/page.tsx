import type { Metadata } from "next";
import { HrPayrollContent } from "@/components/marketing/HrPayrollContent";

export const metadata: Metadata = {
  title: "HR & Payroll — Pantri",
  description:
    "Designed for the people who run payroll. Deduction schedules, CSV exports, approvals, and audit history — scoped to your organisation.",
};

export default function HrPayrollPage() {
  return <HrPayrollContent />;
}
