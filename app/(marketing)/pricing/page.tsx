import type { Metadata } from "next";
import { PricingContent } from "@/components/marketing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing & Payment Plans  Pantri",
  description:
    "Simple payroll payment plans for food purchases: 5 or 6 equal monthly deductions, no cash upfront. Limit typically 1.5× salary. Not a personal loan product.",
};

export default function PricingPage() {
  return <PricingContent />;
}
