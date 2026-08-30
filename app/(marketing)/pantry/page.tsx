import type { Metadata } from "next";
import { PantryContent } from "@/components/marketing/PantryContent";

export const metadata: Metadata = {
  title: "Smart Pantry — Pantri",
  description:
    "Coming soon in the Pantri app: know what's in your kitchen and never run out of the staples you use most. Roadmap preview only.",
};

export default function PantryPage() {
  return <PantryContent />;
}
