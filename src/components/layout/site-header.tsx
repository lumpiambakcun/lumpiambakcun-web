import { Suspense } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { HeaderRow } from "@/components/layout/header-row";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_6px_20px_-10px] shadow-ink/40">
      <HeaderRow>
        <BrandLogo priority />
        <Suspense fallback={<div className="hidden lg:block" />}>
          <NavLinks className="hidden lg:block" />
        </Suspense>
        <div className="flex items-center justify-end gap-2.5">
          <WhatsAppButton message="Halo Mbak Cun, saya mau pesan lumpia." className="hidden h-13 rounded-full text-white normal-case md:inline-flex">
            Pesan via WhatsApp
          </WhatsAppButton>
          <Suspense fallback={null}>
            <MobileNav className="lg:hidden" />
          </Suspense>
        </div>
      </HeaderRow>
    </header>
  );
}
