"use client";

// One of the four permitted client components (§2.1).
// Every answer stays rendered in the DOM at all times — collapse is purely
// CSS grid-template-rows (0fr → 1fr), so crawlers and no-JS readers get the
// text (§6). aria-expanded / aria-controls wired per item; 320ms motion (§5.4).

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  items: Array<{ q: string; a: string }>;
  /** Unique per accordion instance on a page, for stable element ids. */
  idPrefix?: string;
};

export function FaqAccordion({ items, idPrefix = "faq" }: FaqAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  const toggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="divide-y divide-graphite/20 border-y border-graphite/20">
      {items.map((item, index) => {
        const open = openItems.has(index);
        const buttonId = `${idPrefix}-${index}-button`;
        const panelId = `${idPrefix}-${index}-panel`;
        return (
          <div key={item.q}>
            <h3 className="text-base font-medium leading-normal tracking-normal">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex min-h-[44px] w-full items-center justify-between gap-4 py-4 text-left text-scrub"
              >
                {item.q}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-graphite transition-transform duration-320 ease-clinic",
                    open && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-320 ease-clinic",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[68ch] pb-5 text-graphite">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
