# Spec 03  How Pantri Works

## Route & files

- Route: `/how-it-works`
- Create: `app/(marketing)/how-it-works/page.tsx`

## Purpose

Explain Pantri's payroll-backed food purchasing flow in depth. Primary message:

> **A full table today. Room in your paycheck for tomorrow.**

## Sections

### 1. Page hero

- Headline: **How Pantri Works**
- Subtext: Pantri is a food purchasing platform with payroll-backed payment plansnot a personal loan. Stock up in bulk and dodge the next price jump (in Nigeria, it's always up)enough for food, bills, and investments.
- CTA: Start Shopping → `/shop`

### 2. Four-step flow (expanded)

Reuse pattern from homepage but with larger visuals and more copy per step:

1. **Choose your food**  groceries, packages, events
2. **Choose your payment plan**  20%+6 or 25%+5
3. **Get your food**  fulfilment after initial payment/approval
4. **Pay through payroll**  automatic deductions

Include a vertical timeline on mobile, horizontal on desktop.

### 3. Payment plans overview

Brief comparison of 20%+6 vs 25%+5. Link to `/pricing`.

Embed `PaymentCalculator` component.

### 4. Who can use Pantri

- Employees of participating employers
- Employer must be onboarded
- CTA: Check If My Employer Participates → `/for-employees`

### 5. What Pantri is NOT

Three callout cards:

- Not a grocery delivery app only
- Not primarily a loan app
- IS: technology-powered food purchasing with payroll plans

## Components to reuse

- `Section`, `SectionHeading`, `CTAButton`, `ScrollReveal`
- `PaymentCalculator`, `PaymentPlanVisual`
- `FeatureCard`

## Data source

Static copy + `PaymentCalculator` (client-side).

## States

- N/A (static page)

## Acceptance checklist

- [ ] Route `/how-it-works` renders inside MarketingShell
- [ ] Page metadata title: "How Pantri Works"
- [ ] All copy uses **Pantri** branding
- [ ] Mobile-responsive timeline
- [ ] Links to `/shop`, `/pricing`, `/for-employees` work

## Dependencies

- `01-design-system.md` (implemented)
- `02-homepage.md` (implemented)
