import type { Metadata } from "next";
import { ForEmployersContent } from "@/components/marketing/ForEmployersContent";

export const metadata: Metadata = {
  title: "For Employers — Pantri",
  description:
    "A better food benefit for your employees. Pantri helps companies offer payroll-backed food purchasing without building another welfare system.",
};

export default function ForEmployersPage() {
  return <ForEmployersContent />;
}
