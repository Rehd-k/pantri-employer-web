"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { EmployerEvents, trackPage } from "@/lib/analytics";
import { formatNaira } from "@/lib/format";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ErrorBanner, Spinner } from "@/components/ui/Feedback";

type Overview = {
  collectionStartedAt: string | null;
  behavioralNotice: string;
  business: {
    revenueKobo: number;
    orderCount: number;
    aovKobo: number;
    employeeCount: number;
    repeatPurchasers: number;
    credit: {
      outstandingKobo: number;
      limitKobo: number;
      utilization: number | null;
    };
    payroll: {
      expectedKobo: number;
      collectedKobo: number;
      collectionRate: number | null;
    };
  };
  behavioral: {
    activeUsers: number;
  };
};

type Funnel = {
  stages: Array<{
    key: string;
    uniqueActors: number;
    conversionFromPrevious: number | null;
  }>;
};

type Engagement = {
  dau: number;
  wau: number;
  mau: number;
  sessions: number;
  recentlyActive: Array<{ employeeId: string | null; lastActiveAt: string | null }>;
};

export default function InsightsOverviewPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [engagement, setEngagement] = useState<Engagement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPage(EmployerEvents.ANALYTICS_VIEWED, { page: "overview" });
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [o, f, e] = await Promise.all([
          api.get<Overview>("/employer/analytics/overview"),
          api.get<Funnel>("/employer/analytics/funnels"),
          api.get<Engagement>("/employer/analytics/employees/engagement"),
        ]);
        if (!cancelled) {
          setOverview(o);
          setFunnel(f);
          setEngagement(e);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "Failed to load insights.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner label="Loading insights…" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Insights</h1>
          <p className="mt-1 text-sm text-slate-500">
            Workforce activity and payroll-credit performance for your company.
          </p>
        </div>
        <div className="flex gap-3 text-sm">
          <Link className="text-emerald-700 hover:underline" href="/portal/insights/employees">
            Employees
          </Link>
          <Link className="text-emerald-700 hover:underline" href="/portal/insights/definitions">
            Definitions
          </Link>
        </div>
      </div>

      {error && <ErrorBanner message={error} />}

      {overview?.behavioralNotice && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {overview.behavioralNotice}
        </p>
      )}

      {overview && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Revenue (period)" value={formatNaira(overview.business.revenueKobo)} />
          <StatCard label="Orders" value={String(overview.business.orderCount)} />
          <StatCard label="AOV" value={formatNaira(overview.business.aovKobo)} />
          <StatCard
            label="Active employees"
            value={String(overview.behavioral.activeUsers)}
          />
          <StatCard
            label="Credit outstanding"
            value={formatNaira(overview.business.credit.outstandingKobo)}
          />
          <StatCard
            label="Payroll collected"
            value={formatNaira(overview.business.payroll.collectedKobo)}
          />
          <StatCard
            label="Repeat purchasers"
            value={String(overview.business.repeatPurchasers)}
          />
          <StatCard label="Employees" value={String(overview.business.employeeCount)} />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Purchase funnel" subtitle="Behavioral · unique employees" />
          <CardBody>
            <ul className="space-y-2 text-sm">
              {(funnel?.stages ?? []).map((s) => (
                <li key={s.key} className="flex justify-between border-b border-slate-100 py-2">
                  <span className="capitalize text-slate-600">{s.key.replaceAll("_", " ")}</span>
                  <span className="font-medium text-slate-900">
                    {s.uniqueActors}
                    {s.conversionFromPrevious != null
                      ? ` · ${(s.conversionFromPrevious * 100).toFixed(0)}%`
                      : ""}
                  </span>
                </li>
              ))}
              {(funnel?.stages?.length ?? 0) === 0 && (
                <li className="text-slate-500">No behavioral funnel data yet.</li>
              )}
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Engagement" subtitle="DAU / WAU / MAU" />
          <CardBody>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-2xl font-semibold">{engagement?.dau ?? 0}</div>
                <div className="text-xs text-slate-500">DAU</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">{engagement?.wau ?? 0}</div>
                <div className="text-xs text-slate-500">WAU</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">{engagement?.mau ?? 0}</div>
                <div className="text-xs text-slate-500">MAU</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Sessions in range: {engagement?.sessions ?? 0}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
