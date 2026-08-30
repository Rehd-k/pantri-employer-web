import type { PublicProductListItem } from "@/lib/public-types";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";

export function ProductGrid({
  products,
  loading,
}: {
  products: PublicProductListItem[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="pantri-card p-10 text-center">
        <p className="text-base font-semibold text-pantri-foreground">
          No products match your filters
        </p>
        <p className="mt-2 text-sm text-pantri-muted">
          Try a different search or clear category filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
