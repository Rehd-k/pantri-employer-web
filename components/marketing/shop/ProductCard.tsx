import Link from "next/link";
import { formatNaira } from "@/lib/format";
import type { PublicProductListItem } from "@/lib/public-types";
import { TrustBadge } from "../primitives";

function primaryPackLabel(product: PublicProductListItem): string {
  const pack = product.packs?.[0];
  if (pack?.packageLabel) return pack.packageLabel;
  if (pack?.brand) return pack.brand;
  return product.categoryName || "Grocery";
}

function primaryBrand(product: PublicProductListItem): string | null {
  return product.packs?.[0]?.brand || null;
}

export function ProductCard({ product }: { product: PublicProductListItem }) {
  const brand = primaryBrand(product);
  const label = primaryPackLabel(product);
  const imageSrc = product.imageUrl || product.packs?.[0]?.imageUrl;

  return (
    <Link
      href={`/shop/${product.id}`}
      className="pantri-card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-4/3 bg-pantri-surface-muted">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-pantri-muted">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <TrustBadge>Payroll plans available</TrustBadge>
        </div>
        <h3 className="text-base font-bold text-pantri-foreground group-hover:text-pantri-primary">
          {product.name}
        </h3>
        {brand ? <p className="mt-1 text-xs text-pantri-muted">{brand}</p> : null}
        <p className="mt-1 text-xs text-pantri-muted">{label}</p>
        <p className="mt-3 text-sm font-bold text-pantri-foreground">
          From {formatNaira(product.fromPriceKobo)}
        </p>
        <span className="mt-auto pt-4 text-sm font-semibold text-pantri-accent">
          View product →
        </span>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="pantri-card overflow-hidden">
      <div className="aspect-4/3 animate-pulse bg-pantri-surface-muted" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-pantri-surface-muted" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-pantri-surface-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-pantri-surface-muted" />
      </div>
    </div>
  );
}
