# Spec 14 — Pricing / Payment Plans

## Route & files

- Route: `/pricing`
- Create: `app/(marketing)/pricing/page.tsx`

## Purpose

Explain payroll payment plan options clearly.

## Sections

### Hero

- Headline: **Simple payment plans**
- Subtext: Spread the cost of food over 5 or 6 months through payroll.

### Plan comparison

Two cards side by side:

| Plan | Initial | Duration |
|------|---------|----------|
| 20% + 6 months | 20% upfront | 6 monthly deductions |
| 25% + 5 months | 25% upfront | 5 monthly deductions |

Each card: example on ₦300,000 package using `calculatePayment`.

### Interactive calculator

Full-width `PaymentCalculator` component.

### Eligibility disclaimer

> Actual eligibility, limits, availability and terms depend on your employer and payroll arrangement. Pantri is a food purchasing platform — not a personal loan product.

### FAQ snippet

2–3 pricing-related questions.

## Data source

`lib/marketing.ts` — `PAYMENT_PLANS`, `calculatePayment`.

## Acceptance checklist

- [ ] Both plans explained with examples
- [ ] Calculator embedded
- [ ] Not framed as loan APR/interest

## Dependencies

- `03-how-it-works.md`
