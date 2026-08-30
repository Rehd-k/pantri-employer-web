"use client";

import { useMemo, useState } from "react";
import { formatNaira } from "@/lib/format";
import {
  calculatePayment,
  computeCreditLimitKobo,
  DEFAULT_SALARY_NAIRA,
  nairaToKobo,
  PAYMENT_PLANS,
  type PaymentPlanId,
} from "@/lib/marketing";

export function PaymentCalculator({
  defaultPurchaseNaira,
  /** @deprecated Prefer defaultPurchaseNaira */
  defaultPackageNaira,
}: {
  defaultPurchaseNaira?: number;
  defaultPackageNaira?: number;
} = {}) {
  const purchaseNaira = defaultPurchaseNaira ?? defaultPackageNaira;
  const [salaryNaira, setSalaryNaira] = useState(DEFAULT_SALARY_NAIRA);
  const [planId, setPlanId] = useState<PaymentPlanId>("6");

  const plan = PAYMENT_PLANS.find((p) => p.id === planId) ?? PAYMENT_PLANS[0];

  const result = useMemo(() => {
    const salaryKobo = nairaToKobo(salaryNaira);
    const purchaseKobo =
      purchaseNaira !== undefined ? nairaToKobo(purchaseNaira) : undefined;
    return calculatePayment(salaryKobo, plan, purchaseKobo);
  }, [salaryNaira, plan, purchaseNaira]);

  const fgvKobo = result.creditLimitKobo;

  return (
    <div className="pantri-card p-6 shadow-xl shadow-pantri-primary/5 sm:p-8">
      <h3 className="mb-6 text-lg font-semibold text-pantri-foreground">
        Payment plan calculator
      </h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-pantri-muted">
            Monthly salary (₦)
          </span>
          <input
            type="number"
            min={0}
            step={10000}
            value={salaryNaira}
            onChange={(e) => setSalaryNaira(Number(e.target.value) || 0)}
            className="pantri-input"
          />
        </label>
        <div className="block">
          <span className="mb-1.5 block text-sm font-medium text-pantri-muted">
            Food package value / limit (₦)
          </span>
          <div className="pantri-input flex items-center bg-pantri-surface-muted text-pantri-foreground">
            {formatNaira(fgvKobo).replace(/^₦/, "")}
          </div>
          <p className="mt-1 text-xs text-pantri-muted">
            Salary × 1.5  not editable
          </p>
        </div>
        {purchaseNaira !== undefined ? (
          <div className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-pantri-muted">
              Order amount (₦)
            </span>
            <div className="pantri-input flex items-center bg-pantri-surface-muted text-pantri-foreground">
              {formatNaira(nairaToKobo(purchaseNaira)).replace(/^₦/, "")}
            </div>
          </div>
        ) : null}
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-pantri-muted">
            Payment plan
          </span>
          <select
            value={planId}
            onChange={(e) => setPlanId(e.target.value as PaymentPlanId)}
            className="pantri-input"
          >
            {PAYMENT_PLANS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result.overLimit ? (
        <div
          className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100"
          role="status"
        >
          This order ({formatNaira(result.purchaseKobo ?? 0)}) is above your food
          package limit of {formatNaira(result.creditLimitKobo)}. You can only buy
          up to your 1.5× salary limit. Monthly figures below use the capped
          amount.
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 rounded-xl bg-pantri-surface-muted p-5 sm:grid-cols-2 lg:grid-cols-3">
        <ResultItem label="Food package limit (FGV)" value={formatNaira(result.creditLimitKobo)} />
        {purchaseNaira !== undefined ? (
          <ResultItem
            label="Amount in plan"
            value={formatNaira(result.spendKobo)}
          />
        ) : null}
        <ResultItem
          label="Monthly deduction"
          value={formatNaira(result.monthlyKobo)}
          highlight
        />
        <ResultItem label="Duration" value={`${result.months} months`} />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-pantri-muted">
        No cash upfront  only equal monthly payroll deductions. Your limit is
        typically 1.5× monthly salary. As deductions reduce what you owe, available
        credit opens again so you can buy up to that limit even before a prior plan
        is fully repaid. Eligibility depends on your employer.
      </p>
    </div>
  );
}

function ResultItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-pantri-muted">{label}</p>
      <p
        className={`mt-1 text-lg font-bold ${highlight ? "text-pantri-accent" : "text-pantri-foreground"}`}
      >
        {value}
      </p>
    </div>
  );
}

export function PaymentPlanVisual() {
  const salaryKobo = nairaToKobo(DEFAULT_SALARY_NAIRA);
  const fgvKobo = computeCreditLimitKobo(salaryKobo);
  const monthlyKobo = Math.round(fgvKobo / 6);

  return (
    <div className="pantri-card flex flex-col items-center gap-3 bg-pantri-surface/90 p-6 shadow-lg backdrop-blur-sm">
      <div className="text-center">
        <p className="text-sm font-medium text-pantri-muted">Monthly salary</p>
        <p className="text-2xl font-bold text-pantri-foreground">
          {formatNaira(salaryKobo)}
        </p>
      </div>
      <div className="flex flex-col items-center gap-1 text-pantri-muted">
        <span className="text-2xl">↓</span>
        <span className="text-xs font-semibold uppercase tracking-wider">× 1.5</span>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-pantri-muted">Food package limit</p>
        <p className="text-2xl font-bold text-pantri-foreground">
          {formatNaira(fgvKobo)}
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-pantri-accent">
          Today · no upfront
        </p>
      </div>
      <div className="flex flex-col items-center gap-1 text-pantri-muted">
        <span className="text-2xl">↓</span>
      </div>
      <div className="w-full rounded-xl bg-pantri-accent/10 p-4 text-center">
        <p className="text-xs text-pantri-muted">Monthly payroll deduction</p>
        <p className="text-lg font-bold text-pantri-accent">{formatNaira(monthlyKobo)}</p>
        <p className="text-xs text-pantri-muted">× 6 months</p>
      </div>
    </div>
  );
}
