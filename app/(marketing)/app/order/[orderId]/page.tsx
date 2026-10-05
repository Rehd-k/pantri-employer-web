import type { Metadata } from "next";
import { DownloadContent } from "@/components/marketing/DownloadContent";

export const metadata: Metadata = {
  title: "View an order in the Pantri app",
  description: "Open this order in the Pantri app, or download Pantri if it is not installed.",
};

export default async function OrderDeepLinkPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return (
    <DownloadContent
      notice={`Order ${orderId} opens in the Pantri app. Download Pantri if you do not have it yet.`}
    />
  );
}
