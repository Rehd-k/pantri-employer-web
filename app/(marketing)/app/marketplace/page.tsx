import type { Metadata } from "next";
import { DownloadContent } from "@/components/marketing/DownloadContent";

export const metadata: Metadata = {
  title: "Marketplace in the Pantri app",
  description: "Open the marketplace in the Pantri app, or download Pantri if it is not installed.",
};

export default function MarketplaceDeepLinkPage() {
  return (
    <DownloadContent notice="The marketplace opens in the Pantri app. Download Pantri if you do not have it yet." />
  );
}
