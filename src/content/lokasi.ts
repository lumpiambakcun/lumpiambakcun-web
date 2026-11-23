import { Clock, MapPin, Phone } from "lucide-react";
import type { ComponentProps } from "react";
import { InstagramIcon } from "@/components/icons/brand-icons";
import type { LocationInfoCardProps } from "@/components/sections/location-info-card";
import type { ChannelCard } from "@/components/shared/channel-card";
import { businessConfig, orderChannels } from "@/config/site";
import { location } from "@/content/beranda";

export const lokasiPage = {
  card: {
    name: "Lumpia Mbak Cun",
    rating: `${String(businessConfig.rating.value).replace(".", ",")} dari ${businessConfig.rating.count} ulasan ${businessConfig.rating.source}`,
    rows: [
      { icon: MapPin, label: "Alamat", value: businessConfig.address.postalLine, href: businessConfig.mapsUrl, external: true },
      { icon: Clock, label: "Jam buka", value: `Setiap hari, ${businessConfig.hours.opens} sampai ${businessConfig.hours.closes}` },
      { icon: Phone, label: "Telepon dan WhatsApp", value: businessConfig.phoneDisplay, href: location.contactHref, external: true },
      { icon: InstagramIcon, label: "Instagram", value: "@lumpiambakcun", href: businessConfig.instagramUrl, external: true },
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
