"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import type { PayrollRun } from "@/lib/types";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/Table";
import { Field, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ErrorBanner, Spinner, SuccessBanner } from "@/components/ui/Feedback";
import { formatDate, formatDateTime } from "@/lib/format";

const TODAY = new Date().toISOString().slice(0, 10);

export default function PayrollPage() {
  const [runs, setRuns] = useState<PayrollRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [form, setForm] = useState({
    periodStart: TODAY,
    periodEnd: TODAY,
    payrollDate: TODAY,
  });

  async function loadRuns() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<PayrollRun[]>("/employer/payroll-runs");
      setRuns(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load payroll runs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRuns();
  }, []);

  async function handleGenerate(event: FormEvent) {
    event.preventDefault();
    setGenerating(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post<PayrollRun>("/employer/payroll-runs", {
        periodStart: new Date(form.periodStart).toISOString(),
        periodEnd: new Date(form.periodEnd).toISOString(),
        payrollDate: new Date(form.payrollDate).toISOString(),
      });
      setSuccess("Payroll run generated.");
      await loadRuns();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to generate payroll run.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleAction(id: string, action: "confirm" | "remit" | "mark-missed") {
    setBusyId(id);
    setError(null);
    setSuccess(null);
    try {
      if (action === "confirm") {
        await api.patch(`/employer/payroll-runs/${id}/confirm`);
        setSuccess("Payroll run confirmed.");
      } else if (action === "remit") {
        const result = await api.post<{ remittedCount: number; failedCount: number }>(
          `/employer/payroll-runs/${id}/remit`,
        );
        setSuccess(`Remitted ${result.remittedCount} deduction line(s), ${result.failedCount} failed.`);
      } else {
        const result = await api.patch<{ missedCount: number }>(`/employer/payroll-runs/${id}/mark-missed`);
        setSuccess(`Marked ${result.missedCount} overdue line(s) as missed.`);
      }
      await loadRuns();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Action failed.");
    } finally {
      setBusyId(null);
    }
  }

  const columns: Column<PayrollRun>[] = [
    {
      header: "Period",
      accessor: (run) => `${formatDate(run.periodStart)} → ${formatDate(run.periodEnd)}`,
    },
    { header: "Payroll date", accessor: (run) => formatDate(run.payrollDate) },
    { header: "Status", accessor: (run) => <Badge>{run.status}</Badge> },
    { header: "Updated", accessor: (run) => formatDateTime(run.updatedAt) },
    {
      header: "Actions",
      accessor: (run) => (
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/portal/payroll/${run.id}`} className="text-xs font-medium text-emerald-700 hover:underline">
            View lines
          </Link>
          {(run.status === "GENERATED" || run.status === "EMPLOYER_REVIEW") && (
            <Button
              variant="secondary"
              className="px-2 py-1 text-xs"
              loading={busyId === run.id}
              onClick={() => handleAction(run.id, "confirm")}
            >
              Confirm
            </Button>
          )}
          {run.status === "CONFIRMED" && (
            <Button
              variant="primary"
              className="px-2 py-1 text-xs"
              loading={busyId === run.id}
              onClick={() => handleAction(run.id, "remit")}
            >
              Remit
            </Button>
          )}
          {(run.status === "PROCESSING" || run.status === "PARTIALLY_COMPLETED") && (
            <Button
              variant="danger"
              className="px-2 py-1 text-xs"
              loading={busyId === run.id}
              onClick={() => handleAction(run.id, "mark-missed")}
            >
              Mark overdue missed
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Payroll Runs</h1>
        <p className="mt-1 text-sm text-slate-500">
          Generate a payroll cycle, confirm the deduction lines, then remit them against each
          employee&apos;s credit ledger.
        </p>
      </div>

      {error ? <ErrorBanner message={error} /> : null}
      {success ? <SuccessBanner message={success} /> : null}

      <Card>
        <CardHeader title="Generate a new run" subtitle="Creates one deduction line per active employee" />
        <CardBody>
          <form onSubmit={handleGenerate} className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-end">
            <Field label="Period start">
              <Input
                type="date"
                required
                value={form.periodStart}
                onChange={(e) => setForm((prev) => ({ ...prev, periodStart: e.target.value }))}
              />
            </Field>
            <Field label="Period end">
              <Input
                type="date"
                required
                value={form.periodEnd}
                onChange={(e) => setForm((prev) => ({ ...prev, periodEnd: e.target.value }))}
              />
            </Field>
            <Field label="Payroll date">
              <Input
                type="date"
                required
                value={form.payrollDate}
                onChange={(e) => setForm((prev) => ({ ...prev, payrollDate: e.target.value }))}
              />
            </Field>
            <Button type="submit" loading={generating}>
              Generate run
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Payroll history" />
        <CardBody className="p-0">
          {loading ? (
            <Spinner label="Loading payroll runs…" />
          ) : (
            <DataTable columns={columns} rows={runs} keyFor={(run) => run.id} emptyMessage="No payroll runs yet." />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
