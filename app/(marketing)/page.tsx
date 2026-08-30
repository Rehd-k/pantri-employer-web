import type { Metadata } from "next";
import { HomepageContent } from "@/components/marketing/HomepageContent";

export const metadata: Metadata = {
  title: "Pantri — Get the food you need today. Pay from your salary.",
  description:
    "Pantri helps employees buy groceries, family food packages and event supplies today, while convenient payroll deductions spread the cost over time.",
};

export default function HomePage() {
  return <HomepageContent />;
}
