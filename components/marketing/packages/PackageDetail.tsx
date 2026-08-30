"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatNaira } from "@/lib/format";
import type { PublicPackageDetail } from "@/lib/marketing";
import { publicApi, PublicApiError } from "@/lib/public-api";
import { PaymentCalculator } from "../PaymentCalculator";
import { Container, CTAButton, Section } from "../primitives";
import { ScrollReveal } from "../ScrollReveal";

export function PackageDetail({ packageId }: { packageId: string }) {
  const [pkg, setPkg] = useState<PublicPackageDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);
      try {
        const data = await publicApi.get<PublicPackageDetail>(`/public/packages/${packageId}`);
        if (!cancelled) setPkg(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof PublicApiError && err.status === 404) {
          setNotFound(true);
          setPkg(null);
        } else {
          setError(
            err instanceof PublicApiError
              ? err.message
              : "Could not load this package. Please try again.",
          );
          setPkg(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [packageId, reloadKey]);

  if (loading) {
    return (
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-4/3 animate-pulse rounded-2xl bg-pantri-surface-muted" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-pantri-surface-muted" />
            <div className="h-32 w-full animate-pulse rounded bg-pantri-surface-muted" />
          </div>
        </div>
      </Section>
    );
  }

  if (notFound) {
    return (
      <Section>
        <div className="pantri-card mx-auto max-w-lg p-10 text-center">
          <h1 className="text-2xl font-bold text-pantri-foreground">Package not found</h1>
          <p className="mt-3 text-sm text-pantri-muted">
            This package may have been removed or is no longer available.
          </p>
          <div className="mt-6">
            <CTAButton href="/packages">Back to packages</CTAButton>
          </div>
        </div>
      </Section>
    );
  }

  if (error || !pkg) {
    return (
      <Section>
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/40">
          <p className="text-sm text-red-800 dark:text-red-200">
            {error ?? "Something went wrong."}
          </p>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="mt-3 text-sm font-semibold text-pantri-accent hover:underline"
          >
            Retry
          </button>
        </div>
      </Section>
    );
  }

  const defaultPackageNaira = Math.round(pkg.pricing.totalKobo / 100);
  const items = [...(pkg.items ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <section className="bg-pantri-background pt-8 pb-4">
        <Container>
          <p className="text-sm text-pantri-muted">
            <Link href="/packages" className="font-medium text-pantri-accent hover:underline">
              Packages
            </Link>
            {" / "}
            <span className="text-pantri-foreground">{pkg.name}</span>
          </p>
        </Container>
      </section>

      <Section className="pt-4!">
        <div className="grid gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-pantri-border bg-pantri-surface">
              <div className="aspect-4/3 bg-pantri-surface-muted">
                {pkg.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={pkg.coverImageUrl}
                    alt={pkg.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-pantri-muted">
                    No cover image
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              {pkg.isPopular ? (
                <span className="inline-block rounded-full bg-pantri-accent px-3 py-1 text-xs font-semibold text-white">
                  Popular
                </span>
              ) : null}
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-pantri-foreground sm:text-4xl">
                {pkg.name}
              </h1>
              {pkg.description ? (
                <p className="mt-4 text-base leading-relaxed text-pantri-muted">
                  {pkg.description}
                </p>
              ) : null}

              <div className="pantri-card mt-8 space-y-2 p-5">
                <PriceRow
                  label="Subtotal"
                  value={formatNaira(
                    pkg.pricing.wholesaleSubtotalKobo || pkg.pricing.retailSubtotalKobo,
                  )}
                />
                {pkg.pricing.discountPercent > 0 ? (
                  <PriceRow
                    label={`Discount (${pkg.pricing.discountPercent}%)`}
                    value={`−${formatNaira(pkg.pricing.savingsKobo)}`}
                  />
                ) : null}
                <PriceRow label="Total" value={formatNaira(pkg.pricing.totalKobo)} bold />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton href="/download">Get this package in the app</CTAButton>
                <CTAButton href="/packages" variant="outline">
                  All packages
                </CTAButton>
              </div>
              <p className="mt-4 text-xs text-pantri-muted">
                Checkout happens in the Pantri mobile app. Eligibility depends on your employer.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <h2 className="mb-4 text-xl font-bold text-pantri-foreground">What&apos;s included</h2>
            {items.length === 0 ? (
              <p className="text-sm text-pantri-muted">{pkg.itemSummary || "Item list unavailable."}</p>
            ) : (
              <ul className="divide-y divide-pantri-border rounded-2xl border border-pantri-border bg-pantri-surface">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 p-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-pantri-surface-muted">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-pantri-foreground">{item.name}</p>
                      <p className="text-xs text-pantri-muted">
                        Qty {item.quantity}
                        {item.packageLabel ? ` · ${item.packageLabel}` : ""}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-pantri-foreground">
                      {formatNaira(item.lineWholesaleKobo || item.lineRetailKobo || item.priceKobo)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="mb-4 text-xl font-bold text-pantri-foreground">Payment plan</h2>
            <PaymentCalculator key={pkg.id} defaultPackageNaira={defaultPackageNaira} />
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}

function PriceRow({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-pantri-muted">{label}</span>
      <span className={bold ? "text-base font-bold text-pantri-foreground" : "text-pantri-foreground"}>
        {value}
      </span>
    </div>
  );
}
