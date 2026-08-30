"use client";

import { useEffect, useMemo, useState } from "react";
import { api, ApiError } from "@/lib/api";
import type { EmployerEmployee, EmployerOrder, OrderFulfillmentStatus } from "@/lib/types";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { ErrorBanner, Spinner, SuccessBanner } from "@/components/ui/Feedback";
import { formatDateTime, formatNaira } from "@/lib/format";

const STATUS_FILTERS: { label: string; value: OrderFulfillmentStatus | "" }[] = [
  { label: "Pending approval", value: "PENDING_APPROVAL" },
  { label: "All orders", value: "" },
  { label: "Approved", value: "APPROVED" },
  { label: "Fulfilled", value: "FULFILLED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const CANCELLABLE: OrderFulfillmentStatus[] = [
  "DRAFT",
  "PENDING_APPROVAL",
  "APPROVED",
  "PROCESSING",
  "READY_FOR_PICKUP",
  "OUT_FOR_DELIVERY",
];

type Action = "approve" | "reject" | "cancel";

const TRANSITIONS: Partial<
  Record<OrderFulfillmentStatus, Array<{ status: OrderFulfillmentStatus; label: string }>>
> = {
  APPROVED: [{ status: "PROCESSING", label: "Start sourcing" }],
  PROCESSING: [
    { status: "OUT_FOR_DELIVERY", label: "In transit" },
    { status: "READY_FOR_PICKUP", label: "Waiting pickup" },
  ],
  OUT_FOR_DELIVERY: [
    { status: "READY_FOR_PICKUP", label: "Waiting pickup" },
    { status: "FULFILLED", label: "Delivered" },
  ],
  READY_FOR_PICKUP: [{ status: "FULFILLED", label: "Delivered" }],
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<EmployerOrder[]>([]);
  const [employees, setEmployees] = useState<EmployerEmployee[]>([]);
  const [status, setStatus] = useState<OrderFulfillmentStatus | "">("PENDING_APPROVAL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const employeeById = useMemo(() => {
    const map = new Map<string, EmployerEmployee>();
    for (const employee of employees) map.set(employee.id, employee);
    return map;
  }, [employees]);

  async function loadOrders(currentStatus: OrderFulfillmentStatus | "") {
    setLoading(true);
    setError(null);
    try {
      const query = currentStatus ? `?status=${currentStatus}` : "";
      const [orderData, employeeData] = await Promise.all([
        api.get<EmployerOrder[]>(`/employer/orders${query}`),
        employees.length ? Promise.resolve(employees) : api.get<EmployerEmployee[]>("/employer/credit/employees"),
      ]);
      setOrders(orderData);
      if (!employees.length) setEmployees(employeeData);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function handleAction(id: string, action: Action) {
    setBusyId(id);
    setError(null);
    setSuccess(null);
    const labels: Record<Action, string> = {
      approve: "approved",
      reject: "rejected",
      cancel: "cancelled",
    };
    try {
      await api.post(`/employer/orders/${id}/${action}`);
      setSuccess(`Order ${labels[action]}.`);
      await loadOrders(status);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Action failed.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleTransition(id: string, nextStatus: OrderFulfillmentStatus) {
    setBusyId(id);
    setError(null);
    setSuccess(null);
    try {
      await api.post(`/employer/orders/${id}/transition`, { status: nextStatus });
      setSuccess(`Order moved to ${nextStatus.replaceAll("_", " ").toLowerCase()}.`);
      await loadOrders(status);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Transition failed.");
    } finally {
      setBusyId(null);
    }
  }

  const columns: Column<EmployerOrder>[] = [
    {
      header: "Employee",
      accessor: (order) => {
        const employee = employeeById.get(order.employeeId);
        return (
          <div>
            <p className="font-medium text-slate-900">
              {employee ? `${employee.firstName} ${employee.lastName}` : order.employeeId}
            </p>
            {employee ? <p className="text-xs text-slate-400">{employee.email}</p> : null}
          </div>
        );
      },
    },
    {
      header: "Items",
      accessor: (order) => (
        <span className="text-xs text-slate-500">
          {order.items.map((item) => `${item.quantity}× ${item.name}`).join(", ") || ""}
        </span>
      ),
    },
    { header: "Total", accessor: (order) => formatNaira(order.totalKobo) },
    { header: "Reserved", accessor: (order) => formatNaira(order.reservedKobo) },
    { header: "Fulfillment", accessor: (order) => <Badge>{order.fulfillmentStatus}</Badge> },
    { header: "Credit", accessor: (order) => <Badge>{order.creditStatus}</Badge> },
    { header: "Placed", accessor: (order) => formatDateTime(order.createdAt) },
    {
      header: "Actions",
      accessor: (order) => {
        const actions: Action[] = [];
        if (order.fulfillmentStatus === "PENDING_APPROVAL") actions.push("approve", "reject");
        if (CANCELLABLE.includes(order.fulfillmentStatus)) actions.push("cancel");
        const transitions = TRANSITIONS[order.fulfillmentStatus] ?? [];

        if (actions.length === 0 && transitions.length === 0) {
          return <span className="text-xs text-slate-400">No action available</span>;
        }

        return (
          <div className="flex flex-wrap gap-2">
            {actions.map((action) => (
              <Button
                key={action}
                variant={action === "reject" || action === "cancel" ? "danger" : "primary"}
                className="px-2 py-1 text-xs"
                loading={busyId === order.id}
                onClick={() => handleAction(order.id, action)}
              >
                {action === "approve" && "Approve"}
                {action === "reject" && "Reject"}
                {action === "cancel" && "Cancel"}
              </Button>
            ))}
            {transitions.map((transition) => (
              <Button
                key={transition.status}
                variant="secondary"
                className="px-2 py-1 text-xs"
                loading={busyId === order.id}
                onClick={() => handleTransition(order.id, transition.status)}
              >
                {transition.label}
              </Button>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Order Approvals</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review orders routed to employer approval by the credit policy, then approve, reject,
            fulfill, or cancel them as they move through the credit reservation lifecycle.
          </p>
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value as OrderFulfillmentStatus | "")}>
          {STATUS_FILTERS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      {error ? <ErrorBanner message={error} /> : null}
      {success ? <SuccessBanner message={success} /> : null}

      <Card>
        <CardHeader title="Orders" subtitle="Orders placed by your employees against their credit line" />
        <CardBody className="p-0">
          {loading ? (
            <Spinner label="Loading orders…" />
          ) : (
            <DataTable
              columns={columns}
              rows={orders}
              keyFor={(order) => order.id}
              emptyMessage="No orders match this filter."
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
