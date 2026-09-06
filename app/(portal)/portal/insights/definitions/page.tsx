"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { EmployerEvents, trackPage } from "@/lib/analytics";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ErrorBanner, Spinner } from "@/components/ui/Feedback";

type Metric = {
  id: string;
  name: string;
  source: string;
  formula: string;
  notes?: string;
};

export default function InsightsDefinitionsPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [learning, setLearning] = useState<
    Array<{ id: string; title: string; body: string }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPage(EmployerEvents.ANALYTICS_VIEWED, { page: "definitions" });
    void (async () => {
      try {
        const data = await api.get<{
          metrics: Metric[];
          learningCenter: Array<{ id: string; title: string; body: string }>;
        }>("/employer/analytics/definitions");
        setMetrics(data.metrics);
        setLearning(data.learningCenter);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Failed to load definitions.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/portal/insights" className="text-sm text-emerald-700 hover:underline">
          ← Insights
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Metric definitions</h1>
      </div>
      {error && <ErrorBanner message={error} />}
      {loading ? (
        <Spinner label="Loading…" />
      ) : (
        <>
          <Card>
            <CardHeader title="Definitions" />
            <CardBody className="space-y-4">
              {metrics.map((m) => (
                <div key={m.id} className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-900">{m.name}</h3>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {m.source}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{m.formula}</p>
                </div>
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Learning center" />
            <CardBody className="space-y-4">
              {learning.map((item) => (
                <div key={item.id}>
                  <h3 className="font-medium text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.body}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
