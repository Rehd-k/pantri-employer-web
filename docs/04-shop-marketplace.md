# Spec 04  Shop / Food Marketplace

## Route & files

- Route: `/shop`
- Create:
  - `app/(marketing)/shop/page.tsx`
  - `app/(marketing)/shop/[productId]/page.tsx` (optional in same spec)
  - `components/marketing/shop/ProductGrid.tsx`
  - `components/marketing/shop/ProductCard.tsx`
  - `components/marketing/shop/ShopFilters.tsx`
  - `lib/public-types.ts` (mirror backend marketplace DTOs)

## Purpose

Live product browsing for the public website. **No cart/checkout on web**  CTA sends users to download the app.

Primary message: Browse real Pantri catalog; order via mobile app with payroll plans.

## Sections  listing page

### Hero

- Headline: **Shop smarter with Pantri**
- Subtext: Better prices through bulk procurement. Pay through your salary.
- Search input (filters product list client-side or via API query params)

### Filters sidebar / drawer (mobile)

- Categories (from API)
- Subcategories (load when category selected)
- Sort: price low-high, price high-low, name
- Optional: "Packages only" link → `/packages`

### Product grid

Each `ProductCard` shows:

- Product image (fallback placeholder if missing)
- Name, brand
- Pack label / weight
- Price (`formatNaira(priceKobo)`)
- Badge: "Payroll plans available"
- CTA: **View product** (not Add to cart)

### Empty / error / loading

- Loading: skeleton cards
- Empty: "No products match your filters"
- Error: banner with retry

## Product detail page (`/shop/[productId]`)

- Image gallery
- Name, brand, description, nutrition summary if available
- Pack options with prices
- Payment example (20%+6 on lowest pack price)
- CTA: **Order in the Pantri app** → `/download`
- Disclaimer: eligibility depends on employer

## API endpoints

Use `publicApi` from [`lib/public-api.ts`](../../lib/public-api.ts):

```
GET /public/marketplace/categories
GET /public/marketplace/categories/:id/subcategories
GET /public/marketplace/products?search=&categoryId=&subcategoryId=&page=&limit=
GET /public/marketplace/products/:id
GET /public/marketplace/banners (optional hero carousel)
```

Mirror DTO shapes from `backend/src/marketplace/dto/*.dto.ts` in `lib/public-types.ts`.

## Components to reuse

- `Section`, `Container`, `CTAButton`, `ScrollReveal`
- `TrustBadge`

## Acceptance checklist

- [ ] `/shop` loads categories and products without login
- [ ] Search and category filters work
- [ ] Product detail page shows real API data
- [ ] No cart functionality
- [ ] All prices in kobo → `formatNaira`
- [ ] Loading, empty, error states implemented
- [ ] Mobile filter drawer works

## Dependencies

- `01-design-system.md`
- Backend public marketplace API (implemented)
