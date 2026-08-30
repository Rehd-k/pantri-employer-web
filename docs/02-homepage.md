# Spec 02 — Homepage (Reference)

**Status:** Implemented in Phase 1.

## Route

`/` → [`app/(marketing)/page.tsx`](../../app/(marketing)/page.tsx)

## Implementation

Main content: [`components/marketing/HomepageContent.tsx`](../../components/marketing/HomepageContent.tsx)

## Sections implemented

1. Hero with headline, CTAs, trust badge
2. PaymentPlanVisual + PaymentCalculator
3. How it works (4 steps)
4. What can you buy (category cards)
5. Food packages (live API with static fallback)
6. Why Pantri (6 benefits)
7. For employees strip
8. For employers preview with dashboard mockup
9. Placeholder testimonials
10. Mobile app section
11. FAQ accordion (top questions)

## Data

- Packages: `GET /api/v1/public/packages` via `publicApi`
- Calculator: client-side via `lib/marketing.ts`

## When extending

Do not duplicate homepage sections on other pages — link to dedicated routes instead.
