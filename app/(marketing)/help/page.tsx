import type { Metadata } from "next";
import { HelpContent } from "@/components/marketing/HelpContent";

export const metadata: Metadata = {
  title: "Help Centre — Pantri",
  description: "Search Pantri help topics for getting started, orders, payments, and employer questions.",
};

export default function HelpPage() {
  return <HelpContent />;
}
