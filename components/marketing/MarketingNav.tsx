"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { Container, CTAButton } from "./primitives";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/packages", label: "Packages" },
  { href: "/events", label: "Events" },
  { href: "/nutrition", label: "Nutrition" },
  { href: "/recipes", label: "Recipes" },
  { href: "/for-employers", label: "For Employers" },
  { href: "/about", label: "About" },
];

function linkIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MarketingNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-pantri-border/60 bg-pantri-background/90 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center" onClick={close}>
            <BrandLogo variant="lockup" height={30} priority className="max-w-[140px] sm:max-w-none" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = linkIsActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-pantri-primary/10 text-pantri-primary"
                      : "text-pantri-muted hover:text-pantri-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <ThemeToggle compact />
            <Link
              href="/login"
              className="text-sm font-semibold text-pantri-primary hover:text-pantri-accent"
            >
              Log in
            </Link>
            <CTAButton
              href="/contact?topic=Employer%20enquiry"
              variant="primary"
              className="px-5 py-2.5 text-sm"
            >
              Partner with us
            </CTAButton>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle compact />
            <button
              type="button"
              className="rounded-lg p-2 text-pantri-foreground"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open ? (
          <nav className="border-t border-pantri-border py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = linkIsActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-pantri-surface ${
                      active
                        ? "bg-pantri-primary/10 text-pantri-primary"
                        : "text-pantri-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-3 flex flex-col gap-2 border-t border-pantri-border pt-3">
                <ThemeToggle />
                <Link
                  href="/login"
                  onClick={close}
                  className="px-3 py-2 text-sm font-semibold text-pantri-primary"
                >
                  Log in
                </Link>
                <Link
                  href="/contact?topic=Employer%20enquiry"
                  onClick={close}
                  className="mx-3 inline-flex items-center justify-center rounded-full bg-pantri-accent px-6 py-3 text-center text-sm font-semibold text-white shadow-md"
                >
                  Partner with us
                </Link>
              </div>
            </div>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
