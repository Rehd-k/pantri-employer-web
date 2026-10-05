import type { Metadata } from "next";
import { DownloadContent } from "@/components/marketing/DownloadContent";

export const metadata: Metadata = {
  title: "View food in the Pantri app",
  description: "Open this food in the Pantri app, or download Pantri if it is not installed.",
};

export default async function FoodDeepLinkPage({
  params,
}: {
  params: Promise<{ foodId: string }>;
}) {
  const { foodId } = await params;
  return (
    <DownloadContent
      notice={`Food ${foodId} opens in the Pantri app. Download Pantri if you do not have it yet.`}
    />
  );
}
