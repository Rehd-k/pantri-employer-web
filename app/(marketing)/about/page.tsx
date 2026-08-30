import type { Metadata } from "next";
import { AboutContent } from "@/components/marketing/AboutContent";

export const metadata: Metadata = {
  title: "About Pantri",
  description:
    "Pantri's story and long-term vision: technology, bulk purchasing, and employer payroll systems that make food purchasing easier and more predictable.",
};

export default function AboutPage() {
  return <AboutContent />;
}
