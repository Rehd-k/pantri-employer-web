"use client";

import { useTheme, useThemeMounted } from "./ThemeProvider";
import type { ThemePreference } from "@/lib/theme";

const OPTIONS: { value: ThemePreference; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
  { value: "system", label: "System", icon: "💻" },
];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { preference, setPreference } = useTheme();
  const mounted = useThemeMounted();

  if (!mounted) {
    return (
      <div
        className={`rounded-lg bg-pantri-surface-muted ${compact ? "h-9 w-9" : "h-9 w-24"}`}
        aria-hidden
      />
    );
  }

  if (compact) {
    const current = OPTIONS.find((o) => o.value === preference) ?? OPTIONS[2];
    const nextIndex = (OPTIONS.findIndex((o) => o.value === preference) + 1) % OPTIONS.length;
    const next = OPTIONS[nextIndex];

    return (
      <button
        type="button"
        onClick={() => setPreference(next.value)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-pantri-border bg-pantri-surface text-base transition-colors hover:bg-pantri-surface-muted"
        title={`Theme: ${current.label}. Click for ${next.label}.`}
        aria-label={`Theme: ${current.label}. Switch to ${next.label}.`}
      >
        {current.icon}
      </button>
    );
  }

  return (
    <div
      className="flex rounded-full border border-pantri-border bg-pantri-surface-muted p-1"
      role="group"
      aria-label="Theme"
    >
      {OPTIONS.map((option) => {
        const active = preference === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setPreference(option.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              active
                ? "bg-pantri-surface text-pantri-foreground shadow-sm"
                : "text-pantri-muted hover:text-pantri-foreground"
            }`}
            aria-pressed={active}
          >
            <span className="mr-1">{option.icon}</span>
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
