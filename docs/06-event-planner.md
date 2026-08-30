# Spec 06 — Event Food Planner

## Route & files

- Route: `/events`
- Create:
  - `app/(marketing)/events/page.tsx`
  - `components/marketing/events/EventPlannerForm.tsx`
  - `components/marketing/events/EventResults.tsx`
  - `lib/event-planner.ts` (client-side estimation logic)

## Purpose

Interactive demo: user plans food for Nigerian events. **No backend Event module yet** — use client-side estimation.

Headline: **Planning an event? Let Pantri handle the food list.**

## Sections

### Hero

- Headline + subtext
- Visual: event type icons

### Interactive planner

Form fields:

- Event type: Wedding, Burial, Naming Ceremony, Birthday, Traditional Marriage, Church Event, Corporate Event
- Number of guests (number input)
- Budget in ₦ (optional)
- Location (text, optional)
- Food preferences (multi-select chips)

On submit, show **EventResults**:

- Estimated food quantities (rice kg, oil litres, protein portions — use simple multipliers per guest)
- Estimated cost range
- Suggested shopping list (bulleted)
- Recommended package tier
- Payment plan example (20%+6 on estimated cost)
- Delivery schedule suggestion (static copy)

CTA: **Plan My Event** (submit) → scroll to results  
Secondary: **Talk to Pantri** → `/contact`

### Disclaimer

Estimates are illustrative. Final quantities depend on menu, region, and Pantri catalog availability.

## Data source

Static multipliers in `lib/event-planner.ts`. Example:

```typescript
// riceKg = guests * 0.08, oilLitres = guests * 0.02, etc.
```

## States

- Form validation errors
- Results loading animation (300ms fake delay)
- Empty: n/a

## Acceptance checklist

- [ ] All 7 event types selectable
- [ ] Results update when inputs change
- [ ] Payment example uses `calculatePayment` from `lib/marketing.ts`
- [ ] Mobile-friendly form
- [ ] Labelled as estimate, not guaranteed quote

## Dependencies

- `01-design-system.md`
- `05-packages.md` (optional cross-link)
