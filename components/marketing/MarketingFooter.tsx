import Link from "next/link";
import { Container } from "./primitives";

const FOOTER_COLUMNS = [
  {
    title: "For Employees",
    links: [
      { href: "/for-employees", label: "How it works for you" },
      { href: "/packages", label: "Food packages" },
      { href: "/shop", label: "Marketplace" },
      { href: "/download", label: "Download app" },
    ],
  },
  {
    title: "For Employers",
    links: [
      { href: "/for-employers", label: "Partner with Pantri" },
      { href: "/hr-payroll", label: "HR & Payroll" },
      { href: "/business", label: "Business & bulk" },
      { href: "/contact?topic=Employer%20enquiry", label: "Contact to onboard" },
      { href: "/login", label: "Employer login" },
    ],
  },
  {
    title: "Food",
    links: [
      { href: "/shop", label: "Marketplace" },
      { href: "/packages", label: "Packages" },
      { href: "/events", label: "Event planner" },
      { href: "/nutrition", label: "Nutrition" },
      { href: "/recipes", label: "Recipes" },
      { href: "/delivery", label: "Delivery" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Pantri" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/blog", label: "Food journal" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/help", label: "Help centre" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-pantri-border bg-pantri-charcoal text-white dark:bg-[#0a0a0c]">
      <Container className="py-16">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pantri-accent text-sm font-bold">
                P
              </div>
              <span className="text-xl font-bold">Pantri</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Better food. Smarter living.
            </p>
            <p className="mt-4 text-sm text-white/50">
              A full table today. Room in your paycheck for tomorrow.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Pantri. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/download" className="text-xs text-white/60 hover:text-white">
              App Store
            </Link>
            <Link href="/download" className="text-xs text-white/60 hover:text-white">
              Google Play
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
