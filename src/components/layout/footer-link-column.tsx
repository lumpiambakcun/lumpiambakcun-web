import { footerColumnLabel, footerRowLink, footerRowText } from "@/components/layout/footer-styles";
import { SiteLink } from "@/components/layout/site-link";
import type { ResolvedLink } from "@/lib/site-links";
import { cn } from "@/lib/utils";

export function FooterLinkColumn({ title, links }: { title: string; links: readonly ResolvedLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className={footerColumnLabel}>{title}</h2>
      <ul className="flex flex-col gap-3.5 md:gap-4">
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <SiteLink link={link} className={cn(footerRowText, footerRowLink, "block w-fit")}>
              {link.label}
            </SiteLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
