import type { Metadata } from "next";
import { DeliveryContent } from "@/components/marketing/DeliveryContent";

export const metadata: Metadata = {
  title: "Delivery — Pantri",
  description:
    "From our warehouse to your door. Track Pantri orders in the app — confirmation through delivery, with care for perishables.",
};

export default function DeliveryPage() {
  return <DeliveryContent />;
}
