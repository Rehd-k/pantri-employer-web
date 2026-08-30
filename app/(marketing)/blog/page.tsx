import type { Metadata } from "next";
import { BlogContent } from "@/components/marketing/BlogContent";

export const metadata: Metadata = {
  title: "Food & Wellness Journal — Pantri",
  description:
    "Practical articles on food budgeting, Nigerian cooking, family pantries, and healthy living from Pantri Editorial.",
};

export default function BlogPage() {
  return <BlogContent />;
}
