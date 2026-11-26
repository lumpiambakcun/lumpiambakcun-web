import { Clock, MapPin, Phone } from "lucide-react";
import type { ComponentProps } from "react";
import { InstagramIcon } from "@/components/icons/brand-icons";
import type { LocationInfoCardProps } from "@/components/sections/location-info-card";
import type { ChannelCard } from "@/components/shared/channel-card";
import { businessConfig, orderChannels } from "@/config/site";
import { buildLocation } from "@/content/beranda";
import type { Contact } from "@/lib/site-settings-schema";

export const buildLokasiPage = (contact: Contact) => {
  const location = buildLocation(contact);
  return {
  card: {
    name: "Lumpia Mbak Cun",
    rating: `${String(businessConfig.rating.value).replace(".", ",")} dari ${businessConfig.rating.count} ulasan ${businessConfig.rating.source}`,
    rows: [
      { icon: MapPin, label: "Alamat", value: contact.address.postalLine, href: contact.mapsUrl, external: true },
      { icon: Clock, label: "Jam buka", value: `Setiap hari, ${contact.hours.opens} sampai ${contact.hours.closes}` },
      { icon: Phone, label: "Telepon dan WhatsApp", value: contact.phoneDisplay, href: location.contactHref, external: true },
      ...(contact.instagramUrl
        ? [{ icon: InstagramIcon, label: "Instagram", value: `@${contact.instagramUrl.split("/").filter(Boolean).pop()}`, href: contact.instagramUrl, external: true }]
        : []),
    ],
    whatsappLabel: location.whatsappLabel,
    whatsappMessage: location.whatsappMessage,
    mapsLabel: location.mapsLabel,
    mapsUrl: location.mapsUrl,
  } satisfies LocationInfoCardProps,
  map: location.mapImage,
  apps: {
    eyebrow: "Malas keluar rumah?",
    title: "Pesan lewat aplikasi",
  },
  };
};

const logoWidth: Record<string, number> = { gofood: 52, grabfood: 68, shopeefood: 52 };

export const orderAppChannels: ComponentProps<typeof ChannelCard>[] = orderChannels.map((channel) => ({
  href: channel.href,
  name: channel.label,
  description: "Cari Lumpia Mbak Cun, pesan, tunggu diantar.",
  logo: {
    src: channel.icon.src,
    alt: "",
    width: logoWidth[channel.id] ?? 52,
    height: 52,
  },
}));
