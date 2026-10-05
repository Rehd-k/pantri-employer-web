import type { Metadata } from "next";
import { DownloadContent } from "@/components/marketing/DownloadContent";

export const metadata: Metadata = {
  title: "Credit in the Pantri app",
  description: "Open your credit account in the Pantri app, or download Pantri if it is not installed.",
};

export default function CreditDeepLinkPage() {
  return (
    <DownloadContent notice="Your credit account opens in the Pantri app. Download Pantri if you do not have it yet." />
  );
}
