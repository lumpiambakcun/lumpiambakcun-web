import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { SocialIcon } from "@/components/icons/social-icon";
import { FooterLinkColumn } from "@/components/layout/footer-link-column";
import { footerColumnLabel, footerRowLink, footerRowText } from "@/components/layout/footer-styles";
import { Container } from "@/components/shared/container";
import { businessConfig } from "@/config/site";
import { resolveLinks } from "@/lib/site-links";
import { getFooter, getHeader } from "@/lib/site-settings";
import { deriveContact, socialLabels } from "@/lib/site-settings-schema";
import { revealItem } from "@/lib/reveal";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const gridColumns: Record<number, string> = {
  0: "lg:grid-cols-[minmax(0,330px)_1.3fr]",
  1: "lg:grid-cols-[minmax(0,330px)_1fr_1.3fr]",
  2: "lg:grid-cols-[minmax(0,330px)_1fr_1fr_1.3fr]",
  3: "lg:grid-cols-[minmax(0,330px)_1fr_1fr_1fr_1.3fr]",
};

export async function SiteFooter() {
  const [footer, { brand }] = await Promise.all([getFooter(), getHeader()]);
  const contact = deriveContact(footer);
  return (
    <footer className="bg-brand-deep text-cream">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/images/brand/pattern.webp')] bg-cover bg-center opacity-[0.035]"
        />
        <Container {...revealItem} className="relative py-14 md:py-20">
          <div className={cn("grid grid-cols-2 gap-x-6 gap-y-10 md:gap-y-9 lg:gap-x-12", gridColumns[footer.columns.length])}>
            <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
              <div className="flex items-center gap-3">
                <Image src={footer.logoUrl} alt={brand.name} width={500} height={458} className="h-[66px] w-[72px] shrink-0 object-contain" />
                <div className="flex min-w-0 flex-col">
                  <span className="font-heading text-[22px] leading-none font-bold text-cream">{brand.name}</span>
                  <span className="text-xs leading-[1.28] font-semibold whitespace-nowrap text-cream/80">{brand.tagline}</span>
                </div>
              </div>
              <p className="max-w-[280px] text-sm leading-[1.32]">{footer.description}</p>
              <p className="flex items-center gap-2.5 text-xs leading-[1.28] opacity-70">
                <Image
                  src={businessConfig.halalLogo.src}
                  width={businessConfig.halalLogo.width}
                  height={businessConfig.halalLogo.height}
                  alt={businessConfig.halalLogo.alt}
                  className="h-8 w-auto shrink-0 brightness-0 invert"
                />
                <span className="flex flex-col gap-0.5">
                  <span>Halal BPJPH No.</span>
                  <span>{contact.halalNumber}</span>
                </span>
              </p>
              {footer.social.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2.5">
                  {footer.social.map(({ platform, url }) => (
                    <li key={`${platform}-${url}`}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-9 items-center gap-2 rounded-full border-[1.5px] border-highlight px-3.5 text-[13px] font-bold text-highlight transition-colors hover:bg-highlight hover:text-ink motion-reduce:transition-none"
                      >
                        <SocialIcon platform={platform} className="size-4" />
                        {socialLabels[platform]}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {footer.columns.map((column) => (
              <FooterLinkColumn key={column.title} title={column.title} links={resolveLinks(column.links, contact.phoneIntl)} />
            ))}

            <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
              <h2 className={footerColumnLabel}>Kontak</h2>
              <ul className="flex flex-col gap-5">
                <li>
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(footerRowText, footerRowLink, "flex max-w-[308px] items-start gap-2.5")}
                  >
                    <MapPin aria-hidden="true" className="mt-px size-[18px] shrink-0 text-highlight" />
                    <span>{contact.address.postalLine}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl(contact.phoneIntl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(footerRowText, footerRowLink, "flex w-fit items-center gap-2.5")}
                  >
                    <WhatsAppIcon className="size-[18px] shrink-0 text-highlight" />
                    <span>Chat via WhatsApp</span>
                  </a>
                </li>
                <li className={cn(footerRowText, "flex items-start gap-2.5")}>
                  <Clock aria-hidden="true" className="mt-px size-[18px] shrink-0 text-highlight" />
                  <span>
                    {contact.hours.opens} – {contact.hours.closes} WIB
                    <br />
                    Setiap hari
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      <div className="flex h-[70px] items-center bg-ink-soft">
        <Container>
          <p className="text-center text-xs leading-[1.28]">{footer.copyright}</p>
        </Container>
      </div>
    </footer>
  );
}
