import type { ComponentProps } from "react";
import { InfoRow } from "@/components/shared/info-row";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { revealItem } from "@/lib/reveal";

export type LocationInfoCardProps = {
  name: string;
  rating: string;
  rows: ComponentProps<typeof InfoRow>[];
  whatsappLabel: string;
  whatsappMessage: string;
  mapsLabel: string;
  mapsUrl: string;
};

export function LocationInfoCard({ name, rating, rows, whatsappLabel, whatsappMessage, mapsLabel, mapsUrl }: LocationInfoCardProps) {
  return (
    <div {...revealItem} className="flex flex-col gap-5 rounded-panel border border-border bg-cream p-8 md:min-h-[460px] lg:self-start">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-[30px] leading-[1.08] font-bold text-ink">{name}</h1>
        <p className="text-[13px] leading-[1.28] text-ink">{rating}</p>
      </div>
      {rows.map((row) => (
        <InfoRow key={row.label} {...row} />
      ))}
      <div className="flex flex-col gap-3 md:flex-row">
        <WhatsAppButton message={whatsappMessage} variant="brand" className="h-12 w-full md:w-auto">
          {whatsappLabel}
        </WhatsAppButton>
        <Button asChild variant="outline-ink" size="cta" className="h-12 w-full border-[1.8px] md:w-auto">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
            {mapsLabel}
          </a>
        </Button>
      </div>
    </div>
  );
}
