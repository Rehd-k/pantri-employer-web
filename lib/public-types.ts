/** Public marketplace types mirrored from backend marketplace DTOs. */

export interface PublicCategory {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  accentColor: string;
  sortOrder: number;
  isActive: boolean;
}

export interface PublicSubcategory {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  sortOrder: number;
  isActive: boolean;
}

export interface PublicCanonicalNutrition {
  energyKcal: number;
  proteinMg: number;
  carbsMg: number;
  fatMg: number;
  fiberMg: number;
  sugarMg: number;
  sodiumMg: number;
  ironUg: number;
}

export interface PublicProductPack {
  id: string;
  sku: string;
  productId: string;
  brand: string;
  packAmount: number;
  packageLabel: string;
  imageUrl: string;
  priceKobo: number;
  retailPriceKobo: number;
  discountPercent: number;
  sortOrder: number;
  isActive: boolean;
}

export interface PublicProductListItem {
  id: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
  name: string;
  imageUrl: string;
  fromPriceKobo: number;
  fromRetailPriceKobo: number;
  discountPercent: number;
  description: string;
  origin: string;
  packs: PublicProductPack[];
  isActive: boolean;
}

export interface PublicProductDetail extends PublicProductListItem {
  nutritionFacts: Record<string, string>;
  nutrition: PublicCanonicalNutrition | null;
  tags: string[];
  averageRating: number;
  reviewCount: number;
}

export interface PublicProductListResponse {
  items: PublicProductListItem[];
  total: number;
}

export type ProductUiSort = "name_asc" | "price_asc" | "price_desc";

export interface MarketplaceProductQuery {
  q?: string;
  categoryId?: string;
  subcategoryId?: string;
  sort?: "name" | "sortOrder" | "createdAt" | "updatedAt";
  order?: "asc" | "desc";
  skip?: number;
  take?: number;
}

export function buildMarketplaceProductsPath(query: MarketplaceProductQuery = {}): string {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.categoryId) params.set("categoryId", query.categoryId);
  if (query.subcategoryId) params.set("subcategoryId", query.subcategoryId);
  if (query.sort) params.set("sort", query.sort);
  if (query.order) params.set("order", query.order);
  if (query.skip != null) params.set("skip", String(query.skip));
  if (query.take != null) params.set("take", String(query.take));
  const qs = params.toString();
  return `/public/marketplace/products${qs ? `?${qs}` : ""}`;
}
