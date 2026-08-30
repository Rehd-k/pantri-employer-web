# Spec 21 — Mobile App Download

## Route & files

- Route: `/download`
- Create: `app/(marketing)/download/page.tsx`

## Purpose

Central app download landing page.

Headline: **Everything Pantri, in your pocket.**

## Sections

### Hero

- Phone mockup showing app screens: Home, Marketplace, Packages, Nutrition, Orders

### App features grid

- Marketplace shopping
- Food packages
- Nutrition & meal plans
- Recipes
- Orders & delivery tracking
- Pantry (coming soon)

### Download buttons

- App Store — placeholder link `#` with "Coming soon" badge
- Google Play — placeholder link `#` with "Coming soon" badge

When real links exist, use env vars:

```
NEXT_PUBLIC_IOS_APP_URL=
NEXT_PUBLIC_ANDROID_APP_URL=
```

### QR code placeholder

Optional static QR placeholder for future deep link.

## Acceptance checklist

- [ ] All CTAs across site can link here
- [ ] Placeholder store badges clearly marked
- [ ] Responsive mockup

## Dependencies

- None
