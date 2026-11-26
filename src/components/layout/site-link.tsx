import Link from "next/link";
import type { ResolvedLink } from "@/lib/site-links";

type SiteLinkProps = Omit<React.ComponentProps<"a">, "href"> & { link: Pick<ResolvedLink, "href" | "external"> };

export function SiteLink({ link, children, ...props }: SiteLinkProps) {
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ) : (
    <Link href={link.href} {...props}>
      {children}
    </Link>
  );
}
