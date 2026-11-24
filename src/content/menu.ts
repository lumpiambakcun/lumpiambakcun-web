import type { MenuCategory, MenuProduct } from "@/components/sections/menu-browser";
import { bulkOrder } from "@/config/site";

const frozenText = "Isi 10 pcs, frozen, tinggal goreng.";
const friedText = "Isi 10 pcs, sudah digoreng.";

const packaging = { Frozen: "mika", Goreng: "box" } as const;

export function packagingOf(variant: string) {
  return packaging[variant as keyof typeof packaging] ?? "pack";
}

function product(id: string, category: string, variant: "Frozen" | "Goreng", name: string, price: string): MenuProduct {
  return {
    id,
    category,
    card: {
      href: `/menu/${id}`,
      variant,
      name,
      description: variant === "Frozen" ? frozenText : friedText,
      price,
      unit: `/ ${packaging[variant]}`,
      image: { src: `/images/menu/${id}.webp`, alt: `${name} ${variant.toLowerCase()}` },
      whatsappMessage: `Halo Mbak Cun, saya mau pesan ${name} ${variant} (isi 10).`,
    },
  };
}

export const menuCategories = [
  { id: "lumpia", label: "Lumpia" },
  { id: "tahu-rebung", label: "Tahu Rebung" },
  { id: "tahu-bakso", label: "Tahu Bakso" },
  { id: "pisang-coklat", label: "Pisang Coklat" },
] satisfies MenuCategory[];

export const menuProducts = [
  product("lumpia-frozen", "lumpia", "Frozen", "Lumpia", "Rp25.000"),
  product("lumpia-goreng", "lumpia", "Goreng", "Lumpia", "Rp30.000"),
  product("tahu-rebung-frozen", "tahu-rebung", "Frozen", "Tahu Rebung", "Rp27.000"),
  product("tahu-rebung-goreng", "tahu-rebung", "Goreng", "Tahu Rebung", "Rp35.000"),
  product("tahu-bakso-frozen", "tahu-bakso", "Frozen", "Tahu Bakso", "Rp22.000"),
  product("tahu-bakso-goreng", "tahu-bakso", "Goreng", "Tahu Bakso", "Rp26.000"),
  product("pisang-coklat-frozen", "pisang-coklat", "Frozen", "Pisang Coklat", "Rp20.000"),
  product("pisang-coklat-goreng", "pisang-coklat", "Goreng", "Pisang Coklat", "Rp25.000"),
] satisfies MenuProduct[];

export const menuPage = {
  heading: "Menu Lumpia Mbak Cun",
  cta: {
    title: "Pesan banyak atau untuk acara?",
    text: `Minimal ${bulkOrder.minPcs} pcs, pesan H-1 dengan DP. Chat Mbak Cun, nanti dibantu hitung jumlahnya.`,
    buttonLabel: "Pesan via WhatsApp",
    message: "Halo Mbak Cun, saya mau pesan lumpia untuk acara.",
  },
};

const fillings = "rebung segar 100%, udang, telur, dan bumbu khas Lumpia Mbak Cun";

const menuDetails: Record<string, { description: string; ingredients: string; chili: boolean }> = {
  lumpia: {
    description:
      "Lumpia mini khas Semarang berisi rebung, telur, dan udang. Kulitnya tipis, kriuk saat digoreng, dan gurih tanpa pengawet maupun MSG.",
    ingredients: fillings,
    chili: true,
  },
  "tahu-rebung": { description: "Tahu isi rebung buatan rumahan Mbak Cun, renyah saat digoreng.", ingredients: fillings, chili: true },
  "tahu-bakso": { description: "Tahu bakso buatan rumahan Mbak Cun, berisi daging sapi.", ingredients: "daging sapi 100%", chili: true },
  "pisang-coklat": {
    description: "Pisang coklat buatan rumahan Mbak Cun, manis dan renyah.",
    ingredients: "pisang raja, gula murni 100%, dan meses",
    chili: false,
  },
};

export function getDetails({ category, card }: MenuProduct) {
  const { description, ingredients, chili } = menuDetails[category];
  const highlights = [
    `Isi 10 pcs per ${packagingOf(card.variant)}`,
    `Isi: ${ingredients}`,
    ...(chili ? ["Gratis cabai rawit di setiap pembelian"] : []),
    "Buatan rumahan Mbak Cun sejak 1998",
  ];
  return { description, highlights };
}

export const getProduct = (id: string) => menuProducts.find((product) => product.id === id);

export const getVariants = (category: string) => menuProducts.filter((product) => product.category === category);

export function getRelated(id: string, count = 4) {
  const category = getProduct(id)?.category;
  const others = menuProducts.filter((product) => product.id !== id);
  return [...others.filter((p) => p.category === category), ...others.filter((p) => p.category !== category)].slice(0, count);
}

const GALLERY_COUNT = 3;

export const menuGallery: Record<string, { src: string; alt: string }[]> = Object.fromEntries(
  menuCategories.map(({ id, label }) => [
    id,
    Array.from({ length: GALLERY_COUNT }, (_, index) => ({
      src: `/images/menu/detail/${id}-${index + 1}.webp`,
      alt: `${label}, foto ${index + 1}`,
    })),
  ]),
);
