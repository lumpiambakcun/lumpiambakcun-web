import type { MenuCategory, MenuProduct } from "@/components/sections/menu-browser";

const frozenText = "Isi 10 pcs, frozen, tinggal goreng.";
const friedText = "Isi 10 pcs, sudah digoreng.";

function product(
  id: string,
  category: string,
  variant: "Frozen" | "Goreng",
  name: string,
  price: string,
  photo: string,
  discount?: string,
): MenuProduct {
  return {
    id,
    category,
    card: {
      href: `/menu/${id}`,
      variant,
      name,
      description: variant === "Frozen" ? frozenText : friedText,
      price,
      unit: "/10 pcs",
      discount,
      image: { src: `/images/menu/${photo}.webp`, alt: `${name} ${variant.toLowerCase()}` },
      whatsappMessage: `Halo Mbak Cun, saya mau pesan ${name} ${variant} (isi 10).`,
    },
  };
}

export const menuCategories = [
  { id: "lumpia", label: "Lumpia" },
  { id: "tahu-rebung", label: "Tahu Rebung" },
  { id: "piscok", label: "Piscok" },
  { id: "tahu-bakso", label: "Tahu Bakso" },
  { id: "pisang-karamel", label: "Pisang Karamel" },
] satisfies MenuCategory[];

export const menuProducts = [
  product("lumpia-frozen", "lumpia", "Frozen", "Lumpia", "Rp25.000", "lumpia"),
  product("lumpia-goreng", "lumpia", "Goreng", "Lumpia", "Rp30.000", "lumpia"),
  product("tahu-rebung-frozen", "tahu-rebung", "Frozen", "Tahu Rebung", "Rp25.000", "tahu-rebung", "Diskon 10%"),
  product("tahu-rebung-goreng", "tahu-rebung", "Goreng", "Tahu Rebung", "Rp30.000", "tahu-rebung"),
  product("piscok-frozen", "piscok", "Frozen", "Piscok", "Rp20.000", "piscok"),
  product("piscok-goreng", "piscok", "Goreng", "Piscok", "Rp25.000", "piscok", "Diskon 10%"),
  product("tahu-bakso-frozen", "tahu-bakso", "Frozen", "Tahu Bakso", "Rp22.000", "tahu-bakso", "Diskon 10%"),
  {
    id: "pisang-karamel-frozen",
    category: "pisang-karamel",
    card: {
      href: "/menu/pisang-karamel-frozen",
      variant: "Frozen",
      name: "Pisang Karamel",
      description: "Tanya ketersediaan dan harga lewat WhatsApp.",
      image: { src: "/images/menu/pisang-karamel.webp", alt: "Pisang karamel" },
      whatsappMessage: "Halo Mbak Cun, saya mau tanya ketersediaan dan harga Pisang Karamel.",
    },
  },
] satisfies MenuProduct[];

export const menuPage = {
  heading: "Menu Lumpia Mbak Cun",
  cta: {
    title: "Pesan banyak atau untuk acara?",
    text: "Minimal 50 pcs, pesan H-1 dengan DP. Chat Mbak Cun, nanti dibantu hitung jumlahnya.",
    buttonLabel: "Pesan via WhatsApp",
    message: "Halo Mbak Cun, saya mau pesan lumpia untuk acara.",
  },
};

const rumahan = ["Isi 10 pcs per pack", "Buatan rumahan Mbak Cun sejak 1998", "Pesan lewat WhatsApp, ambil di Banyumanik atau diantar"];

export const menuDetails: Record<string, { description: string; highlights: readonly string[] }> = {
  lumpia: {
    description:
      "Lumpia mini khas Semarang berisi rebung, telur, dan udang. Kulitnya tipis, kriuk saat digoreng, dan gurih tanpa pengawet maupun MSG.",
    highlights: ["Isi: rebung, telur, dan udang", "Panjang ±10 cm, 10 pcs per pack", "Gratis cabai rawit di setiap pembelian"],
  },
  "tahu-rebung": { description: "Tahu isi rebung buatan rumahan Mbak Cun, renyah saat digoreng.", highlights: rumahan },
  piscok: { description: "Piscok (pisang coklat) buatan rumahan Mbak Cun.", highlights: rumahan },
  "tahu-bakso": { description: "Tahu bakso buatan rumahan Mbak Cun.", highlights: rumahan },
  "pisang-karamel": {
    description: "Pisang karamel buatan rumahan Mbak Cun. Tanya ketersediaan dan harga lewat WhatsApp.",
    highlights: ["Buatan rumahan Mbak Cun sejak 1998", "Pesan lewat WhatsApp, ambil di Banyumanik atau diantar"],
  },
};

export const getProduct = (id: string) => menuProducts.find((product) => product.id === id);

export const getVariants = (category: string) => menuProducts.filter((product) => product.category === category);

export function getRelated(id: string, count = 4) {
  const category = getProduct(id)?.category;
  const others = menuProducts.filter((product) => product.id !== id);
  return [...others.filter((p) => p.category === category), ...others.filter((p) => p.category !== category)].slice(0, count);
}

const galleryCount: Record<string, number> = { lumpia: 3, "tahu-rebung": 3, piscok: 3, "tahu-bakso": 3, "pisang-karamel": 2 };

export const menuGallery: Record<string, { src: string; alt: string }[]> = Object.fromEntries(
  menuCategories.map(({ id, label }) => [
    id,
    Array.from({ length: galleryCount[id] }, (_, index) => ({
      src: `/images/menu/detail/${id}-${index + 1}.webp`,
      alt: `${label}, foto ${index + 1}`,
    })),
  ]),
);
