import type { Metadata } from "next";
import { PackagesContent } from "@/components/marketing/packages/PackagesContent";

export const metadata: Metadata = {
  title: "Food Packages — Pantri",
  description:
    "Household-sized food packages built around real life. Live pricing with payroll-backed payment plans.",
};

export default function PackagesPage() {
  return <PackagesContent />;
}
