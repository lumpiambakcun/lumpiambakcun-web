"use client";

import { usePathname } from "next/navigation";
import { SiteLink } from "@/components/layout/site-link";
import type { ResolvedLink } from "@/lib/site-links";
import { cn } from "@/lib/utils";

export function NavLinks({ links, className }: { links: readonly ResolvedLink[]; className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Menu utama" className={className}>
      <ul className="flex items-center gap-7">
        {links.map((link) => {
          const active = link.href === pathname;
          return (
            <li key={`${link.label}-${link.href}`}>
              <SiteLink
                link={link}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block rounded-sm py-1 text-sm leading-[1.3] font-semibold text-ink transition-colors hover:text-brand",
                  active && "font-extrabold text-brand",
                )}
              >
                {link.label}
              </SiteLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
