import type { Metadata } from "next";
import { BusinessContent } from "@/components/marketing/BusinessContent";

export const metadata: Metadata = {
  title: "Business & Bulk Food  Pantri",
  description:
    "Food procurement at business scale for hotels, restaurants, schools, and more. Corporate bulk capabilities on our roadmap  talk to sales.",
};

export default function BusinessPage() {
  return <BusinessContent />;
}
