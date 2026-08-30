# Pantri Website Build Specs

Injectable build specifications for the Pantri public marketing website in `apps/employer-web`.

## How to use

1. Open Cursor Agent mode.
2. Reference one spec file, e.g. `@apps/employer-web/docs/website/04-shop-marketplace.md`.
3. Prompt: **"Implement this Pantri website spec exactly. Brand name is Pantri (not Pantra)."**
4. Verify the page at the route listed in the spec.
5. Move to the next spec in build order.

## Already implemented (Phase 1 + core marketing)

| Spec | Status |
|------|--------|
| `01-design-system.md` | Done — see `components/marketing/*`, `app/globals.css` |
| `02-homepage.md` | Done — see `app/(marketing)/page.tsx` |
| `03-how-it-works.md` | Done — see `app/(marketing)/how-it-works/page.tsx` |
| `04-shop-marketplace.md` | Done — see `app/(marketing)/shop/` |
| `05-packages.md` | Done — see `app/(marketing)/packages/` |
| `10-for-employers.md` | Done — see `app/(marketing)/for-employers/page.tsx` |
| `09-for-employees.md` | Done — see `app/(marketing)/for-employees/page.tsx` |
| `14-pricing-payment-plans.md` | Done — see `app/(marketing)/pricing/page.tsx` |
| `15-trust-testimonials-faq.md` | Done — see `app/(marketing)/faq/page.tsx` |
| `17-contact-help.md` | Done — see `app/(marketing)/contact/`, `help/` |
| `18-auth-login-signup.md` | Done — login hub + `/signup`; employers contact Pantri (no public self-register) |
| `06-event-planner.md` | Done — see `app/(marketing)/events/` |
| `07-nutrition-centre.md` | Done — see `app/(marketing)/nutrition/` |
| `08-recipes.md` | Done — see `app/(marketing)/recipes/` |
| `11-hr-payroll.md` | Done — see `app/(marketing)/hr-payroll/` |
| `12-business-bulk.md` | Done — see `app/(marketing)/business/` |
| `13-about.md` | Done — see `app/(marketing)/about/` |
| `16-blog-journal.md` | Done — see `app/(marketing)/blog/` |
| `19-pantry-smart-reorder.md` | Done — see `app/(marketing)/pantry/` |
| `20-delivery-experience.md` | Done — see `app/(marketing)/delivery/` |
| `21-mobile-app-download.md` | Done — see `app/(marketing)/download/` |
| `22-shared-components.md` | Done — audit: nav nested active, footer links, barrel `index.ts`, `/privacy` + `/terms` |

## Recommended build order

```
(all website specs implemented)
```

## Architecture reminders

- **Public site**: `app/(marketing)/` — uses `MarketingShell`, no auth required.
- **Employer portal**: `app/(portal)/portal/` — uses `AppShell`, requires login at `/login`.
- **Public API**: `lib/public-api.ts` → `/api/v1/public/marketplace/*` and `/api/v1/public/packages/*`.
- **Portal API**: `lib/api.ts` (JWT) — unchanged.
- **Brand**: Always **Pantri**. Never Pantra or PantryPay in user-facing copy.
- **Messaging**: Food purchasing platform with payroll-backed payment plans — NOT a loan app.
- **Dark mode**: Use semantic tokens (`bg-pantri-surface`, `text-pantri-foreground`, `pantri-card`, `pantri-input`). See `01-design-system.md`. Test light, dark, and system.

## Spec template

Each spec file contains:

- Route & files to create
- Purpose & primary message
- Sections (desktop + mobile)
- Components to reuse
- Data source
- Copy blocks
- States (loading, empty, error)
- Acceptance checklist
- Dependencies
