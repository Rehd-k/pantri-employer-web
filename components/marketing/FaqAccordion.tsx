"use client";

import { useState } from "react";
import { FAQ_HOMEPAGE, type FaqItem } from "@/lib/faq";

export function FaqAccordion({ items = FAQ_HOMEPAGE }: { items?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-pantri-border pantri-card overflow-hidden">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-semibold text-pantri-foreground">{item.q}</span>
              <span
                className={`shrink-0 text-xl text-pantri-accent transition-transform ${open ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {open ? (
              <p className="px-6 pb-5 text-sm leading-relaxed text-pantri-muted">{item.a}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
