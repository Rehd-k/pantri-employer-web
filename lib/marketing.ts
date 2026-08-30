export interface PublicPackagePricing {
  wholesaleSubtotalKobo: number;
  retailSubtotalKobo: number;
  discountPercent: number;
  savingsKobo: number;
  totalKobo: number;
}

export interface PublicPackageListItem {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;
  isPopular: boolean;
  itemSummary: string;
  itemCount: number;
  pricing: PublicPackagePricing;
}

export interface PublicPackageItem {
  id: string;
  packId: string;
  productId: string;
  quantity: number;
  sortOrder: number;
  name: string;
  brand: string;
  packageLabel: string;
  imageUrl: string;
  priceKobo: number;
  retailPriceKobo: number;
  lineWholesaleKobo: number;
  lineRetailKobo: number;
}

export interface PublicPackageDetail extends PublicPackageListItem {
  items: PublicPackageItem[];
}

export type PaymentPlanId = "20_6" | "25_5";

export interface PaymentPlanOption {
  id: PaymentPlanId;
  label: string;
  initialPercent: number;
  months: number;
}

export const PAYMENT_PLANS: PaymentPlanOption[] = [
  { id: "20_6", label: "20% + 6 months", initialPercent: 20, months: 6 },
  { id: "25_5", label: "25% + 5 months", initialPercent: 25, months: 5 },
];

export interface PaymentCalculation {
  packageKobo: number;
  initialKobo: number;
  monthlyKobo: number;
  months: number;
  remainingKobo: number;
}

export function calculatePayment(
  packageKobo: number,
  plan: PaymentPlanOption,
): PaymentCalculation {
  const initialKobo = Math.round((packageKobo * plan.initialPercent) / 100);
  const remainingKobo = packageKobo - initialKobo;
  const monthlyKobo = Math.round(remainingKobo / plan.months);
  return {
    packageKobo,
    initialKobo,
    monthlyKobo,
    months: plan.months,
    remainingKobo,
  };
}

export function nairaToKobo(naira: number): number {
  return Math.round(naira * 100);
}
