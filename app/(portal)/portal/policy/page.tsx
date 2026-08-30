"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { api, ApiError } from "@/lib/api";
import type { CreditPolicy, UpdateCreditPolicyInput } from "@/lib/types";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Field, Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorBanner, Spinner, SuccessBanner } from "@/components/ui/Feedback";
import { formatDateTime } from "@/lib/format";

export default function PolicyPage() {
  const [policy, setPolicy] = useState<CreditPolicy | null>(null);
  const [form, setForm] = useState<UpdateCreditPolicyInput>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get<CreditPolicy>("/employer/credit/policy");
        if (!cancelled) {
          setPolicy(data);
          setForm(data);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Failed to load policy.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function updateField<K extends keyof UpdateCreditPolicyInput>(key: K, value: UpdateCreditPolicyInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = await api.patch<CreditPolicy>("/employer/credit/policy", form);
      setPolicy(updated);
      setForm(updated);
      setSuccess("Credit policy updated successfully.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update policy.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Spinner label="Loading credit policy…" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Credit Policy</h1>
        <p className="mt-1 text-sm text-slate-500">
          Configure how much credit your employees can draw, and the guardrails around it.
          {policy ? ` Version ${policy.version} · last updated ${formatDateTime(policy.updatedAt)}.` : ""}
        </p>
      </div>

      {error ? <ErrorBanner message={error} /> : null}
      {success ? <SuccessBanner message={success} /> : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Card>
          <CardHeader title="Deduction settings" subtitle="Payroll deduction percentage bounds" />
          <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Default deduction %">
              <Input
                type="number"
                min={0}
                max={100}
                value={form.defaultDeductionPercent ?? 0}
                onChange={(e) => updateField("defaultDeductionPercent", Number(e.target.value))}
              />
            </Field>
            <Field label="Minimum deduction %">
              <Input
                type="number"
                min={0}
                max={100}
                value={form.minDeductionPercent ?? 0}
                onChange={(e) => updateField("minDeductionPercent", Number(e.target.value))}
              />
            </Field>
            <Field label="Maximum deduction %">
              <Input
                type="number"
                min={0}
                max={100}
                value={form.maxDeductionPercent ?? 0}
                onChange={(e) => updateField("maxDeductionPercent", Number(e.target.value))}
              />
            </Field>
            <Field label="Employees may set their own %" className="sm:col-span-3">
              <Select
                value={form.employeeMaySetDeductionPercent ? "true" : "false"}
                onChange={(e) => updateField("employeeMaySetDeductionPercent", e.target.value === "true")}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </Field>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Credit limit & repayment" subtitle="How much credit and over how long" />
          <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Credit multiplier (bps)" hint="15000 = 1.5x monthly salary">
              <Input
                type="number"
                min={0}
                value={form.creditMultiplierBps ?? 0}
                onChange={(e) => updateField("creditMultiplierBps", Number(e.target.value))}
              />
            </Field>
            <Field label="Max repayment months">
              <Input
                type="number"
                min={1}
                value={form.maxRepaymentMonths ?? 1}
                onChange={(e) => updateField("maxRepaymentMonths", Number(e.target.value))}
              />
            </Field>
            <Field label="Reservation TTL (hours)">
              <Input
                type="number"
                min={1}
                value={form.reservationTtlHours ?? 1}
                onChange={(e) => updateField("reservationTtlHours", Number(e.target.value))}
              />
            </Field>
            <Field label="Approval TTL (hours)">
              <Input
                type="number"
                min={1}
                value={form.approvalTtlHours ?? 1}
                onChange={(e) => updateField("approvalTtlHours", Number(e.target.value))}
              />
            </Field>
            <Field label="Interest APR (bps)" hint="1800 = 18% annual">
              <Input
                type="number"
                min={0}
                value={form.interestAnnualRateBps ?? 0}
                onChange={(e) => updateField("interestAnnualRateBps", Number(e.target.value))}
              />
            </Field>
            <Field label="Interest grace period (days)">
              <Input
                type="number"
                min={0}
                value={form.interestGraceDays ?? 0}
                onChange={(e) => updateField("interestGraceDays", Number(e.target.value))}
              />
            </Field>
            <Field label="Penalties enabled">
              <Select
                value={form.penaltiesEnabled ? "true" : "false"}
                onChange={(e) => updateField("penaltiesEnabled", e.target.value === "true")}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </Select>
            </Field>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Purchase frequency & risk" subtitle="Abuse prevention and approval routing" />
          <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Min days between purchases">
              <Input
                type="number"
                min={0}
                value={form.minDaysBetweenPurchases ?? 0}
                onChange={(e) => updateField("minDaysBetweenPurchases", Number(e.target.value))}
              />
            </Field>
            <Field label="Max purchases in window">
              <Input
                type="number"
                min={1}
                value={form.maxPurchasesInWindow ?? 1}
                onChange={(e) => updateField("maxPurchasesInWindow", Number(e.target.value))}
              />
            </Field>
            <Field label="Purchase window (days)">
              <Input
                type="number"
                min={1}
                value={form.purchaseWindowDays ?? 1}
                onChange={(e) => updateField("purchaseWindowDays", Number(e.target.value))}
              />
            </Field>
            <Field label="Require prior deduction after first purchase" className="sm:col-span-3">
              <Select
                value={form.requirePriorDeductionAfterFirst ? "true" : "false"}
                onChange={(e) => updateField("requirePriorDeductionAfterFirst", e.target.value === "true")}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </Field>
            <Field label="Over-limit action">
              <Select
                value={form.overLimitAction ?? "REJECT"}
                onChange={(e) => updateField("overLimitAction", e.target.value as CreditPolicy["overLimitAction"])}
              >
                <option value="REJECT">Reject</option>
                <option value="REQUIRE_APPROVAL">Require approval</option>
              </Select>
            </Field>
            <Field label="Over-duration action">
              <Select
                value={form.overDurationAction ?? "REJECT"}
                onChange={(e) =>
                  updateField("overDurationAction", e.target.value as CreditPolicy["overDurationAction"])
                }
              >
                <option value="REJECT">Reject</option>
                <option value="REQUIRE_APPROVAL">Require approval</option>
                <option value="SUGGEST_WAIT">Suggest wait</option>
                <option value="ALLOW_HIGHER_DEDUCTION">Allow higher deduction</option>
              </Select>
            </Field>
            <Field label="Approval threshold (₦)" hint="Orders above this always need approval">
              <Input
                type="number"
                min={0}
                value={form.approvalThresholdKobo ? form.approvalThresholdKobo / 100 : ""}
                onChange={(e) =>
                  updateField(
                    "approvalThresholdKobo",
                    e.target.value ? Math.round(Number(e.target.value) * 100) : null,
                  )
                }
              />
            </Field>
            <Field label="Require approval on first purchase">
              <Select
                value={form.requireApprovalFirstPurchase ? "true" : "false"}
                onChange={(e) => updateField("requireApprovalFirstPurchase", e.target.value === "true")}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </Select>
            </Field>
            <Field label="Require approval for high risk">
              <Select
                value={form.requireApprovalHighRisk ? "true" : "false"}
                onChange={(e) => updateField("requireApprovalHighRisk", e.target.value === "true")}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </Field>
            <Field label="High risk score threshold">
              <Input
                type="number"
                min={0}
                max={100}
                value={form.highRiskScoreThreshold ?? 0}
                onChange={(e) => updateField("highRiskScoreThreshold", Number(e.target.value))}
              />
            </Field>
            <Field label="Consecutive misses before freeze">
              <Input
                type="number"
                min={1}
                value={form.consecutiveMissesBeforeFreeze ?? 1}
                onChange={(e) => updateField("consecutiveMissesBeforeFreeze", Number(e.target.value))}
              />
            </Field>
          </CardBody>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" loading={saving}>
            Save policy changes
          </Button>
        </div>
      </form>
    </div>
  );
}
