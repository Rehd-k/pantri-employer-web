import type { Metadata } from "next";
import { DownloadContent } from "@/components/marketing/DownloadContent";

export const metadata: Metadata = {
  title: "View a package in the Pantri app",
  description: "Open this food package in the Pantri app, or download Pantri if it is not installed.",
};

export default async function PackageDeepLinkPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  return (
    <DownloadContent
      notice={`Package ${packageId} opens in the Pantri app. Download Pantri if you do not have it yet.`}
    />
  );
}
