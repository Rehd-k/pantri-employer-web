# Spec 17  Contact & Help Centre

## Route & files

- Routes:
  - `/contact`
  - `/help`
- Create:
  - `app/(marketing)/contact/page.tsx`
  - `app/(marketing)/help/page.tsx`
  - `components/marketing/ContactForm.tsx`

## Purpose

Contact channels and help entry point.

## Contact page sections

### Hero

- Headline: **Get in touch**

### Contact form

Fields:

- Name, Email, Phone (optional)
- Topic: General, Employer enquiry, Business/Sales, Payroll, Supplier, Support
- Message

Submit: client-side only for now  show success state ("We'll be back to you within 1 business day"). No backend endpoint required in Phase 1.

### Contact details (placeholders)

- Email: support@pantri.app
- Phone: +234 (placeholder)
- WhatsApp link (placeholder `#`)
- Office: Lagos, Nigeria (placeholder)
- Support hours: Mon–Fri 9am–6pm WAT

### Enquiry types

Quick links with `?topic=` query param pre-selecting form topic.

## Help centre page

- Search input (filters static FAQ items)
- Categories: Getting started, Orders, Payments, Employer, Account
- Link to full `/faq`
- Link to `/download`

## States

- Form validation errors
- Submitting spinner
- Success confirmation
- Error: "Something went wrong" (if future API fails)

## Acceptance checklist

- [ ] Form validates required fields
- [ ] Success state after submit
- [ ] Topic query param pre-fills select
- [ ] Help page links to FAQ

## Dependencies

- `15-trust-testimonials-faq.md` (FAQ content)
