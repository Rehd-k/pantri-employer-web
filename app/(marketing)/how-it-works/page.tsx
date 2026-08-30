import type { Metadata } from "next";
import { HowItWorksContent } from "@/components/marketing/HowItWorksContent";

export const metadata: Metadata = {
  title: "How Pantri Works",
  description:
    "Pantri is a food purchasing platform with payroll-backed payment plansnot a personal loan. Stock up in bulk and dodge the next price jump (in Nigeria, it's always up)enough for food, bills, and investments that help you earn more.",
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
