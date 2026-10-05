import type { Metadata } from "next";
import { DownloadContent } from "@/components/marketing/DownloadContent";

export const metadata: Metadata = {
  title: "Packages in the Pantri app",
  description: "Open food packages in the Pantri app, or download Pantri if it is not installed.",
};

export default function PackagesDeepLinkPage() {
  return (
    <DownloadContent notice="Food packages open in the Pantri app. Download Pantri if you do not have it yet." />
  );
}
