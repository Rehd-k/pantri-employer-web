"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import { EmployerEvents, trackPage } from "@/lib/analytics";
import type { EmployerEmployee } from "@/lib/types";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ErrorBanner, Spinner, SuccessBanner } from "@/components/ui/Feedback";
import { formatNaira } from "@/lib/format";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployerEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function loadEmployees() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<EmployerEmployee[]>("/employer/credit/employees");
      setEmployees(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load employees.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    trackPage(EmployerEvents.EMPLOYEE_LIST_VIEWED);
    loadEmployees();
  }, []);

  async function handleToggleFreeze(employee: EmployerEmployee) {
    const isFrozen = employee.creditAccount?.status === "FROZEN";
    setBusyId(employee.id);
    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/employer/credit/employees/${employee.id}/${isFrozen ? "unfreeze" : "freeze"}`);
      setSuccess(`${employee.firstName} ${employee.lastName}'s credit account ${isFrozen ? "unfrozen" : "frozen"}.`);
      await loadEmployees();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Action failed.");
    } finally {
      setBusyId(null);
    }
  }

  const columns: Column<EmployerEmployee>[] = [
    {
      header: "Employee",
      accessor: (employee) => (
        <div>
          <Link href={`/portal/employees/${employee.id}`} className="font-medium text-emerald-700">
            {employee.firstName} {employee.lastName}
          </Link>
          <p className="text-xs text-slate-400">{employee.email}</p>
        </div>
      ),
    },
    { header: "Salary", accessor: (employee) => formatNaira(employee.salaryKobo) },
    { header: "Deduction %", accessor: (employee) => `${employee.deductionPercent}%` },
    {
      header: "Credit limit",
      accessor: (employee) => formatNaira(employee.creditAccount?.effectiveLimitKobo ?? 0),
    },
    {
      header: "Outstanding",
      accessor: (employee) => formatNaira(employee.creditAccount?.totalOwedKobo ?? 0),
    },
    {
      header: "Available",
      accessor: (employee) => formatNaira(employee.creditAccount?.availableKobo ?? 0),
    },
    {
      header: "Account status",
      accessor: (employee) => <Badge>{employee.creditAccount?.status ?? "NO ACCOUNT"}</Badge>,
    },
    {
      header: "Actions",
      accessor: (employee) => (
        <Button
          variant={employee.creditAccount?.status === "FROZEN" ? "primary" : "danger"}
          className="px-2 py-1 text-xs"
          loading={busyId === employee.id}
          disabled={!employee.creditAccount}
          onClick={() => handleToggleFreeze(employee)}
        >
          {employee.creditAccount?.status === "FROZEN" ? "Unfreeze" : "Freeze"}
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Employees</h1>
        <p className="mt-1 text-sm text-slate-500">
          Freeze an employee&apos;s credit account to immediately stop new draws while you
          investigate, or unfreeze once resolved.
        </p>
      </div>

      {error ? <ErrorBanner message={error} /> : null}
      {success ? <SuccessBanner message={success} /> : null}

      <Card>
        <CardHeader title="Team roster" subtitle={`${employees.length} employee(s) on payroll`} />
        <CardBody className="p-0">
          {loading ? (
            <Spinner label="Loading employees…" />
          ) : (
            <DataTable
              columns={columns}
              rows={employees}
              keyFor={(employee) => employee.id}
              emptyMessage="No employees have been onboarded yet."
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
