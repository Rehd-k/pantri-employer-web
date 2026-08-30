import type { Metadata } from "next";
import { FaqPageContent } from "@/components/marketing/FaqPageContent";

export const metadata: Metadata = {
  title: "FAQ & Trust — Pantri",
  description:
    "Frequently asked questions about Pantri food purchasing, payroll payment plans, eligibility, delivery, and security.",
};

export default function FaqPage() {
  return <FaqPageContent />;
}
