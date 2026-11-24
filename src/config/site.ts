export const brandColors = {
  brand: "#a80000",
  brandDeep: "#6b0000",
  highlight: "#ffdf00",
  cream: "#fff8d6",
  ink: "#0a0a0a",
} as const;

export const siteConfig = {
  name: "Lumpia Mbak Cun",
  shortName: "Mbak Cun",
  description:
    "Lumpia mini khas Semarang buatan rumahan sejak 1998: rebung, telur, dan udang. Kriuk, gurih, tanpa pengawet dan MSG. Pesan mentah atau siap santap lewat WhatsApp.",
  language: "id",
  locale: "id_ID",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  themeColor: brandColors.brand,
  backgroundColor: brandColors.cream,
} as const;

export const businessConfig = {
  tagline: "Lumpia khas Semarang",
  phoneDisplay: "0857-1364-4140",
  phoneIntl: "6285713644140",
  address: {
    street: "Jl. Meranti Barat I No. 322",
    district: "Srondol Wetan, Banyumanik",
    city: "Semarang",
    shortLine: "Jl. Meranti Barat 1 No. 322, Banyumanik",
    fullLine: "Jl. Meranti Barat I No. 322, Srondol Wetan, Banyumanik, Semarang",
    postalLine: "Jl. Meranti Bar. I No.322, Srondol Wetan, Kec. Banyumanik, Kota Semarang, Jawa Tengah 50264",
  },
  geo: { latitude: -7.0712887, longitude: 110.4210899 },
  hours: { opens: "09.00", closes: "20.30", label: "Buka setiap hari, 09.00 sampai 20.30" },
  mapsUrl: "https://maps.app.goo.gl/jigyJhSDkJSNxhyL6",
  instagramUrl: "https://www.instagram.com/lumpiambakcun",
  halalCertificate: "Halal BPJPH No. ID3511000210992322",
  halalLogo: { src: "/images/brand/halal.webp", width: 89, height: 160, alt: "Logo Halal Indonesia (BPJPH)" },
  copyrightYear: 2026,
  rating: { value: 4.9, count: 49, source: "Google" },
} as const;

const packSize = 10;
const bulkMinPcs = 50;

export const bulkOrder = {
  packSize,
  minPcs: bulkMinPcs,
  minPacks: bulkMinPcs / packSize,
  maxOnlinePacks: bulkMinPcs / packSize - 1,
  rule: `${bulkMinPcs} pcs atau lebih lewat WhatsApp, minimal H-1 dengan DP.`,
} as const;

export const orderChannels: ReadonlyArray<{
  id: string;
  label: string;
  href?: string;
  chipClass: string;
  icon: { src: string; width: number; height: number };
}> = [
  { id: "gofood", label: "GoFood", href: "https://gofood.co.id/semarang/restaurant/lumpia-mbak-cun-8599ebf9-588d-441c-a08e-02fb82829673", chipClass: "bg-white", icon: { src: "/images/icons/gofood.webp", width: 18, height: 16 } },
  { id: "grabfood", label: "GrabFood", href: "https://grab.onelink.me/2695613898", chipClass: "bg-white", icon: { src: "/images/icons/grabfood.webp", width: 18, height: 14 } },
  { id: "shopeefood", label: "ShopeeFood", href: "https://shopee.co.id/universal-link/now-food/shop/21830343", chipClass: "bg-white", icon: { src: "/images/icons/shopeefood.webp", width: 16, height: 16 } },
];

export const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Cara Pesan", href: "/cara-pesan" },
  { label: "Lokasi", href: "/lokasi" },
] as const;

export const sitePages = [
  { path: "/", title: "Beranda", description: siteConfig.description },
  {
    path: "/menu",
    title: "Menu",
    description:
      "Menu Lumpia Mbak Cun: lumpia, tahu rebung, piscok, tahu bakso, dan pisang karamel, frozen atau siap santap. Pesan lewat WhatsApp.",
  },
  {
    path: "/cara-pesan",
    title: "Cara Pesan",
    description:
      "Cara pesan Lumpia Mbak Cun: lewat website, WhatsApp, atau aplikasi GoFood, GrabFood, dan ShopeeFood. Ambil di Banyumanik atau diantar.",
  },
  {
    path: "/lokasi",
    title: "Lokasi",
    description:
      "Alamat, jam buka, dan peta Lumpia Mbak Cun di Srondol Wetan, Banyumanik, Semarang. Buka setiap hari 09.00 sampai 20.30.",
  },
] as const;
