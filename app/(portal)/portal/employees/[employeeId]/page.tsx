"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ErrorBanner, Spinner, SuccessBanner } from "@/components/ui/Feedback";
import { Field, Input, Select } from "@/components/ui/Input";
import { api, ApiError } from "@/lib/api";
import { formatDateTime, formatNaira } from "@/lib/format";
import type { EmployeeVerification, VerificationDocument } from "@/lib/types";

export default function EmployeeVerificationPage() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employee, setEmployee] = useState<EmployeeVerification | null>(null);
  const [type, setType] = useState<VerificationDocument["type"]>("EMPLOYMENT_PROOF");
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<"upload" | "submit" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setEmployee(await api.get<EmployeeVerification>(`/employer/verification/employees/${employeeId}`));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load employee.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { void load(); }, [employeeId]);

  async function upload(event: FormEvent) {
    event.preventDefault();
    if (!file) return;
    setBusy("upload");
    setError(null);
    const data = new FormData();
    data.append("file", file);
    data.append("employeeId", employeeId);
    data.append("type", type);
    if (note) data.append("note", note);
    try {
      await api.upload("/employer/verification/documents/upload", data);
      setSuccess("Verification document uploaded.");
      setFile(null);
      setNote("");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed.");
    } finally {
      setBusy(null);
    }
  }

  async function submit() {
    setBusy("submit");
    setError(null);
    try {
      await api.post(`/employer/verification/employees/${employeeId}/submit`);
      setSuccess("Documents submitted for admin review.");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Submission failed.");
    } finally {
      setBusy(null);
    }
  }

  if (loading && !employee) return <Spinner label="Loading employee…" />;
  if (!employee) return error ? <ErrorBanner message={error} /> : null;
  const editable = employee.verificationStatus === "REGISTERED" || employee.verificationStatus === "DOCS_SUBMITTED";
  const hasEmployment = employee.documents.some((document) => document.type === "EMPLOYMENT_PROOF");
  const hasPayroll = employee.documents.some((document) => document.type === "PAYROLL_PROOF");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/portal/employees" className="text-sm text-emerald-600">← Employees</Link>
        <div className="mt-1 flex items-center gap-3"><h1 className="text-2xl font-semibold text-slate-900">{employee.firstName} {employee.lastName}</h1><Badge>{employee.verificationStatus}</Badge></div>
        <p className="text-sm text-slate-500">{employee.email} · Salary {formatNaira(employee.salaryKobo)}</p>
      </div>
      {error ? <ErrorBanner message={error} /> : null}
      {success ? <SuccessBanner message={success} /> : null}
      {employee.rejectionReason ? <ErrorBanner message={`Rejected: ${employee.rejectionReason}`} /> : null}

      <Card>
        <CardHeader title="Employment and payroll evidence" subtitle="Both document types are required before submission." />
        <CardBody className="grid gap-3 sm:grid-cols-2">
          {employee.documents.map((document) => (
            <a key={document.id} href={document.fileUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 p-3 hover:border-emerald-300">
              <p className="font-medium text-slate-800">{document.type.replaceAll("_", " ")}</p>
              <p className="text-xs text-slate-500">{document.fileName} · {document.status} · {formatDateTime(document.createdAt)}</p>
            </a>
          ))}
          {!employee.documents.length ? <p className="text-sm text-slate-500">No documents uploaded.</p> : null}
        </CardBody>
      </Card>

      {editable ? (
        <Card>
          <CardHeader title="Upload proof" />
          <CardBody>
            <form onSubmit={upload} className="grid gap-3 md:grid-cols-4">
              <Field label="Document type"><Select value={type} onChange={(event) => setType(event.target.value as VerificationDocument["type"])}><option value="EMPLOYMENT_PROOF">Employment proof</option><option value="PAYROLL_PROOF">Payroll proof</option><option value="OTHER">Other</option></Select></Field>
              <Field label="File"><Input type="file" required onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></Field>
              <Field label="Note"><Input value={note} onChange={(event) => setNote(event.target.value)} /></Field>
              <div className="flex items-end"><Button type="submit" loading={busy === "upload"} disabled={!file}>Upload</Button></div>
            </form>
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <p className="text-xs text-slate-500">Employment: {hasEmployment ? "ready" : "missing"} · Payroll: {hasPayroll ? "ready" : "missing"}</p>
              <Button loading={busy === "submit"} disabled={!hasEmployment || !hasPayroll} onClick={submit}>Submit documents</Button>
            </div>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
