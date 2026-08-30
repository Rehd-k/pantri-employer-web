import type { Metadata } from "next";
import { PricingContent } from "@/components/marketing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing & Payment Plans — Pantri",
  description:
    "Simple payroll payment plans for food purchases: 20% + 6 months or 25% + 5 months. Not a personal loan product.",
};

export default function PricingPage() {
  return <PricingContent />;
}
