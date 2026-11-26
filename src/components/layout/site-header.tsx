import { Suspense } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { HeaderRow } from "@/components/layout/header-row";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { SiteLink } from "@/components/layout/site-link";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { resolveLink, resolveLinks } from "@/lib/site-links";
import { getContact, getHeader } from "@/lib/site-settings";

export async function SiteHeader() {
  const [header, contact] = await Promise.all([getHeader(), getContact()]);
  const nav = resolveLinks(header.nav, contact.phoneIntl);
  const headerCtas = header.extraCtas.filter((cta) => cta.showInHeader);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_6px_20px_-10px] shadow-ink/40">
      <HeaderRow>
        <BrandLogo brand={header.brand} priority />
        <Suspense fallback={<div className="hidden lg:block" />}>
          <NavLinks links={nav} className="hidden lg:block" />
        </Suspense>
        <div className="flex items-center justify-end gap-2.5">
          {headerCtas.map(({ link, style }) => (
            <Button key={link.label} asChild variant={style === "outline" ? "outline-ink" : "brand"} size="cta" className="hidden h-13 rounded-full normal-case md:inline-flex">
              <SiteLink link={resolveLink(link, contact.phoneIntl)}>{link.label}</SiteLink>
            </Button>
          ))}
          <WhatsAppButton message={header.cta.message} className="hidden h-13 rounded-full text-white normal-case md:inline-flex">
            {header.cta.label}
          </WhatsAppButton>
          <Suspense fallback={null}>
            <MobileNav
              className="lg:hidden"
              brand={header.brand}
              topBar={header.topBar}
              nav={nav}
              cta={header.cta}
              extraCtas={header.extraCtas.map(({ link, style }) => ({ ...resolveLink(link, contact.phoneIntl), style }))}
              contact={{
                phoneDisplay: contact.phoneDisplay,
                phoneIntl: contact.phoneIntl,
                mapsUrl: contact.mapsUrl,
                fullLine: contact.fullLine,
                instagramUrl: contact.instagramUrl,
              }}
            />
          </Suspense>
        </div>
      </HeaderRow>
    </header>
  );
}
