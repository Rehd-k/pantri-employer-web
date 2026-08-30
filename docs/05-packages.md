# Spec 05 — Food Packages

## Route & files

- Route: `/packages`
- Detail: `/packages/[id]`
- Create:
  - `app/(marketing)/packages/page.tsx`
  - `app/(marketing)/packages/[id]/page.tsx`
  - `components/marketing/packages/PackageDetail.tsx`

## Purpose

Show curated family packages (Bachelor, Couple, Family sizes) with live pricing from backend.

Headline: **Built around real life.**

## Listing page sections

### Hero

- Headline + subtext about household-sized packages
- Trust: Available through participating employers

### Package grid

Fetch `GET /public/packages`. Use `PackageCard` / `PackageCardFromApi`.

Show for each:

- Name, description, cover image
- Item summary, item count
- Total price (`pricing.totalKobo`)
- Payment example (20% + 6 months)
- Popular badge if `isPopular`
- CTA: View Package

Include **Custom** card linking to `/shop` or app download.

### Discount tiers note

Static copy: spend thresholds unlock package discounts (link to `/pricing`).

## Detail page

Fetch `GET /public/packages/:id`.

Show:

- Cover image, name, description
- Item list (name, qty, line price)
- Pricing breakdown (subtotal, discount, total)
- Payment calculator pre-filled with package total
- CTA: **Get this package in the app** → `/download`

## States

- Loading skeletons
- Empty: "Packages coming soon"
- Error: retry banner
- 404 on invalid id

## Acceptance checklist

- [ ] Live data from public packages API
- [ ] Detail page shows items and pricing
- [ ] Payment example uses kobo math
- [ ] No checkout on web
- [ ] Responsive grid

## Dependencies

- `04-shop-marketplace.md` (optional, for cross-links)
- Public packages API (implemented)
