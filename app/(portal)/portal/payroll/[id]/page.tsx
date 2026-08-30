"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import type { PayrollRunDetail } from "@/lib/types";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { ErrorBanner, Spinner } from "@/components/ui/Feedback";
import { formatDate, formatNaira } from "@/lib/format";

export default function PayrollRunDetailPage() {
  const params = useParams<{ id: string }>();
  const [run, setRun] = useState<PayrollRunDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get<PayrollRunDetail>(`/employer/payroll-runs/${params.id}`);
        if (!cancelled) setRun(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Failed to load payroll run.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const columns: Column<PayrollRunDetail["lines"][number]>[] = [
    { header: "Employee", accessor: (line) => line.employeeId },
    { header: "Salary snapshot", accessor: (line) => formatNaira(line.salarySnapshotKobo) },
    { header: "Deduction %", accessor: (line) => `${line.deductionPercentSnapshot}%` },
    { header: "Requested", accessor: (line) => formatNaira(line.requestedKobo) },
    { header: "Collected", accessor: (line) => formatNaira(line.collectedKobo) },
    { header: "Status", accessor: (line) => <Badge>{line.status}</Badge> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/portal/payroll" className="text-xs font-medium text-emerald-700 hover:underline">
          ← Back to payroll runs
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Payroll Run Detail</h1>
        {run ? (
          <p className="mt-1 text-sm text-slate-500">
            {formatDate(run.periodStart)} → {formatDate(run.periodEnd)} · Payroll date{" "}
            {formatDate(run.payrollDate)}
          </p>
        ) : null}
      </div>

      {error ? <ErrorBanner message={error} /> : null}

      {loading ? (
        <Spinner label="Loading run detail…" />
      ) : run ? (
        <Card>
          <CardHeader
            title="Deduction lines"
            subtitle={`Status: ${run.status}`}
            action={<Badge>{run.status}</Badge>}
          />
          <CardBody className="p-0">
            <DataTable
              columns={columns}
              rows={run.lines}
              keyFor={(line) => line.id}
              emptyMessage="No deduction lines on this run."
            />
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
