import type { Metadata } from "next";
import { HomepageContent } from "@/components/marketing/HomepageContent";

export const metadata: Metadata = {
  title: "Pantri  A full table today. Room in your paycheck for tomorrow.",
  description:
    "Pantri helps you stock food now with payroll deductionsso you can eat well, cover bills, and invest. Buy in bulk before the next jump (in Nigeria, prices only go up), and your pantry stays full.",
};

export default function HomePage() {
  return <HomepageContent />;
}
