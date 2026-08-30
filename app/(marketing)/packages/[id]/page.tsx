import type { Metadata } from "next";
import { PackageDetail } from "@/components/marketing/packages/PackageDetail";

export const metadata: Metadata = {
  title: "Package — Pantri",
  description: "View package contents, pricing, and payroll payment examples on Pantri.",
};

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PackageDetail packageId={id} />;
}
