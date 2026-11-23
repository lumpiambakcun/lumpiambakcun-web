import { LocationInfoCard } from "@/components/sections/location-info-card";
import { OrderApps } from "@/components/sections/order-apps";
import { JsonLd } from "@/components/seo/json-ld";
import { MapLink } from "@/components/shared/map-link";
import { Section } from "@/components/shared/section";
import { doodleLayout } from "@/content/doodles";
import { lokasiPage, orderAppChannels } from "@/content/lokasi";
import { pageMetadata } from "@/lib/seo";
import { localBusinessJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata("/lokasi");

export default function LokasiPage() {
  const { card, map, apps } = lokasiPage;
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Section doodles={doodleLayout.lokasiInfo} className="bg-white pt-6 pb-6 md:pt-9 md:pb-10 lg:pt-14 lg:pb-16">
        <div className="relative grid gap-3 md:gap-4 lg:grid-cols-[520px_minmax(0,1fr)] lg:gap-10">
          <LocationInfoCard {...card} />
          <MapLink
            href={card.mapsUrl}
            label={card.mapsLabel}
            image={map}
            sizes="(min-width: 1440px) 730px, (min-width: 768px) 704px, 100vw"
            className="h-60 md:h-[300px] lg:h-auto lg:min-h-[470px]"
          />
        </div>
      </Section>
      <OrderApps {...apps} channels={orderAppChannels} doodles={doodleLayout.lokasiApps} />
    </>
  );
}
