import type { Metadata } from "next";
import { DownloadContent } from "@/components/marketing/DownloadContent";

export const metadata: Metadata = {
  title: "Join Pantri with an invite",
  description: "Use your employer invite in the Pantri app, or download Pantri if it is not installed.",
};

export default async function InviteDeepLinkPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return (
    <DownloadContent
      notice={`Invite code ${code} opens employee registration in the Pantri app. Download Pantri if you do not have it yet.`}
    />
  );
}
