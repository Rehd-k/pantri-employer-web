# Spec 10 — For Employers

## Route & files

- Route: `/for-employers`
- Create: `app/(marketing)/for-employers/page.tsx`

## Purpose

B2B landing page for HR and company leaders.

Headline: **A better food benefit for your employees.**

## Sections

### Hero (distinct visual tone — more enterprise)

- Darker background or navy section
- Headline + subtext
- CTAs: **Partner With Pantri** → `/register`, **Book a Demo** → `/contact`

### Value propositions (grid)

1. Employee welfare — manage food expenses
2. Easy payroll administration — structured deductions
3. No inventory for employer — Pantri handles fulfilment
4. Employee retention — practical benefit
5. Reporting — monitor participation and deductions

### Employer dashboard preview

Reuse homepage mockup but expand with:

- Chart placeholder (bar/line)
- Upcoming payroll date
- Link: **Sign in to portal** → `/login`

### How onboarding works

1. Register company → `/register`
2. Configure credit policy (in portal)
3. Invite employees
4. Employees shop via app

### HR/Payroll teaser

Brief section linking to `/hr-payroll`.

## Data source

Static. Dashboard numbers labelled "Illustrative preview."

## Acceptance checklist

- [ ] Enterprise visual tone distinct from employee sections
- [ ] Register and login CTAs work
- [ ] No invented client logos

## Dependencies

- `01-design-system.md`
- Employer portal at `/portal` (implemented)
