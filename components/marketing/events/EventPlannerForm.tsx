"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  EVENT_TYPES,
  FOOD_PREFERENCES,
  estimateEventFood,
  type EventEstimate,
  type EventType,
  type FoodPreference,
} from "@/lib/event-planner";
import { EventResults } from "./EventResults";

export function EventPlannerForm() {
  const [eventType, setEventType] = useState<EventType>("Wedding");
  const [guests, setGuests] = useState(100);
  const [budgetNaira, setBudgetNaira] = useState("");
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState<FoodPreference[]>([
    "Rice & grains",
    "Protein (chicken/beef/fish)",
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<EventEstimate | null>(null);

  function togglePreference(pref: FoodPreference) {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref],
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!guests || guests < 1) next.guests = "Enter at least 1 guest";
    if (guests > 5000) next.guests = "Please enter 5,000 guests or fewer for this estimator";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    setEstimate(null);
    await new Promise((r) => setTimeout(r, 300));
    const result = estimateEventFood({
      eventType,
      guests,
      budgetNaira: budgetNaira ? Number(budgetNaira) : undefined,
      location: location.trim() || undefined,
      preferences,
    });
    setEstimate(result);
    setLoading(false);
    requestAnimationFrame(() => {
      document.getElementById("event-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="pantri-card space-y-5 p-6 sm:p-8" noValidate>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-pantri-muted">Event type</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
            {EVENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setEventType(type)}
                className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  eventType === type
                    ? "border-pantri-accent bg-pantri-accent/10 text-pantri-accent"
                    : "border-pantri-border text-pantri-foreground hover:border-pantri-accent/40"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-pantri-muted">Number of guests</span>
          <input
            type="number"
            min={1}
            max={5000}
            className="pantri-input"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value) || 0)}
          />
          {errors.guests ? <p className="mt-1 text-xs text-red-600">{errors.guests}</p> : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-pantri-muted">
            Budget (₦) <span className="font-normal">(optional)</span>
          </span>
          <input
            type="number"
            min={0}
            step={10000}
            className="pantri-input"
            value={budgetNaira}
            onChange={(e) => setBudgetNaira(e.target.value)}
            placeholder="e.g. 1500000"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-pantri-muted">
            Location <span className="font-normal">(optional)</span>
          </span>
          <input
            type="text"
            className="pantri-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Lekki, Lagos"
          />
        </label>

        <div>
          <p className="mb-2 text-sm font-medium text-pantri-muted">Food preferences</p>
          <div className="flex flex-wrap gap-2">
            {FOOD_PREFERENCES.map((pref) => {
              const on = preferences.includes(pref);
              return (
                <button
                  key={pref}
                  type="button"
                  onClick={() => togglePreference(pref)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    on
                      ? "bg-pantri-primary text-white"
                      : "border border-pantri-border bg-pantri-surface text-pantri-muted"
                  }`}
                >
                  {pref}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full bg-pantri-accent px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Estimating…" : "Plan My Event"}
        </button>
      </form>

      <div id="event-results">
        {loading ? (
          <div className="pantri-card flex h-64 items-center justify-center p-8">
            <p className="animate-pulse text-sm text-pantri-muted">Building your estimate…</p>
          </div>
        ) : estimate ? (
          <EventResults estimate={estimate} eventType={eventType} guests={guests} />
        ) : (
          <div className="pantri-card flex h-64 flex-col items-center justify-center p-8 text-center">
            <p className="font-semibold text-pantri-foreground">Your estimate appears here</p>
            <p className="mt-2 text-sm text-pantri-muted">
              Choose an event type and guest count, then tap Plan My Event.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
