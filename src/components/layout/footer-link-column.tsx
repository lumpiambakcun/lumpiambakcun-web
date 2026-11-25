import Link from "next/link";
import { footerColumnLabel, footerRowLink, footerRowText } from "@/components/layout/footer-styles";
import { cn } from "@/lib/utils";

export type FooterLink = { label: string; href: string; external?: boolean };

export function FooterLinkColumn({ title, links }: { title: string; links: readonly FooterLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className={footerColumnLabel}>{title}</h2>
      <ul className="flex flex-col gap-3.5 md:gap-4">
        {links.map(({ label, href, external }) => (
          <li key={label}>
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(footerRowText, footerRowLink, "block w-fit")}
              >
                {label}
              </a>
            ) : (
              <Link href={href} className={cn(footerRowText, footerRowLink, "block w-fit")}>
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
