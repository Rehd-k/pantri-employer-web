import type { Metadata } from "next";
import { NutritionContent } from "@/components/marketing/NutritionContent";

export const metadata: Metadata = {
  title: "Nutrition Centre  Pantri",
  description:
    "Food that fits your life. General nutrition goals, meal suggestions in the Pantri app, and shopping lists  not medical advice.",
};

export default function NutritionPage() {
  return <NutritionContent />;
}
