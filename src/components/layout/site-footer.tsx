import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons/brand-icons";
import { FooterLinkColumn, type FooterLink } from "@/components/layout/footer-link-column";
import { footerColumnLabel, footerRowLink, footerRowText } from "@/components/layout/footer-styles";
import { Container } from "@/components/shared/container";
import { businessConfig, siteConfig } from "@/config/site";
import { menuPage } from "@/content/menu";
import { listCategories } from "@/lib/products";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { revealItem } from "@/lib/reveal";

const socialLinks = [
  { label: "Instagram", href: businessConfig.instagramUrl, Icon: InstagramIcon },
  { label: "TikTok", href: businessConfig.tiktokUrl, Icon: TikTokIcon },
];

const pageLinks: FooterLink[] = [
  { label: "Paket Lumpia", href: "/#menu" },
  { label: "Keunggulan", href: "/#keunggulan" },
  { label: "Testimoni", href: "/#testimoni" },
  { label: "FAQ", href: "/#faq" },
  { label: "Artikel", href: "/artikel" },
];

const inquiry = (item: string) => whatsappUrl(`Halo Mbak Cun, saya mau tanya ketersediaan dan harga ${item}.`);

const buildMenuLinks = (categories: readonly { id: string; label: string }[]): FooterLink[] => [
  { label: "Lumpia Mentah", href: "/#menu" },
  { label: "Lumpia Goreng", href: "/#menu" },
  ...categories
    .filter(({ id }) => id !== "lumpia")
    .map(({ label }) => ({ label, href: inquiry(label), external: true })),
  { label: "Pesanan Acara", href: whatsappUrl(menuPage.cta.message), external: true },
];

export async function SiteFooter() {
  const menuLinks = buildMenuLinks(await listCategories());
  return (
    <footer className="bg-brand-deep text-cream">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/images/brand/pattern.webp')] bg-cover bg-center opacity-[0.035]"
        />
        <Container {...revealItem} className="relative py-14 md:py-20">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-y-9 lg:grid-cols-[minmax(0,330px)_1fr_1fr_1.3fr] lg:gap-x-12">
            <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/brand/logo-footer.webp"
                  alt={siteConfig.name}
                  width={500}
                  height={458}
                  className="h-[66px] w-[72px] shrink-0"
                />
                <div className="flex min-w-0 flex-col">
                  <span className="font-heading text-[22px] leading-none font-bold text-cream">{siteConfig.name}</span>
                  <span className="text-xs leading-[1.28] font-semibold whitespace-nowrap text-cream/80">
                    {businessConfig.brandLine}
                  </span>
                </div>
              </div>
              <p className="max-w-[280px] text-sm leading-[1.32]">
                Lumpia isi rebung, telur, dan udang dengan rasa gurih, renyah, dan autentik khas Semarang.
              </p>
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
                  <span>{businessConfig.halalNumber}</span>
                </span>
              </p>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {socialLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center gap-2 rounded-full border-[1.5px] border-highlight px-3.5 text-[13px] font-bold text-highlight transition-colors hover:bg-highlight hover:text-ink motion-reduce:transition-none"
                    >
                      <Icon className="size-4" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            <FooterLinkColumn title="Halaman" links={pageLinks} />
            <FooterLinkColumn title="Menu" links={menuLinks} />
  
            <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
              <h2 className={footerColumnLabel}>Kontak</h2>
              <ul className="flex flex-col gap-5">
                <li>
                  <a
                    href={businessConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(footerRowText, footerRowLink, "flex max-w-[308px] items-start gap-2.5")}
                  >
                    <MapPin aria-hidden="true" className="mt-px size-[18px] shrink-0 text-highlight" />
                    <span>{businessConfig.address.postalLine}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl()}
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
                    {businessConfig.hours.opens} – {businessConfig.hours.closes} WIB
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
          <p className="text-center text-xs leading-[1.28]">
            &copy; {businessConfig.copyrightYear} {siteConfig.name}
          </p>
        </Container>
      </div>
    </footer>
  );
}
