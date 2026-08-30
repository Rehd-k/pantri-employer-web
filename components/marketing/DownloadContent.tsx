"use client";

import { Container, CTAButton, Section, SectionHeading, TrustBadge } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";

const FEATURES = [
  { icon: "🛒", title: "Marketplace shopping", href: "/shop" },
  { icon: "📦", title: "Food packages", href: "/packages" },
  { icon: "🥗", title: "Nutrition & meal plans", href: "/nutrition" },
  { icon: "👨‍🍳", title: "Recipes", href: "/recipes" },
  { icon: "📍", title: "Orders & delivery tracking", href: "/delivery" },
  { icon: "🏠", title: "Pantry (coming soon)", href: "/pantry" },
];

const SCREENS = ["Home", "Marketplace", "Packages", "Nutrition", "Orders"];

const iosUrl = process.env.NEXT_PUBLIC_IOS_APP_URL || "";
const androidUrl = process.env.NEXT_PUBLIC_ANDROID_APP_URL || "";

export function DownloadContent() {
  const iosReady = Boolean(iosUrl && iosUrl !== "#");
  const androidReady = Boolean(androidUrl && androidUrl !== "#");

  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                Mobile app
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Everything Pantri, in your pocket.
              </h1>
              <p className="mt-6 text-lg text-pantri-muted">
                Browse on the web, then order, track delivery, and manage payment plans in the Pantri
                app — for employees of participating employers.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <StoreButton
                  label="App Store"
                  href={iosReady ? iosUrl : "#"}
                  comingSoon={!iosReady}
                />
                <StoreButton
                  label="Google Play"
                  href={androidReady ? androidUrl : "#"}
                  comingSoon={!androidReady}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mx-auto w-full max-w-xs">
                <div className="rounded-[2.5rem] border-4 border-pantri-border bg-pantri-surface p-3 shadow-2xl">
                  <div className="overflow-hidden rounded-4xl bg-pantri-surface-muted">
                    <div className="flex gap-1 overflow-x-auto border-b border-pantri-border px-2 py-2">
                      {SCREENS.map((screen, i) => (
                        <span
                          key={screen}
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            i === 0
                              ? "bg-pantri-accent text-white"
                              : "bg-pantri-surface text-pantri-muted"
                          }`}
                        >
                          {screen}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-3 p-5">
                      <p className="text-sm font-bold text-pantri-foreground">Good afternoon</p>
                      <div className="rounded-xl bg-pantri-accent/15 p-4">
                        <p className="text-xs text-pantri-muted">Active plan</p>
                        <p className="mt-1 text-sm font-semibold text-pantri-foreground">
                          Family package · 20% + 6 mo
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {["Shop", "Packages", "Orders", "Nutrition"].map((label) => (
                          <div
                            key={label}
                            className="rounded-xl border border-pantri-border bg-pantri-surface p-3 text-center text-xs font-semibold text-pantri-foreground"
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                      <p className="text-center text-[10px] text-pantri-muted">Illustrative mockup</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Features"
            title="What you can do in the app"
            description="Shopping, plans, nutrition, and tracking — pantry tools are on the roadmap."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <ScrollReveal key={f.title}>
              <a
                href={f.href}
                className="pantri-card flex h-full items-start gap-4 p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="text-2xl" aria-hidden>
                  {f.icon}
                </span>
                <div>
                  <h3 className="font-bold text-pantri-foreground">{f.title}</h3>
                  <span className="mt-1 inline-block text-sm font-semibold text-pantri-accent">
                    Learn more →
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading
              align="left"
              title="Scan to download"
              description="QR placeholder for a future deep link once store listings go live."
            />
            <div className="mt-4 flex flex-wrap gap-4">
              <CTAButton href="/for-employees">For employees</CTAButton>
              <CTAButton href="/signup" variant="outline">
                How signup works
              </CTAButton>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="mx-auto flex h-48 w-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pantri-border bg-pantri-surface p-4 text-center">
              <div className="grid grid-cols-3 gap-1 opacity-40">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-6 w-6 ${i % 2 === 0 ? "bg-pantri-foreground" : "bg-transparent border border-pantri-foreground"}`}
                  />
                ))}
              </div>
              <TrustBadge>QR coming soon</TrustBadge>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}

function StoreButton({
  label,
  href,
  comingSoon,
}: {
  label: string;
  href: string;
  comingSoon: boolean;
}) {
  return (
    <a
      href={href}
      onClick={comingSoon ? (e) => e.preventDefault() : undefined}
      className="relative inline-flex items-center gap-3 rounded-xl border border-pantri-border bg-pantri-surface px-5 py-3 font-semibold text-pantri-foreground shadow-sm transition hover:border-pantri-accent/40"
      aria-disabled={comingSoon}
    >
      <span className="text-xl" aria-hidden>
        {label === "App Store" ? "" : "▶"}
      </span>
      <span className="text-left text-sm leading-tight">
        <span className="block text-[10px] font-medium uppercase tracking-wider text-pantri-muted">
          {comingSoon ? "Coming soon" : "Download on"}
        </span>
        {label}
      </span>
      {comingSoon ? (
        <span className="absolute -top-2 -right-2 rounded-full bg-pantri-primary px-2 py-0.5 text-[10px] font-bold text-white">
          Soon
        </span>
      ) : null}
    </a>
  );
}
