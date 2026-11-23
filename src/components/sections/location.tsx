import { Clock, MapPin } from "lucide-react";
import { doodleLayout } from "@/content/doodles";
import { MapLink } from "@/components/shared/map-link";
import { Section } from "@/components/shared/section";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { revealItem } from "@/lib/reveal";

type LocationProps = {
  eyebrow: string;
  title: string;
  body: string;
  address: string;
  hours: string;
  whatsappLabel: string;
  whatsappMessage: string;
  mapsLabel: string;
  mapsUrl: string;
  contactLine: string;
  contactHref: string;
  mapImage: { src: string; alt: string };
};

export function Location({
  eyebrow,
  title,
  body,
  address,
  hours,
  whatsappLabel,
  whatsappMessage,
  mapsLabel,
  mapsUrl,
  contactLine,
  contactHref,
  mapImage,
}: LocationProps) {
  return (
    <Section doodles={doodleLayout.location} id="lokasi" aria-labelledby="lokasi-judul" className="bg-highlight py-12 lg:py-[72px]">

      <div {...revealItem} className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-16">
        <div className="flex flex-col gap-2">
          <p className="text-xs leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase">{eyebrow}</p>
          <h2
            id="lokasi-judul"
            className="text-[28px] leading-none font-bold text-brand text-balance md:text-[34px] lg:text-[40px]"
          >
            {title}
          </h2>
          <p className="text-[15px] leading-[1.32] text-ink">{body}</p>
          <ul className="mt-1.5 flex flex-col gap-2">
            <li className="flex items-center gap-2.5 text-[15px] leading-[1.32] text-ink">
              <MapPin aria-hidden="true" className="size-5 shrink-0 text-brand" strokeWidth={1.9} />
              <span>{address}</span>
            </li>
            <li className="flex items-center gap-2.5 text-[15px] leading-[1.32] text-ink">
              <Clock aria-hidden="true" className="size-5 shrink-0 text-brand" strokeWidth={1.9} />
              <span>{hours}</span>
            </li>
          </ul>
          <div className="mt-1.5 flex flex-wrap gap-3">
            <WhatsAppButton message={whatsappMessage} variant="brand" size="cta" className="h-12 w-full sm:w-auto">
              {whatsappLabel}
            </WhatsAppButton>
            <Button asChild variant="outline-ink" size="cta" className="h-12 w-full border-[1.8px] sm:w-auto">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                {mapsLabel}
              </a>
            </Button>
          </div>
          <p className="mt-1 text-[13px] leading-[1.3] font-extrabold text-ink">
            <a
              href={contactHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              {contactLine}
            </a>
          </p>
        </div>

        <MapLink
          href={mapsUrl}
          label={mapsLabel}
          image={mapImage}
          sizes="(min-width: 1024px) 640px, (min-width: 768px) 704px, 100vw"
          className="h-60 md:h-80 lg:h-100 lg:max-w-[640px] lg:justify-self-end"
        />
      </div>
    </Section>
  );
}
