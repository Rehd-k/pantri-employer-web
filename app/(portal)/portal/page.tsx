"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import { EmployerEvents, trackPage } from "@/lib/analytics";
import { formatNaira } from "@/lib/format";
import { useAuth } from "@/lib/auth";
import type { EmployerBalanceSummary, EmployerExposureBreakdown } from "@/lib/types";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { ErrorBanner, Spinner } from "@/components/ui/Feedback";

export default function DashboardPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<EmployerBalanceSummary | null>(null);
  const [exposure, setExposure] = useState<EmployerExposureBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPage(EmployerEvents.DASHBOARD_VIEWED);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [summaryRes, exposureRes] = await Promise.all([
          api.get<EmployerBalanceSummary>("/employers/me/reporting/balance-summary"),
          api.get<EmployerExposureBreakdown>("/employers/me/reporting/exposure"),
        ]);
        if (!cancelled) {
          setSummary(summaryRes);
          setExposure(exposureRes);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "Failed to load reporting data.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const columns: Column<EmployerExposureBreakdown["employees"][number]>[] = [
    { header: "Employee", accessor: (row) => row.employeeId },
    { header: "Salary", accessor: (row) => formatNaira(row.salaryKobo) },
    { header: "Limit", accessor: (row) => formatNaira(row.creditLimitKobo) },
    { header: "Exposure", accessor: (row) => formatNaira(row.exposureKobo) },
    { header: "Reserved", accessor: (row) => formatNaira(row.reservedKobo) },
    { header: "Available", accessor: (row) => formatNaira(row.availableKobo) },
    {
      header: "Utilization",
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${row.utilizationPercent >= 90 ? "bg-red-500" : row.utilizationPercent >= 60 ? "bg-amber-500" : "bg-emerald-500"}`}
              style={{ width: `${Math.min(100, row.utilizationPercent)}%` }}
            />
          </div>
          <span className="text-xs text-slate-500">{row.utilizationPercent}%</span>
        </div>
      ),
    },
    { header: "Status", accessor: (row) => <Badge>{row.status}</Badge> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Exposure Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Live view of your team&apos;s payroll-backed credit exposure.
        </p>
      </div>

      {error ? <ErrorBanner message={error} /> : null}
      <Card>
        <CardHeader
          title="Invite an employee"
          subtitle="Create a unique, expiring invite for each person."
          action={<Link href="/portal/invites" className="rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white">Manage invites</Link>}
        />
        {user?.employerInviteCode ? <CardBody><p className="text-xs text-slate-400">Legacy shared code: <span className="font-mono">{user.employerInviteCode}</span></p></CardBody> : null}
      </Card>

      {loading ? (
        <Spinner label="Loading dashboard…" />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total exposure"
              value={formatNaira(summary?.totalExposureKobo)}
              hint="Principal + interest + fees + penalties"
              tone="danger"
            />
            <StatCard
              label="Outstanding principal"
              value={formatNaira(summary?.totalPrincipalOutstandingKobo)}
            />
            <StatCard label="Reserved (in-flight orders)" value={formatNaira(summary?.totalReservedKobo)} />
            <StatCard
              label="Available headroom"
              value={formatNaira(summary?.totalAvailableKobo)}
              tone="success"
            />
            <StatCard label="Total credit limit" value={formatNaira(summary?.totalCreditLimitKobo)} />
            <StatCard label="Posted interest" value={formatNaira(summary?.totalPostedInterestKobo)} />
            <StatCard label="Posted fees" value={formatNaira(summary?.totalPostedFeesKobo)} />
            <StatCard
              label="Active accounts"
              value={`${summary?.activeAccounts ?? 0} / ${summary?.totalAccounts ?? 0}`}
            />
          </div>

          <Card>
            <CardHeader
              title="Exposure by employee"
              subtitle="Sorted by highest outstanding exposure"
            />
            <CardBody className="p-0">
              <DataTable
                columns={columns}
                rows={exposure?.employees ?? []}
                keyFor={(row) => row.employeeId}
                emptyMessage="No employees have drawn credit yet."
              />
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
