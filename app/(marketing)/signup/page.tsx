import type { Metadata } from "next";
import { SignupContent } from "@/components/marketing/SignupContent";

export const metadata: Metadata = {
  title: "Employee Signup — Pantri",
  description:
    "Employee accounts are created in the Pantri mobile app. Employers contact Pantri to onboard their organisation.",
};

export default function SignupPage() {
  return <SignupContent />;
}
