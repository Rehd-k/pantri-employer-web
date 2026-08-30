"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ErrorBanner, Spinner } from "@/components/ui/Feedback";
import { DataTable, type Column } from "@/components/ui/Table";
import { api, ApiError } from "@/lib/api";
import { formatDate, formatNaira } from "@/lib/format";
import type { CompanyInvoice } from "@/lib/types";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<CompanyInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<CompanyInvoice[]>("/employer/invoices")
      .then(setInvoices)
      .catch((err: unknown) => setError(err instanceof ApiError ? err.message : "Failed to load invoices."))
      .finally(() => setLoading(false));
  }, []);

  const columns: Column<CompanyInvoice>[] = [
    { header: "Period", accessor: (invoice) => `${formatDate(invoice.periodStart)} – ${formatDate(invoice.periodEnd)}` },
    { header: "Status", accessor: (invoice) => <Badge>{invoice.status}</Badge> },
    { header: "Purchases", accessor: (invoice) => formatNaira(invoice.subtotalKobo) },
    { header: "Fees", accessor: (invoice) => formatNaira(invoice.feesKobo) },
    { header: "Interest", accessor: (invoice) => formatNaira(invoice.interestKobo) },
    { header: "Total due", accessor: (invoice) => <span className="font-medium">{formatNaira(invoice.totalDueKobo)}</span> },
    { header: "Remitted", accessor: (invoice) => formatNaira(invoice.remittedKobo) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div><h1 className="text-2xl font-semibold text-slate-900">Invoices</h1><p className="mt-1 text-sm text-slate-500">Issued company statements for fulfilled employee purchases, fees, and interest.</p></div>
      {error ? <ErrorBanner message={error} /> : null}
      <Card><CardHeader title="Company invoices" /><CardBody className="p-0">{loading ? <Spinner label="Loading invoices…" /> : <DataTable columns={columns} rows={invoices} keyFor={(row) => row.id} emptyMessage="No invoices have been issued." />}</CardBody></Card>
    </div>
  );
}
