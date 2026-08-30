import type { Metadata } from "next";
import { HowItWorksContent } from "@/components/marketing/HowItWorksContent";

export const metadata: Metadata = {
  title: "How Pantri Works",
  description:
    "Pantri is a food purchasing platform with payroll-backed payment plans — not a personal loan. Get the food you need today. Pay from your salary.",
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
