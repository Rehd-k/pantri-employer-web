import type { Metadata } from "next";
import { DownloadContent } from "@/components/marketing/DownloadContent";

export const metadata: Metadata = {
  title: "Pantri promo",
  description: "Open this promo in the Pantri app, or download Pantri if it is not installed.",
};

export default async function PromoDeepLinkPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return (
    <DownloadContent
      notice={`Promo code ${code} opens in the Pantri app when promo redemption is available. Download Pantri if you do not have it yet.`}
    />
  );
}
