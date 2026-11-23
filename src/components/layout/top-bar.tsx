import { MapPin, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/brand-icons";
import { Container } from "@/components/shared/container";
import { businessConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

const infoLink =
  " -mx-1 flex items-center gap-1.5 rounded-sm px-1 text-[11px] leading-[1.28] text-white transition-colors hover:text-highlight md:text-xs";

const socialLink =
  "flex size-6 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-highlight hover:text-ink active:scale-95";

export function TopBar() {
  return (
    <div className="bg-ink">
      <Container className="flex items-center gap-3 py-1.5 md:gap-4 md:py-[9px] lg:gap-6">
        <a href={`tel:+${businessConfig.phoneIntl}`} className={infoLink}>
          <Phone aria-hidden="true" className="size-3.5 shrink-0" />
          <span>Pesan: {businessConfig.phoneDisplay}</span>
        </a>
        <a
          href={businessConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${infoLink} hidden md:flex`}
        >
          <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
          <span>{businessConfig.address.shortLine}</span>
        </a>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={businessConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Lumpia Mbak Cun"
            className={socialLink}
          >
            <InstagramIcon className="size-3" />
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Lumpia Mbak Cun"
            className={socialLink}
          >
            <WhatsAppIcon className="size-3.5" />
          </a>
          <a
            href={businessConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lokasi di Google Maps"
            className={socialLink}
          >
            <MapPin aria-hidden="true" className="size-3" />
          </a>
        </div>
      </Container>
    </div>
  );
}
