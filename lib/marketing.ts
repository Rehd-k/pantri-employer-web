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

/** Default marketing salary example (Naira). FGV = salary × CREDIT_MULTIPLIER. */
export const DEFAULT_SALARY_NAIRA = 300_000;

/** Matches backend CreditPolicy default (15_000 bps = 1.5×). */
export const CREDIT_MULTIPLIER = 1.5;
export const CREDIT_MULTIPLIER_BPS = 15_000;

export type PaymentPlanId = "6" | "5";

export interface PaymentPlanOption {
  id: PaymentPlanId;
  label: string;
  months: number;
}

export const PAYMENT_PLANS: PaymentPlanOption[] = [
  { id: "6", label: "6 months", months: 6 },
  { id: "5", label: "5 months", months: 5 },
];

export interface PaymentCalculation {
  salaryKobo: number;
  /** Food package value / credit ceiling (salary × 1.5). */
  creditLimitKobo: number;
  /** Raw order amount when provided; otherwise null (spend defaults to FGV). */
  purchaseKobo: number | null;
  /** Amount used for monthly math: min(purchase ?? FGV, FGV). */
  spendKobo: number;
  /** Always 0  no cash upfront. */
  initialKobo: number;
  monthlyKobo: number;
  months: number;
  remainingKobo: number;
  overLimit: boolean;
}

export function computeCreditLimitKobo(salaryKobo: number): number {
  if (salaryKobo <= 0) return 0;
  return Math.floor((salaryKobo * CREDIT_MULTIPLIER_BPS) / 10_000);
}

/**
 * Payroll payment example: 0% upfront, equal monthly deductions over 5 or 6 months.
 * Spend is capped at FGV (salary × 1.5). Pass `purchaseKobo` for a package/product total.
 */
export function calculatePayment(
  salaryKobo: number,
  plan: PaymentPlanOption,
  purchaseKobo?: number,
): PaymentCalculation {
  const creditLimitKobo = computeCreditLimitKobo(salaryKobo);
  const hasPurchase = purchaseKobo !== undefined;
  const rawPurchase = hasPurchase ? Math.max(0, purchaseKobo) : creditLimitKobo;
  const spendKobo = Math.min(rawPurchase, creditLimitKobo);
  const overLimit = hasPurchase && rawPurchase > creditLimitKobo;
  const monthlyKobo =
    plan.months > 0 ? Math.round(spendKobo / plan.months) : 0;

  return {
    salaryKobo,
    creditLimitKobo,
    purchaseKobo: hasPurchase ? rawPurchase : null,
    spendKobo,
    initialKobo: 0,
    monthlyKobo,
    months: plan.months,
    remainingKobo: spendKobo,
    overLimit,
  };
}

export function nairaToKobo(naira: number): number {
  return Math.round(naira * 100);
}
