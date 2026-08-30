# Spec 18 — Auth / Login Hub

## Route & files

- Routes: `/login` (enhance existing), `/signup` (new employee info page)
- Modify: `app/login/page.tsx`
- Create: `app/(marketing)/signup/page.tsx` OR enhance login as hub

## Purpose

Unified entry point for different user types.

## Login hub redesign

Split `/login` into role selector tabs or cards:

### Employee

- Message: Download the Pantri app to shop and manage orders
- CTA: **Download App** → `/download`
- No web employee login (Flutter only)

### Employer

- Existing email/password form (current implementation)
- Redirect to `/portal` on success
- Link to `/register`

### Admin

- Message: Platform admin portal
- CTA: **Go to Admin Portal** → external link `http://localhost:3002/login` (use env `NEXT_PUBLIC_ADMIN_URL`)

Keep existing `useAuth` — employer login unchanged.

## Employee signup page (`/signup`)

Informational onboarding steps (not functional web signup):

- Phone, email, employer, employee ID, verification — explain each step
- CTA: Download app
- Link: Ask employer to join → `/contact`

## States

- Existing auth loading/error states preserved
- Admin link opens in same tab

## Acceptance checklist

- [ ] Employer login still works → `/portal`
- [ ] Employee directed to app, not fake web signup
- [ ] Admin link configurable via env
- [ ] Register link preserved

## Dependencies

- Portal auth (implemented)
- `21-mobile-app-download.md` (for app links)

## Env

Add to `.env.local.example`:

```
NEXT_PUBLIC_ADMIN_URL=http://localhost:3002
```
