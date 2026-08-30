"use client";

import { FormEvent, useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ErrorBanner, Spinner, SuccessBanner } from "@/components/ui/Feedback";
import { Field, Input } from "@/components/ui/Input";
import { DataTable, type Column } from "@/components/ui/Table";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDateTime } from "@/lib/format";
import type { EmployeeInvite } from "@/lib/types";

export default function InvitesPage() {
  const { user } = useAuth();
  const [invites, setInvites] = useState<EmployeeInvite[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [expiresInDays, setExpiresInDays] = useState("14");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setInvites(await api.get<EmployeeInvite[]>("/employer/invites"));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load invites.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { void load(); }, []);

  async function create(event: FormEvent) {
    event.preventDefault();
    setBusy("create");
    setError(null);
    try {
      await api.post("/employer/invites", {
        email,
        phone: phone || undefined,
        expiresInDays: Number(expiresInDays),
      });
      setEmail("");
      setPhone("");
      setSuccess("Personal invite created.");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create invite.");
    } finally {
      setBusy(null);
    }
  }

  async function revoke(id: string) {
    setBusy(id);
    setError(null);
    try {
      await api.patch(`/employer/invites/${id}/revoke`);
      setSuccess("Invite revoked.");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to revoke invite.");
    } finally {
      setBusy(null);
    }
  }

  const columns: Column<EmployeeInvite>[] = [
    { header: "Recipient", accessor: (invite) => <div><p>{invite.email}</p><p className="text-xs text-slate-400">{invite.phone ?? "No phone"}</p></div> },
    { header: "Invite code", accessor: (invite) => <span className="font-mono">{invite.code}</span> },
    { header: "Expires", accessor: (invite) => formatDateTime(invite.expiresAt) },
    { header: "Status", accessor: (invite) => <Badge>{invite.status}</Badge> },
    { header: "", accessor: (invite) => invite.status === "PENDING" ? <Button variant="danger" className="px-2 py-1 text-xs" loading={busy === invite.id} onClick={() => revoke(invite.id)}>Revoke</Button> : null },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div><h1 className="text-2xl font-semibold text-slate-900">Employee invites</h1><p className="mt-1 text-sm text-slate-500">Issue a unique, expiring invite to each employee.</p></div>
      {error ? <ErrorBanner message={error} /> : null}
      {success ? <SuccessBanner message={success} /> : null}
      <Card>
        <CardHeader title="Create personal invite" />
        <CardBody>
          <form onSubmit={create} className="grid gap-3 md:grid-cols-4">
            <Field label="Email"><Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></Field>
            <Field label="Phone"><Input value={phone} onChange={(event) => setPhone(event.target.value)} /></Field>
            <Field label="Expires in days"><Input type="number" min={1} max={90} required value={expiresInDays} onChange={(event) => setExpiresInDays(event.target.value)} /></Field>
            <div className="flex items-end"><Button type="submit" loading={busy === "create"}>Create invite</Button></div>
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Invites" />
        <CardBody className="p-0">{loading ? <Spinner label="Loading invites…" /> : <DataTable columns={columns} rows={invites} keyFor={(row) => row.id} emptyMessage="No personal invites yet." />}</CardBody>
      </Card>
      {user?.employerInviteCode ? <p className="text-xs text-slate-400">Legacy shared company code: <span className="font-mono">{user.employerInviteCode}</span></p> : null}
    </div>
  );
}
