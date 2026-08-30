# Spec 15 — Trust, Testimonials & FAQ

## Route & files

- Route: `/faq`
- Create: `app/(marketing)/faq/page.tsx`

## Purpose

Full FAQ page + trust signals.

## Sections

### Trust grid

Cards (no fake certifications):

- Secure payments
- Verified employers
- Transparent pricing
- Order tracking (in app)
- Secure account
- Data protection
- Customer support

Use icons + short copy. Placeholder where partnerships would go.

### Testimonials

Reuse `TestimonialCard` with **Placeholder testimonial** label.

Include 3–4 quotes from brief. Do not invent real company names.

### Full FAQ

Expand homepage FAQ to full list from brief:

- What is Pantri?
- How does payroll deduction work?
- Who can use Pantri?
- Does my employer need to participate?
- When do I receive my food?
- What payment plans are available?
- Can I customize my package?
- Can I buy food for an event?
- Can I buy individual groceries?
- How does delivery work?
- What happens if I leave my employer?
- Can I cancel an order?
- How does Pantri handle refunds?
- How does Pantri handle fresh food?
- Is Pantri a loan?
- Is my financial information secure?

Use `FaqAccordion` or expand to full-page accordion.

## Data source

Static copy in component or `lib/faq.ts`.

## Acceptance checklist

- [ ] All 16+ questions answered
- [ ] Testimonials marked as placeholders
- [ ] No invented certifications

## Dependencies

- `02-homepage.md` (FaqAccordion exists)
