import type { Metadata } from "next";
import { ContactContent } from "@/components/marketing/ContactContent";

export const metadata: Metadata = {
  title: "Contact  Pantri",
  description:
    "Get in touch with Pantri for employer onboarding, payroll questions, and support. We'll respond within one business day.",
};

export default function ContactPage() {
  return <ContactContent />;
}
