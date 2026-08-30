import { formatNaira } from "@/lib/format";
import type { EventEstimate, EventType } from "@/lib/event-planner";
import { CTAButton } from "../primitives";

export function EventResults({
  estimate,
  eventType,
  guests,
}: {
  estimate: EventEstimate;
  eventType: EventType;
  guests: number;
}) {
  return (
    <div className="pantri-card space-y-6 p-6 sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-pantri-accent">
          Illustrative estimate
        </p>
        <h3 className="mt-2 text-xl font-bold text-pantri-foreground">
          {eventType} · {guests} guests
        </h3>
        <p className="mt-1 text-sm text-pantri-muted">
          Cost range{" "}
          <span className="font-semibold text-pantri-foreground">
            {formatNaira(estimate.estimatedCostLowKobo)} –{" "}
            {formatNaira(estimate.estimatedCostHighKobo)}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Rice" value={`${estimate.riceKg} kg`} />
        <Stat label="Oil" value={`${estimate.oilLitres} L`} />
        <Stat label="Protein" value={`${estimate.proteinPortions}`} />
        <Stat label="Drinks" value={`${estimate.softDrinksCrates} crates`} />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-pantri-foreground">Suggested shopping list</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-pantri-muted">
          {estimate.shoppingList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-pantri-surface-muted p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-pantri-muted">
          Recommended package tier
        </p>
        <p className="mt-1 font-semibold text-pantri-foreground">{estimate.packageTier}</p>
        <p className="mt-3 text-sm text-pantri-muted">
          Example with 20% + 6 months on midpoint{" "}
          {formatNaira(estimate.midpointKobo)}:{" "}
          <span className="font-semibold text-pantri-foreground">
            {formatNaira(estimate.paymentExample.initialKobo)} upfront ·{" "}
            {formatNaira(estimate.paymentExample.monthlyKobo)}/mo ×{" "}
            {estimate.paymentExample.months}
          </span>
        </p>
      </div>

      <p className="text-sm leading-relaxed text-pantri-muted">{estimate.deliveryHint}</p>

      <div className="flex flex-wrap gap-3">
        <CTAButton href="/packages">Browse packages</CTAButton>
        <CTAButton href="/contact?topic=General" variant="outline">
          Talk to Pantri
        </CTAButton>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-pantri-surface-muted p-3">
      <p className="text-xs text-pantri-muted">{label}</p>
      <p className="mt-1 text-sm font-bold text-pantri-foreground">{value}</p>
    </div>
  );
}
