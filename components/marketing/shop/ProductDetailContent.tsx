"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatNaira } from "@/lib/format";
import {
  calculatePayment,
  DEFAULT_SALARY_NAIRA,
  nairaToKobo,
  PAYMENT_PLANS,
} from "@/lib/marketing";
import { publicApi, PublicApiError } from "@/lib/public-api";
import type { PublicProductDetail, PublicProductPack } from "@/lib/public-types";
import { Container, CTAButton, Section, TrustBadge } from "../primitives";
import { ScrollReveal } from "../ScrollReveal";

export function ProductDetailContent({ productId }: { productId: string }) {
  const [product, setProduct] = useState<PublicProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);
      try {
        const data = await publicApi.get<PublicProductDetail>(
          `/public/marketplace/products/${productId}`,
        );
        if (cancelled) return;
        setProduct(data);
        const packs = (data.packs ?? []).filter((p) => p.isActive !== false);
        const cheapest = [...packs].sort((a, b) => a.priceKobo - b.priceKobo)[0];
        setSelectedPackId(cheapest?.id ?? packs[0]?.id ?? null);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof PublicApiError && err.status === 404) {
          setNotFound(true);
          setProduct(null);
        } else {
          setError(
            err instanceof PublicApiError
              ? err.message
              : "Could not load this product. Please try again.",
          );
          setProduct(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [productId, reloadKey]);

  const packs = useMemo(
    () => (product?.packs ?? []).filter((p) => p.isActive !== false),
    [product],
  );

  const selectedPack: PublicProductPack | undefined = packs.find((p) => p.id === selectedPackId);

  const paymentExample = useMemo(() => {
    const price =
      selectedPack?.priceKobo ??
      [...packs].sort((a, b) => a.priceKobo - b.priceKobo)[0]?.priceKobo ??
      product?.fromPriceKobo ??
      0;
    return calculatePayment(nairaToKobo(DEFAULT_SALARY_NAIRA), PAYMENT_PLANS[0], price);
  }, [selectedPack, packs, product]);

  if (loading) {
    return (
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-pantri-surface-muted" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-pantri-surface-muted" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-pantri-surface-muted" />
            <div className="h-24 w-full animate-pulse rounded bg-pantri-surface-muted" />
          </div>
        </div>
      </Section>
    );
  }

  if (notFound) {
    return (
      <Section>
        <div className="pantri-card mx-auto max-w-lg p-10 text-center">
          <h1 className="text-2xl font-bold text-pantri-foreground">Product not found</h1>
          <p className="mt-3 text-sm text-pantri-muted">
            This item may have been removed or is no longer available.
          </p>
          <div className="mt-6">
            <CTAButton href="/shop">Back to shop</CTAButton>
          </div>
        </div>
      </Section>
    );
  }

  if (error || !product) {
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

  const imageSrc = selectedPack?.imageUrl || product.imageUrl;
  const brand = selectedPack?.brand || packs[0]?.brand;

  return (
    <>
      <section className="bg-pantri-background pt-8 pb-4">
        <Container>
          <p className="text-sm text-pantri-muted">
            <Link href="/shop" className="font-medium text-pantri-accent hover:underline">
              Shop
            </Link>
            {product.categoryName ? (
              <>
                {" / "}
                <span>{product.categoryName}</span>
              </>
            ) : null}
            {" / "}
            <span className="text-pantri-foreground">{product.name}</span>
          </p>
        </Container>
      </section>

      <Section className="!pt-4">
        <div className="grid gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-pantri-border bg-pantri-surface">
              <div className="aspect-square bg-pantri-surface-muted">
                {imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-pantri-muted">
                    No image
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <TrustBadge>Payroll plans available</TrustBadge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-pantri-foreground sm:text-4xl">
                {product.name}
              </h1>
              {brand ? <p className="mt-2 text-sm text-pantri-muted">{brand}</p> : null}
              {product.description ? (
                <p className="mt-4 text-base leading-relaxed text-pantri-muted">
                  {product.description}
                </p>
              ) : null}

              {packs.length > 0 ? (
                <div className="mt-8">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-muted">
                    Pack options
                  </h2>
                  <ul className="space-y-2">
                    {packs.map((pack) => (
                      <li key={pack.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedPackId(pack.id)}
                          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                            selectedPackId === pack.id
                              ? "border-pantri-accent bg-pantri-accent/5"
                              : "border-pantri-border bg-pantri-surface hover:border-pantri-accent/40"
                          }`}
                        >
                          <span>
                            <span className="block font-semibold text-pantri-foreground">
                              {pack.packageLabel || pack.brand || "Pack"}
                            </span>
                            {pack.brand && pack.packageLabel ? (
                              <span className="text-xs text-pantri-muted">{pack.brand}</span>
                            ) : null}
                          </span>
                          <span className="font-bold text-pantri-foreground">
                            {formatNaira(pack.priceKobo)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-6 text-lg font-bold text-pantri-foreground">
                  From {formatNaira(product.fromPriceKobo)}
                </p>
              )}

              <div className="pantri-card mt-8 p-5">
                <p className="text-sm font-semibold text-pantri-foreground">
                  Example with {PAYMENT_PLANS[0].label} · no upfront
                </p>
                <p className="mt-2 text-sm text-pantri-muted">
                  {formatNaira(paymentExample.monthlyKobo)}/mo × {paymentExample.months}
                  {paymentExample.overLimit
                    ? ` · capped at ${formatNaira(paymentExample.creditLimitKobo)} (1.5× salary limit)`
                    : " · within your 1.5× salary limit"}
                </p>
              </div>

              {product.nutrition ? (
                <div className="mt-8">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-muted">
                    Nutrition summary
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <NutritionStat label="Energy" value={`${product.nutrition.energyKcal} kcal`} />
                    <NutritionStat
                      label="Protein"
                      value={`${(product.nutrition.proteinMg / 1000).toFixed(1)} g`}
                    />
                    <NutritionStat
                      label="Carbs"
                      value={`${(product.nutrition.carbsMg / 1000).toFixed(1)} g`}
                    />
                    <NutritionStat
                      label="Fat"
                      value={`${(product.nutrition.fatMg / 1000).toFixed(1)} g`}
                    />
                  </div>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton href="/download">Order in the Pantri app</CTAButton>
                <CTAButton href="/shop" variant="outline">
                  Continue browsing
                </CTAButton>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-pantri-muted">
                Eligibility depends on your employer. Pantri is available to employees of
                participating workplaces with an active payroll arrangement.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}

function NutritionStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-pantri-border bg-pantri-surface p-3">
      <p className="text-xs text-pantri-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-pantri-foreground">{value}</p>
    </div>
  );
}
