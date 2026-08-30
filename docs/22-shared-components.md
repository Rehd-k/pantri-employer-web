# Spec 22 — Shared Components Audit

## Purpose

Refinement pass after building multiple pages. Not a new page — an audit checklist.

## Tasks

### Navigation

- [ ] All footer links resolve to built pages (or graceful "coming soon" stubs)
- [ ] `MarketingNav` active states correct for nested routes (`/shop`, `/shop/[id]`)
- [ ] Mobile drawer closes on navigation

### Reusable components

Ensure these are exported from a single barrel if helpful (`components/marketing/index.ts`):

- `MarketingShell`, `MarketingNav`, `MarketingFooter`
- `Section`, `SectionHeading`, `Container`, `CTAButton`, `TrustBadge`
- `PaymentCalculator`, `PaymentPlanVisual`
- `CategoryCard`, `PackageCard`, `FeatureCard`, `TestimonialCard`
- `FaqAccordion`, `ScrollReveal`

### Cross-cutting

- [ ] All pages have unique `metadata` title/description
- [ ] All pages use Pantri (never Pantra)
- [ ] `formatNaira` used for all money display
- [ ] Loading/empty/error patterns consistent
- [ ] No portal `AppShell` on marketing routes
- [ ] No marketing nav on portal routes
- [ ] **Dark mode:** semantic tokens only; tested in light, dark, and system
- [ ] **Theme toggle** present via `MarketingNav` (do not remove)

### Legal stubs

Create minimal placeholder pages if linked from footer:

- `/privacy` → `app/(marketing)/privacy/page.tsx`
- `/terms` → `app/(marketing)/terms/page.tsx`

Simple prose placeholders acceptable.

### Performance

- [ ] Images use `next/image` where remote URLs used
- [ ] Public API calls in server components where possible (shop listing)

## Dependencies

- All prior specs should be implemented before final audit
