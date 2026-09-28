"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { EmployerEvents, trackPage } from "@/lib/analytics";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/Table";
import { ErrorBanner, Spinner } from "@/components/ui/Feedback";

type Row = { employeeId: string | null; lastActiveAt: string | null };

export default function InsightsEmployeesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPage(EmployerEvents.ANALYTICS_VIEWED, { page: "employees" });
    void (async () => {
      try {
        const data = await api.get<{
          behavioralNotice: string;
          recentlyActive: Row[];
        }>("/employer/analytics/employees/engagement");
        setRows(data.recentlyActive);
        setNotice(data.behavioralNotice);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Failed to load.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const columns: Column<Row>[] = [
    {
      header: "Employee ID",
      accessor: (r) => r.employeeId ?? "—",
    },
    {
      header: "Last active",
      accessor: (r) =>
        r.lastActiveAt ? new Date(r.lastActiveAt).toLocaleString() : "—",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Link href="/portal/insights" className="text-sm text-emerald-700 hover:underline">
          ← Insights
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Active employees</h1>
        <p className="mt-1 text-sm text-slate-500">
          Employees with qualifying app activity in the selected window.
        </p>
      </div>
      {notice && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {notice}
        </p>
      )}
      {error && <ErrorBanner message={error} />}
      {loading ? (
        <Spinner label="Loading…" />
      ) : (
        <Card>
          <CardHeader title="Recently active" />
          <CardBody>
            <DataTable columns={columns} rows={rows} keyFor={(r) => r.employeeId ?? Math.random().toString()} />
          </CardBody>
        </Card>
      )}
    </div>
  );
}
