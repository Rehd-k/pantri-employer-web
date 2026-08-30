import type { Metadata } from "next";
import { ShopContent } from "@/components/marketing/shop/ShopContent";

export const metadata: Metadata = {
  title: "Shop — Pantri",
  description:
    "Browse the Pantri food marketplace. Better prices through bulk procurement. Pay through your salary via the Pantri app.",
};

export default function ShopPage() {
  return <ShopContent />;
}
