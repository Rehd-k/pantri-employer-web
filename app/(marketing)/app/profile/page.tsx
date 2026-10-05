import type { Metadata } from "next";
import { DownloadContent } from "@/components/marketing/DownloadContent";

export const metadata: Metadata = {
  title: "Profile in the Pantri app",
  description: "Open your profile in the Pantri app, or download Pantri if it is not installed.",
};

export default function ProfileDeepLinkPage() {
  return (
    <DownloadContent notice="Your profile opens in the Pantri app. Download Pantri if you do not have it yet." />
  );
}
