"use client";

// One of the four permitted client components (§2.1).
// Fixed bottom bar, mobile only, appears after 400px of scroll (§6).
// Two halves: Call (tel:) and WhatsApp (wa.me deep link, §8.3).

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { clinic } from "@/content/clinic";
import { whatsappUrl } from "@/lib/utils";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t bg-enamel md:hidden">
      <a
        href={`tel:${clinic.phone}`}
        className="flex min-h-[56px] items-center justify-center gap-2 bg-scrub font-medium text-enamel"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call the clinic
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener"
        className="flex min-h-[56px] items-center justify-center gap-2 bg-clinic font-medium text-enamel"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}
