import type { Metadata } from "next";
import { ProductDetailContent } from "@/components/marketing/shop/ProductDetailContent";

export const metadata: Metadata = {
  title: "Product — Pantri Shop",
  description: "View product details and payroll payment examples on Pantri.",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <ProductDetailContent productId={productId} />;
}
