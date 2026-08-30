import type { Metadata } from "next";
import { DownloadContent } from "@/components/marketing/DownloadContent";

export const metadata: Metadata = {
  title: "Download Pantri",
  description:
    "Everything Pantri, in your pocket. Download the app for shopping, packages, nutrition, and delivery tracking.",
};

export default function DownloadPage() {
  return <DownloadContent />;
}
