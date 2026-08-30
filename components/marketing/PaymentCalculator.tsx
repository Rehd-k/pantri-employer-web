"use client";

import { useMemo, useState } from "react";
import { formatNaira } from "@/lib/format";
import {
  calculatePayment,
  nairaToKobo,
  PAYMENT_PLANS,
  type PaymentPlanId,
} from "@/lib/marketing";

export function PaymentCalculator({
  defaultPackageNaira = 300_000,
}: {
  defaultPackageNaira?: number;
} = {}) {
  const [salaryNaira, setSalaryNaira] = useState(500_000);
  const [packageNaira, setPackageNaira] = useState(defaultPackageNaira);
  const [planId, setPlanId] = useState<PaymentPlanId>("20_6");

  const plan = PAYMENT_PLANS.find((p) => p.id === planId) ?? PAYMENT_PLANS[0];

  const result = useMemo(
    () => calculatePayment(nairaToKobo(packageNaira), plan),
    [packageNaira, plan],
  );

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
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-pantri-muted">
            Food package value (₦)
          </span>
          <input
            type="number"
            min={0}
            step={10000}
            value={packageNaira}
            onChange={(e) => setPackageNaira(Number(e.target.value) || 0)}
            className="pantri-input"
          />
        </label>
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

      <div className="mt-8 grid gap-4 rounded-xl bg-pantri-surface-muted p-5 sm:grid-cols-2 lg:grid-cols-4">
        <ResultItem label="Package value" value={formatNaira(result.packageKobo)} />
        <ResultItem label="Initial payment" value={formatNaira(result.initialKobo)} highlight />
        <ResultItem label="Monthly deduction" value={formatNaira(result.monthlyKobo)} highlight />
        <ResultItem label="Duration" value={`${result.months} months`} />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-pantri-muted">
        Eligibility and available limits depend on your employer and payroll arrangement.
        Salary is shown for context only and does not guarantee approval.
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
  return (
    <div className="pantri-card flex flex-col items-center gap-3 bg-pantri-surface/90 p-6 shadow-lg backdrop-blur-sm">
      <div className="text-center">
        <p className="text-sm font-medium text-pantri-muted">Food package</p>
        <p className="text-2xl font-bold text-pantri-foreground">₦300,000</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-pantri-accent">
          Today
        </p>
      </div>
      <div className="flex flex-col items-center gap-1 text-pantri-muted">
        <span className="text-2xl">↓</span>
      </div>
      <div className="grid w-full grid-cols-2 gap-3">
        <div className="rounded-xl bg-pantri-primary/10 p-4 text-center">
          <p className="text-xs text-pantri-muted">Initial payment</p>
          <p className="text-lg font-bold text-pantri-primary">₦60,000</p>
        </div>
        <div className="rounded-xl bg-pantri-accent/10 p-4 text-center">
          <p className="text-xs text-pantri-muted">Monthly</p>
          <p className="text-lg font-bold text-pantri-accent">₦40,000</p>
          <p className="text-xs text-pantri-muted">× 6 months</p>
        </div>
      </div>
    </div>
  );
}
