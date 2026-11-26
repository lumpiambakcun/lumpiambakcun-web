import type { MenuProduct } from "@/components/sections/menu-browser";
import { bulkOrder } from "@/config/site";

export const menuPage = {
  heading: "Menu Lumpia Mbak Cun",
  cta: {
    title: "Pesan banyak atau untuk acara?",
    text: `Minimal ${bulkOrder.minPcs} pcs, pesan H-1 dengan DP. Chat Mbak Cun, nanti dibantu hitung jumlahnya.`,
    buttonLabel: "Pesan via WhatsApp",
    message: "Halo Mbak Cun, saya mau pesan lumpia untuk acara.",
  },
};

export function getDetails({ pack, detail }: MenuProduct) {
  const highlights = [
    `Isi ${pack.pcs} pcs per ${pack.unit}`,
    ...(detail.ingredients ? [`Isi: ${detail.ingredients}`] : []),
    ...(detail.chili ? ["Gratis cabai rawit di setiap pembelian"] : []),
    "Buatan rumahan Mbak Cun sejak 1998",
  ];
  return { description: detail.description, highlights };
}

const galleryCategories = ["lumpia", "tahu-rebung", "tahu-bakso", "pisang-coklat"];
const GALLERY_COUNT = 3;

export function getGallery({ category, card }: MenuProduct) {
  if (!galleryCategories.includes(category)) return [card.image];
  return Array.from({ length: GALLERY_COUNT }, (_, index) => ({
    src: `/images/menu/detail/${category}-${index + 1}.webp`,
    alt: `${card.name}, foto ${index + 1}`,
  }));
}
