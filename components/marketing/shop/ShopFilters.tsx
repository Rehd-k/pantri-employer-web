"use client";

import Link from "next/link";
import type { PublicCategory, PublicSubcategory, ProductUiSort } from "@/lib/public-types";

export function ShopFilters({
  categories,
  subcategories,
  categoryId,
  subcategoryId,
  sort,
  onCategoryChange,
  onSubcategoryChange,
  onSortChange,
  mobileOpen,
  onCloseMobile,
}: {
  categories: PublicCategory[];
  subcategories: PublicSubcategory[];
  categoryId: string;
  subcategoryId: string;
  sort: ProductUiSort;
  onCategoryChange: (id: string) => void;
  onSubcategoryChange: (id: string) => void;
  onSortChange: (sort: ProductUiSort) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const body = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-muted">
          Sort
        </h3>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as ProductUiSort)}
          className="pantri-input"
        >
          <option value="name_asc">Name A–Z</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-muted">
          Categories
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              type="button"
              onClick={() => onCategoryChange("")}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                !categoryId
                  ? "bg-pantri-primary/10 font-semibold text-pantri-primary"
                  : "text-pantri-foreground hover:bg-pantri-surface-muted"
              }`}
            >
              All categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                  categoryId === cat.id
                    ? "bg-pantri-primary/10 font-semibold text-pantri-primary"
                    : "text-pantri-foreground hover:bg-pantri-surface-muted"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {categoryId && subcategories.length > 0 ? (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-muted">
            Subcategories
          </h3>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => onSubcategoryChange("")}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                  !subcategoryId
                    ? "bg-pantri-accent/10 font-semibold text-pantri-accent"
                    : "text-pantri-foreground hover:bg-pantri-surface-muted"
                }`}
              >
                All in category
              </button>
            </li>
            {subcategories.map((sub) => (
              <li key={sub.id}>
                <button
                  type="button"
                  onClick={() => onSubcategoryChange(sub.id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                    subcategoryId === sub.id
                      ? "bg-pantri-accent/10 font-semibold text-pantri-accent"
                      : "text-pantri-foreground hover:bg-pantri-surface-muted"
                  }`}
                >
                  {sub.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Link
        href="/packages"
        className="block text-sm font-semibold text-pantri-accent hover:underline"
      >
        Packages only →
      </Link>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block">{body}</aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/40"
            onClick={onCloseMobile}
          />
          <div className="absolute inset-y-0 left-0 w-[min(100%,20rem)] overflow-y-auto bg-pantri-surface p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-pantri-foreground">Filters</h2>
              <button
                type="button"
                onClick={onCloseMobile}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-pantri-muted hover:bg-pantri-surface-muted"
              >
                Close
              </button>
            </div>
            {body}
          </div>
        </div>
      ) : null}
    </>
  );
}
