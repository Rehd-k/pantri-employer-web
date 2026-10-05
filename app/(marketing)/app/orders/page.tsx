import type { Metadata } from "next";
import { DownloadContent } from "@/components/marketing/DownloadContent";

export const metadata: Metadata = {
  title: "Orders in the Pantri app",
  description: "Open your orders in the Pantri app, or download Pantri if it is not installed.",
};

export default function OrdersDeepLinkPage() {
  return (
    <DownloadContent notice="Your orders open in the Pantri app. Download Pantri if you do not have it yet." />
  );
}
