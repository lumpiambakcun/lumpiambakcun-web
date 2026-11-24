import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Container } from "@/components/shared/container";
import { businessConfig, orderChannels, siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { revealItem } from "@/lib/reveal";

const columnLabel = "text-xs leading-[1.2] font-extrabold tracking-[0.08em] text-highlight uppercase";
const rowText = "text-[13px] leading-[1.32] text-white";
const rowLink = "rounded-sm underline-offset-4 transition-colors hover:text-highlight hover:underline motion-reduce:transition-none";

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep text-cream">
      <div aria-hidden="true" className="h-1 bg-highlight" />
      <Container {...revealItem} className="flex flex-col gap-[26px] pt-11 pb-[26px]">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[minmax(0,330px)_minmax(0,330px)_1fr] lg:gap-x-12 xl:gap-x-[110px]">
          <div className="flex flex-col gap-3">
            <Image
              src="/images/brand/emblem.webp"
              alt={siteConfig.name}
              width={110}
              height={101}
              className="h-[101px] w-[110px]"
            />
            <p className="max-w-[250px] text-[13px] leading-[1.28]">
              {businessConfig.tagline}. Resep keluarga sejak 1998, halal, tanpa pengawet &amp; MSG.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className={columnLabel}>Kunjungi</h2>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={businessConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    rowText,
                    rowLink,
                    "flex max-w-[308px] items-start gap-2.5",
                  )}
                >
                  <MapPin aria-hidden="true" className="mt-px size-[18px] shrink-0 text-highlight" />
                  <span>{businessConfig.address.fullLine}</span>
                </a>
              </li>
              <li className={cn(rowText, "flex items-start gap-2.5")}>
                <Clock aria-hidden="true" className="mt-px size-[18px] shrink-0 text-highlight" />
                <span>Setiap hari, {businessConfig.hours.opens} sampai {businessConfig.hours.closes}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className={columnLabel}>Pesan</h2>
            <ul className="flex flex-col gap-2.5">
              <li>
                <FooterChannel
                  href={whatsappUrl()}
                  label={`WhatsApp ${businessConfig.phoneDisplay}`}
                  chipClassName="bg-white"
                  icon={<WhatsAppIcon className="size-4 text-whatsapp" />}
                />
              </li>
              {orderChannels.map((channel) => (
                <li key={channel.id}>
                  <FooterChannel
                    href={channel.href}
                    label={channel.label}
                    chipClassName={channel.chipClass}
                    icon={
                      <Image
                        src={channel.icon.src}
                        alt=""
                        width={channel.icon.width}
                        height={channel.icon.height}
                        className="object-contain"
                        style={{ width: channel.icon.width, height: channel.icon.height }}
                      />
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden="true" className="h-px bg-white/15" />

        <div className="flex flex-col gap-1 text-xs leading-[1.28] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {businessConfig.copyrightYear} {siteConfig.name}
          </p>
          <p className="flex items-center gap-2.5">
            <span className="flex rounded bg-white p-1">
              <Image src={businessConfig.halalLogo.src} width={businessConfig.halalLogo.width} height={businessConfig.halalLogo.height} alt={businessConfig.halalLogo.alt} className="h-6 w-auto" />
            </span>
            {businessConfig.halalCertificate}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterChannel({
  href,
  label,
  icon,
  chipClassName,
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
  chipClassName: string;
}) {
  const content = (
    <>
      <span className={cn("flex size-[26px] shrink-0 items-center justify-center rounded-[7px]", chipClassName)}>
        {icon}
      </span>
      <span>{label}</span>
    </>
  );

  if (!href) {
    return <span className={cn(rowText, "flex items-center gap-2.5")}>{content}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        rowText,
        rowLink,
        "flex w-fit items-center gap-2.5",
      )}
    >
      {content}
    </a>
  );
}
