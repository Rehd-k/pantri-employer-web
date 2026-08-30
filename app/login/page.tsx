"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { authErrorMessage } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";
import { ErrorBanner, Spinner } from "@/components/ui/Feedback";

type RoleTab = "employer" | "employee" | "admin";

const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL?.replace(/\/$/, "") || "http://localhost:3002";

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<RoleTab>("employer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/portal");
    }
  }, [loading, user, router]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(authErrorMessage(err, "Unable to sign in. Please try again."));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner label={user ? "Redirecting…" : "Checking session…"} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white"
          >
            P
          </Link>
          <h1 className="text-xl font-semibold text-slate-900">Sign in to Pantri</h1>
          <p className="text-sm text-slate-500">Choose how you use Pantri</p>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-white p-1">
          {(
            [
              { id: "employer" as const, label: "Employer" },
              { id: "employee" as const, label: "Employee" },
              { id: "admin" as const, label: "Admin" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTab(item.id);
                setError(null);
              }}
              className={`rounded-lg px-2 py-2 text-xs font-semibold sm:text-sm ${
                tab === item.id
                  ? "bg-emerald-600 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === "employer" ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              Employer portal for companies already onboarded by Pantri.
            </p>
            {error ? <ErrorBanner message={error} /> : null}
            <Field label="Work email">
              <Input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                required
                autoComplete="current-password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>
            <Button type="submit" loading={submitting} className="mt-2 w-full">
              Sign in
            </Button>
            <p className="text-center text-sm text-slate-500">
              New organisation?{" "}
              <Link
                href="/contact?topic=Employer%20enquiry"
                className="font-medium text-emerald-700"
              >
                Contact Pantri to get set up
              </Link>
            </p>
          </form>
        ) : null}

        {tab === "employee" ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Employees use the app</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Shopping, payment plans, and orders happen in the Pantri mobile app  there is no
              employee login on this website.
            </p>
            <Link
              href="/download"
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Download App
            </Link>
            <p className="mt-4 text-center text-sm text-slate-500">
              <Link href="/signup" className="font-medium text-emerald-700">
                How employee signup works
              </Link>
            </p>
          </div>
        ) : null}

        {tab === "admin" ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Platform admin</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Pantri platform administrators sign in on the admin portal. Organisation accounts are
              created by admins  employers cannot self-register here.
            </p>
            <a
              href={`${ADMIN_URL}/login`}
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Go to Admin Portal
            </a>
          </div>
        ) : null}

        <p className="mt-6 text-center text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-600">
            ← Back to Pantri
          </Link>
        </p>
      </div>
    </div>
  );
}
