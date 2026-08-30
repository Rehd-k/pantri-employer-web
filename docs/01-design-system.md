# Spec 01  Design System (Reference)

**Status:** Implemented in Phase 1. Dark mode added.

## Files

- [`app/globals.css`](../../app/globals.css)  Tailwind v4 `@theme` tokens, `@source` paths, `.dark` overrides in `@layer theme`
- [`app/layout.tsx`](../../app/layout.tsx)  **single** CSS entry (Inter font + globals.css). Do not add fonts/CSS to nested layouts.
- [`lib/theme.ts`](../../lib/theme.ts)  theme preference helpers
- [`components/marketing/ThemeProvider.tsx`](../../components/marketing/ThemeProvider.tsx)  light / dark / system context
- [`components/marketing/ThemeToggle.tsx`](../../components/marketing/ThemeToggle.tsx)  nav theme switcher
- [`components/marketing/ThemeScript.tsx`](../../components/marketing/ThemeScript.tsx)  FOUC prevention inline script
- [`components/marketing/primitives.tsx`](../../components/marketing/primitives.tsx)  Container, Section, CTAButton, TrustBadge
- [`components/marketing/MarketingShell.tsx`](../../components/marketing/MarketingShell.tsx)
- [`components/marketing/MarketingNav.tsx`](../../components/marketing/MarketingNav.tsx)
- [`components/marketing/MarketingFooter.tsx`](../../components/marketing/MarketingFooter.tsx)
- [`components/marketing/Cards.tsx`](../../components/marketing/Cards.tsx)
- [`components/marketing/PaymentCalculator.tsx`](../../components/marketing/PaymentCalculator.tsx)
- [`components/marketing/ScrollReveal.tsx`](../../components/marketing/ScrollReveal.tsx)
- [`components/marketing/FaqAccordion.tsx`](../../components/marketing/FaqAccordion.tsx)
- [`lib/marketing.ts`](../../lib/marketing.ts)  payment plan math

## Brand tokens (semantic  adapt to light/dark)

| Token | Light | Dark |
|-------|-------|------|
| `--color-pantri-background` | `#FAF8F5` | `#0F0F12` |
| `--color-pantri-foreground` | `#1A1A1A` | `#F5F5F4` |
| `--color-pantri-surface` | `#FFFFFF` | `#1A1A1F` |
| `--color-pantri-surface-muted` | `#F4F4F5` | `#242429` |
| `--color-pantri-border` | `#E8E4DF` | `#2E2E35` |
| `--color-pantri-primary` | `#000666` | `#4D4D99` |
| `--color-pantri-accent` | `#1B6D24` | `#2D9A3A` |

Legacy aliases `pantri-cream`, `pantri-charcoal`, `pantri-muted` also switch in dark mode.

## Dark mode

- **Preference:** `light` | `dark` | `system` (default: **system**)
- **Storage:** `localStorage` key `pantri-theme`
- **Mechanism:** `.dark` class on `<html>` + CSS variable overrides
- **Toggle:** `ThemeToggle` in `MarketingNav` (compact icon on desktop, full picker in mobile menu)

## Required classes for new marketing pages

Use **semantic tokens**  never hardcode `bg-white` or `text-black`:

| Use case | Class |
|----------|-------|
| Page background | `bg-pantri-background` |
| Body text | `text-pantri-foreground` |
| Cards / panels | `pantri-card` or `bg-pantri-surface border-pantri-border` |
| Muted sections | `Section muted` or `bg-pantri-surface-muted` |
| Secondary text | `text-pantri-muted` |
| Form inputs | `pantri-input` |
| Branded navy band | `Section dark` (unchanged in both themes) |

## Rules for new pages

- Reuse `MarketingShell` via `app/(marketing)/layout.tsx`  dark mode works automatically.
- **Do not** import CSS or `next/font` in `(marketing)/layout.tsx`  it breaks dev CSS loading. Fonts live in root `app/layout.tsx` only.
- **Every new marketing page must use semantic tokens**  no raw `bg-white`, `#fff`, or light-only colors.
- Test all new pages in **light, dark, and system** modes before marking done.
- Do not import portal `components/ui/*` on marketing pages unless intentional.
- Money: integer kobo internally, `formatNaira()` for display.
- Portal pages (`/portal/*`) keep slate/emerald styling  dark mode not required there yet.

## Acceptance checklist (dark mode)

- [ ] Page readable in light and dark
- [ ] Cards use `pantri-card` or semantic surface tokens
- [ ] Inputs use `pantri-input`
- [ ] No invisible text (contrast check on borders and muted copy)
- [ ] Theme toggle visible in nav
