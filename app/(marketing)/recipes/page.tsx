import type { Metadata } from "next";
import { RecipesContent } from "@/components/marketing/RecipesContent";

export const metadata: Metadata = {
  title: "Recipes — Pantri",
  description:
    "Your groceries become your meal plan. Nigerian recipe ideas connected to Pantri shopping.",
};

export default function RecipesPage() {
  return <RecipesContent />;
}
