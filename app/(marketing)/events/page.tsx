import type { Metadata } from "next";
import { EventsContent } from "@/components/marketing/EventsContent";

export const metadata: Metadata = {
  title: "Event Food Planner  Pantri",
  description:
    "Plan food for weddings, naming ceremonies, birthdays, and more. Illustrative estimates with payroll-friendly payment examples.",
};

export default function EventsPage() {
  return <EventsContent />;
}
