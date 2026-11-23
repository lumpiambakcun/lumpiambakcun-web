"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal-item]");
    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty("--reveal-delay", `${Math.min(order++, 5) * 90}ms`);
          el.dataset.revealItem = "shown";
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of targets) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
      el.dataset.revealItem = "hidden";
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      for (const el of targets) {
        if (el.dataset.revealItem === "hidden") el.dataset.revealItem = "";
        el.style.removeProperty("--reveal-delay");
      }
    };
  }, [pathname]);

  return null;
}
