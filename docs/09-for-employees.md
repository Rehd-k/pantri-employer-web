# Spec 09  For Employees

## Route & files

- Route: `/for-employees`
- Create: `app/(marketing)/for-employees/page.tsx`

## Purpose

Dedicated page for employees wondering if they can use Pantri.

Headline: **Your salary. Your food. Your choice.**

## Sections

### Hero

- Headline + supporting copy
- Primary CTA: **Check If My Employer Participates**
- Secondary: **Ask My Employer to Join Pantri** → `/contact`

### How employees use Pantri

Vertical flow (same 5 steps as homepage employee strip):

Choose food → Select plan → Payroll authorization → Receive food → Automatic deductions

### Eligibility

- Must work for a participating employer
- Account verified through employer/payroll
- Credit limits set by employer policy

### FAQ subset

4–5 employee-focused questions (reuse `FaqAccordion` items or expand).

### Download app

Prominent app section  employees order via mobile app.

CTA: **Download Pantri** → `/download`

## Data source

Static.

## Acceptance checklist

- [ ] Clear distinction: not a loan
- [ ] CTAs to `/contact` and `/download`
- [ ] No employer portal login promoted here (that's `/login`)

## Dependencies

- `03-how-it-works.md`
