"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/config/site";
import { cn } from "@/lib/utils";

export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Menu utama" className={className}>
      <ul className="flex items-center gap-7">
        {navLinks.map((link) => {
          const active = link.href === pathname;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block rounded-sm py-1 text-sm leading-[1.3] font-semibold text-ink transition-colors hover:text-brand",
                  active && "font-extrabold text-brand",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
