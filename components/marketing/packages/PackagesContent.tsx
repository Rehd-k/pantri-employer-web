"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PackageCardFromApi } from "../Cards";
import { Container, CTAButton, Section, SectionHeading, TrustBadge } from "../primitives";
import { ScrollReveal } from "../ScrollReveal";
import { publicApi, PublicApiError } from "@/lib/public-api";
import type { PublicPackageListItem } from "@/lib/marketing";

export function PackagesContent() {
  const [packages, setPackages] = useState<PublicPackageListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await publicApi.get<PublicPackageListItem[]>("/public/packages");
        if (!cancelled) setPackages(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof PublicApiError
              ? err.message
              : "Could not load packages. Please try again.",
          );
          setPackages([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-12 sm:pt-16">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Built around real life.
              </h1>
              <p className="mt-4 text-lg text-pantri-muted">
                Household-sized food packages with live pricing  Bachelor, Couple, Family, and
                more. Order in the Pantri app with payroll payment plans.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section className="pt-0!">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Packages"
            title="Curated for your household"
            description="Each package includes a clear item list and payroll-friendly payment examples."
          />
        </ScrollReveal>

        {error ? (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/40">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            <button
              type="button"
              onClick={() => setReloadKey((k) => k + 1)}
              className="mt-3 text-sm font-semibold text-pantri-accent hover:underline"
            >
              Retry
            </button>
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-52 animate-pulse rounded-2xl border border-pantri-border bg-pantri-surface"
              />
            ))}
          </div>
        ) : packages.length === 0 && !error ? (
          <div className="pantri-card p-10 text-center">
            <p className="text-base font-semibold text-pantri-foreground">Packages coming soon</p>
            <p className="mt-2 text-sm text-pantri-muted">
              In the meantime, browse individual groceries in the shop.
            </p>
            <div className="mt-6">
              <CTAButton href="/shop">Browse shop</CTAButton>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <ScrollReveal key={pkg.id}>
                <PackageCardFromApi pkg={pkg} />
              </ScrollReveal>
            ))}
            <ScrollReveal>
              <Link
                href="/shop"
                className="pantri-card group relative flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-pantri-foreground">Custom</h3>
                <p className="mt-2 flex-1 text-sm text-pantri-muted">
                  Build your own basket from the Pantri marketplace. Pick exactly what you need.
                </p>
                <span className="mt-4 text-sm font-semibold text-pantri-accent">
                  Browse shop →
                </span>
              </Link>
            </ScrollReveal>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-pantri-border bg-pantri-surface-muted p-6 text-center sm:p-8">
          <p className="text-sm leading-relaxed text-pantri-muted">
            Spend thresholds can unlock package discounts.{" "}
            <Link href="/pricing" className="font-semibold text-pantri-accent hover:underline">
              See pricing & payment plans
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
