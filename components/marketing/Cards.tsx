import Link from "next/link";
import { formatNaira } from "@/lib/format";
import type { PublicPackageListItem } from "@/lib/marketing";

export function CategoryCard({
  title,
  items,
  emoji,
  href,
}: {
  title: string;
  items: string[];
  emoji: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="pantri-card group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-pantri-accent/30 hover:shadow-lg"
    >
      <span className="mb-4 text-3xl">{emoji}</span>
      <h3 className="text-lg font-bold text-pantri-foreground group-hover:text-pantri-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-pantri-muted">
        {items.slice(0, 5).join(" · ")}
        {items.length > 5 ? " · …" : ""}
      </p>
      <span className="mt-4 text-sm font-semibold text-pantri-accent">Explore →</span>
    </Link>
  );
}

export function PackageCard({
  name,
  description,
  totalKobo,
  itemSummary,
  href,
  popular = false,
}: {
  name: string;
  description: string;
  totalKobo: number;
  itemSummary: string;
  href: string;
  popular?: boolean;
}) {
  const example = calculateExample(totalKobo);

  return (
    <Link
      href={href}
      className="pantri-card group relative flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {popular ? (
        <span className="absolute -top-3 right-4 rounded-full bg-pantri-accent px-3 py-1 text-xs font-semibold text-white">
          Popular
        </span>
      ) : null}
      <h3 className="text-xl font-bold text-pantri-foreground">{name}</h3>
      <p className="mt-2 flex-1 text-sm text-pantri-muted">{description || itemSummary}</p>
      <div className="mt-4 space-y-1 border-t border-pantri-border pt-4">
        <p className="text-sm text-pantri-muted">
          From <span className="font-bold text-pantri-foreground">{formatNaira(totalKobo)}</span>
        </p>
        <p className="text-xs text-pantri-muted">
          e.g. {formatNaira(example.initial)} upfront · {formatNaira(example.monthly)}/mo × 6
        </p>
      </div>
      <span className="mt-4 text-sm font-semibold text-pantri-accent">View package →</span>
    </Link>
  );
}

function calculateExample(totalKobo: number) {
  const initial = Math.round(totalKobo * 0.2);
  const monthly = Math.round((totalKobo - initial) / 6);
  return { initial, monthly };
}

export function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="pantri-card p-6">
      <span className="text-2xl">{icon}</span>
      <h3 className="mt-4 text-lg font-bold text-pantri-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-pantri-muted">{description}</p>
    </div>
  );
}

export function TestimonialCard({
  quote,
  role,
  placeholder = true,
}: {
  quote: string;
  role: string;
  placeholder?: boolean;
}) {
  return (
    <blockquote className="pantri-card p-6">
      {placeholder ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-pantri-muted">
          Placeholder testimonial
        </p>
      ) : null}
      <p className="text-sm leading-relaxed text-pantri-foreground">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-4 text-sm font-semibold text-pantri-muted">— {role}</footer>
    </blockquote>
  );
}

export function PackageCardFromApi({ pkg }: { pkg: PublicPackageListItem }) {
  return (
    <PackageCard
      name={pkg.name}
      description={pkg.description}
      totalKobo={pkg.pricing.totalKobo}
      itemSummary={pkg.itemSummary}
      href={`/packages/${pkg.id}`}
      popular={pkg.isPopular}
    />
  );
}
