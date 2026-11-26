import type { SiteLink } from "@/lib/site-settings-schema";
import { whatsappUrl } from "@/lib/whatsapp";

export type ResolvedLink = { label: string; href: string; external: boolean };

export function resolveLink({ label, kind, value }: SiteLink, phoneIntl: string): ResolvedLink {
  return { label, href: kind === "whatsapp" ? whatsappUrl(phoneIntl, value) : value, external: kind !== "internal" };
}

export const resolveLinks = (links: readonly SiteLink[], phoneIntl: string) => links.map((link) => resolveLink(link, phoneIntl));
