import Link from "next/link";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href: string };

type BreadcrumbProps = {
  items: readonly Crumb[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 text-xs leading-[1.28] text-ink">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.href} className={cn("flex items-center gap-1.5", current && "font-semibold")}>
              {index > 0 && <span aria-hidden="true">/</span>}
              {current ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href} className="rounded-sm transition-colors hover:text-brand">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
