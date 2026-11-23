import { DeliveryScooterIcon, InstagramIcon } from "@/components/icons/brand-icons";
import { BrandLogo } from "@/components/layout/brand-logo";
import { HeaderRow } from "@/components/layout/header-row";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { businessConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white">
      <HeaderRow>
        <BrandLogo priority />
        <NavLinks className="hidden lg:block" />
        <div className="flex items-center justify-end gap-2.5">
          <a
            href={businessConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Lumpia Mbak Cun"
            className="hidden size-[53px] items-center justify-center rounded-btn border-2 border-brand bg-white text-brand transition-colors hover:bg-brand hover:text-highlight active:scale-95 motion-reduce:transition-none md:flex"
          >
            <InstagramIcon className="size-6" />
          </a>
          <a
            href={whatsappUrl("Halo Mbak Cun, saya mau pesan lumpia.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Pesan lewat WhatsApp ${businessConfig.phoneDisplay}`}
            className="hidden items-center gap-2.5 rounded-btn bg-brand py-2 pr-6 pl-[18px] text-white transition-colors hover:bg-brand-hover active:translate-y-px motion-reduce:transition-none md:flex"
          >
            <DeliveryScooterIcon className="h-[34px] w-14 shrink-0" />
            <span className="flex flex-col">
              <span className="font-heading text-xs leading-[1.28] font-semibold">Pesan lewat WhatsApp</span>
              <span className="font-heading text-xl leading-[1.12] font-bold whitespace-nowrap">{businessConfig.phoneDisplay}</span>
            </span>
          </a>
          <MobileNav className="lg:hidden" />
        </div>
      </HeaderRow>
    </header>
  );
}
