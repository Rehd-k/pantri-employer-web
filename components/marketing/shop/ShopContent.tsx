"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { publicApi, PublicApiError } from "@/lib/public-api";
import {
  buildMarketplaceProductsPath,
  type ProductUiSort,
  type PublicCategory,
  type PublicProductListItem,
  type PublicProductListResponse,
  type PublicSubcategory,
} from "@/lib/public-types";
import { Container, Section } from "../primitives";
import { ScrollReveal } from "../ScrollReveal";
import { ProductGrid } from "./ProductGrid";
import { ShopFilters } from "./ShopFilters";

const PAGE_SIZE = 24;

export function ShopContent() {
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [subcategories, setSubcategories] = useState<PublicSubcategory[]>([]);
  const [products, setProducts] = useState<PublicProductListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [sort, setSort] = useState<ProductUiSort>("name_asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cats = await publicApi.get<PublicCategory[]>("/public/marketplace/categories");
        if (!cancelled) setCategories(cats.filter((c) => c.isActive !== false));
      } catch {
        if (!cancelled) setCategories([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!categoryId) {
      setSubcategories([]);
      setSubcategoryId("");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const subs = await publicApi.get<PublicSubcategory[]>(
          `/public/marketplace/categories/${categoryId}/subcategories`,
        );
        if (!cancelled) setSubcategories(subs.filter((s) => s.isActive !== false));
      } catch {
        if (!cancelled) setSubcategories([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const apiSort = sort === "name_asc" ? "name" : "sortOrder";
      const apiOrder = sort === "name_asc" ? "asc" : "asc";
      const path = buildMarketplaceProductsPath({
        q: debouncedSearch || undefined,
        categoryId: categoryId || undefined,
        subcategoryId: subcategoryId || undefined,
        sort: apiSort,
        order: apiOrder,
        skip: 0,
        take: PAGE_SIZE,
      });
      const res = await publicApi.get<PublicProductListResponse>(path);
      setProducts(res.items ?? []);
      setTotal(res.total ?? res.items?.length ?? 0);
    } catch (err) {
      const message =
        err instanceof PublicApiError ? err.message : "Could not load products. Please try again.";
      setError(message);
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, categoryId, subcategoryId, sort, reloadKey]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const displayProducts = useMemo(() => {
    const list = [...products];
    if (sort === "price_asc") {
      list.sort((a, b) => a.fromPriceKobo - b.fromPriceKobo);
    } else if (sort === "price_desc") {
      list.sort((a, b) => b.fromPriceKobo - a.fromPriceKobo);
    }
    return list;
  }, [products, sort]);

  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-10 sm:pt-16">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Shop smarter with Pantri
              </h1>
              <p className="mt-4 text-lg text-pantri-muted">
                Better prices through bulk procurement. Pay through your salary.
              </p>
              <div className="mx-auto mt-8 max-w-xl">
                <label className="sr-only" htmlFor="shop-search">
                  Search products
                </label>
                <input
                  id="shop-search"
                  type="search"
                  placeholder="Search rice, oil, beans…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pantri-input"
                />
              </div>
              <p className="mt-4 text-sm text-pantri-muted">
                Browse here  order in the Pantri mobile app.{" "}
                <Link href="/packages" className="font-semibold text-pantri-accent hover:underline">
                  View packages
                </Link>
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section className="pt-0!">
        <div className="mb-4 flex items-center justify-between gap-4 lg:hidden">
          <p className="text-sm text-pantri-muted">
            {loading ? "Loading…" : `${total} product${total === 1 ? "" : "s"}`}
          </p>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="rounded-full border border-pantri-border bg-pantri-surface px-4 py-2 text-sm font-semibold text-pantri-foreground"
          >
            Filters
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
          <ShopFilters
            categories={categories}
            subcategories={subcategories}
            categoryId={categoryId}
            subcategoryId={subcategoryId}
            sort={sort}
            onCategoryChange={(id) => {
              setCategoryId(id);
              setSubcategoryId("");
              setMobileFiltersOpen(false);
            }}
            onSubcategoryChange={(id) => {
              setSubcategoryId(id);
              setMobileFiltersOpen(false);
            }}
            onSortChange={setSort}
            mobileOpen={mobileFiltersOpen}
            onCloseMobile={() => setMobileFiltersOpen(false)}
          />

          <div>
            <p className="mb-4 hidden text-sm text-pantri-muted lg:block">
              {loading ? "Loading…" : `${total} product${total === 1 ? "" : "s"}`}
            </p>

            {error ? (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/40">
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

            <ProductGrid products={displayProducts} loading={loading} />
          </div>
        </div>
      </Section>
    </>
  );
}
