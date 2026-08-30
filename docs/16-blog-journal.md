# Spec 16 — Blog / Food & Wellness Journal

## Route & files

- Route: `/blog`
- Detail: `/blog/[slug]`
- Create:
  - `app/(marketing)/blog/page.tsx`
  - `app/(marketing)/blog/[slug]/page.tsx`
  - `lib/blog-posts.ts`

## Purpose

Editorial content hub (static posts initially, no CMS).

## Listing page

### Hero

- Headline: **Food & Wellness Journal**

### Category filters (static chips)

Food, Nutrition, Recipes, Family, Budgeting, Healthy Living, Food Prices, Cooking, Events

### Post cards

Static posts in `lib/blog-posts.ts`:

- "How to Build a ₦100,000 Monthly Food Budget"
- "10 Nigerian Meals You Can Make From One Shopping Basket"
- "How to Buy Food in Bulk Without Wasting It"
- "Planning Food for a Nigerian Wedding"
- "Building a Better Family Pantry"

Each card: title, excerpt, category, date, read time, image placeholder.

## Detail page

Markdown-style content rendered as JSX paragraphs (keep in TS file).

Include author: "Pantri Editorial" and CTA to `/shop`.

## Data source

Static `lib/blog-posts.ts`.

## Acceptance checklist

- [ ] At least 5 posts
- [ ] Category filter works client-side
- [ ] 404 for unknown slug
- [ ] Premium editorial card design

## Dependencies

- `01-design-system.md`
