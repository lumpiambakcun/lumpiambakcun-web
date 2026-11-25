import { ChefHat, Leaf, ShieldCheck, Snowflake } from "lucide-react";
import type { FaqItem } from "@/components/sections/faq";
import type { FeatureCardProps } from "@/components/sections/feature-card";
import type { HeroProps } from "@/components/sections/hero";
import type { PriceCardProps } from "@/components/sections/price-card";
import type { Testimonial } from "@/components/sections/testimonial-card";
import type { WhatsAppCardProps } from "@/components/sections/whatsapp-card";
import { bulkOrder, businessConfig } from "@/config/site";
import { getProduct } from "@/content/menu";
import { parseRupiah } from "@/lib/currency";

export const hero: HeroProps = {
  label: "Khas Semarang",
  titleTop: "Lumpia Semarang",
  titleAccent: "Khas Legendaris",
  body: "Lumpia isi rebung, telur, dan udang dengan rasa gurih, renyah, dan autentik khas Semarang.",
  whatsappLabel: "Pesan Sekarang",
  whatsappMessage: "Halo Mbak Cun, saya mau pesan lumpia.",
  menuLabel: "Lihat Paket",
  image: { src: "/images/hero/piring-lumpia.webp", alt: "Sepiring lumpia mini goreng dengan cabai rawit dan selada" },
};

export const catalog = {
  eyebrow: "Menu & harga",
  title: "Goreng atau siap santap?",
  footnote: "Isi: rebung, telur, udang · Panjang ±10 cm · Free cabai rawit di setiap pembelian",
  cards: [
    {
      badge: "Paling pas untuk oleh-oleh",
      badgeTone: "yellow",
      title: "Lumpia Mentah",
      price: "Rp 25.000",
      unit: "/ isi 10",
      features: ["Siap goreng di rumah, sekitar 7 menit", "Tahan 2 bulan di freezer", "Rp 2.500 per biji"],
      ctaLabel: "Pesan Mentah",
      ctaMessage: "Halo Mbak Cun, saya mau pesan Lumpia Mentah (isi 10).",
      image: { src: "/images/katalog/mentah.webp", alt: "Lumpia mini mentah siap goreng, bersama lumpia goreng di piring" },
    },
    {
      badge: "Langsung hap",
      badgeTone: "red",
      title: "Lumpia Goreng",
      price: "Rp 30.000",
      unit: "/ isi 10",
      features: ["Siap santap, kriuk dari dapur", "Pas untuk camilan, arisan, dan rapat", "Rp 3.000 per biji"],
      ctaLabel: "Pesan Goreng",
      ctaMessage: "Halo Mbak Cun, saya mau pesan Lumpia Goreng (isi 10).",
      image: { src: "/images/katalog/goreng.webp", alt: "Lumpia mini goreng kriuk di atas selada dengan saus" },
    },
  ] satisfies PriceCardProps[],
};

export const features = {
  title: "Kenapa pilih Lumpia Mbak Cun?",
  items: [
    {
      title: "Bahan Berkualitas",
      description: "Rebung segar, telur, dan udang pilihan.",
      icon: Leaf,
    },
    {
      title: "Rasa Khas Semarang",
      description: "Resep turun-temurun dengan cita rasa autentik.",
      icon: ChefHat,
    },
    {
      title: "Fresh & Frozen",
      description: "Tersedia dalam kondisi siap santap dan frozen (tahan lebih lama).",
      icon: Snowflake,
    },
    {
      title: "Bersertifikat Halal",
      description: `Terjamin halal oleh BPJPH dengan No. ${businessConfig.halalNumber}.`,
      icon: ShieldCheck,
    },
  ] satisfies Omit<FeatureCardProps, "className">[],
};

const quickOrderProducts = [
  { id: "lumpia-frozen", variant: "Mentah" },
  { id: "lumpia-goreng", variant: "Goreng" },
].map(({ id, variant }) => {
  const { card } = getProduct(id)!;
  const name = `${card.name} ${variant}`;
  return {
    id,
    name,
    description: card.description,
    price: parseRupiah(card.price ?? ""),
    unit: card.unit ?? "",
    pcs: bulkOrder.packSize,
    image: { src: card.image.src, alt: `${name}, isi ${bulkOrder.packSize} pcs` },
  };
});

export const menu = {
  title: "Pilih paket lumpia favoritmu",
  text: "Atur jumlahnya, lalu kirim lewat WhatsApp. Isi pesananmu sudah tertulis otomatis, tinggal kirim.",
  products: quickOrderProducts,
};

export const order = {
  eyebrow: "Cara pesan",
  title: "Pilih cara yang paling enak buatmu",
  steps: [
    "Sebutkan mentah atau goreng, dan jumlah pack",
    "Pilih ambil di tempat atau dikirim, termasuk ke Jakarta dan luar kota",
    `Pesanan ${bulkOrder.rule}`,
  ],
  card: {
    kicker: "Paling cepat!",
    title: "Chat WhatsApp",
    durationLabel: "Tahan lama",
    durations: [
      { value: "24 jam", label: "Suhu ruang" },
      { value: "7 hari", label: "Kulkas" },
      { value: "2 bulan", label: "Freezer", highlight: true },
    ],
    eventLabel: "Pesan untuk acara",
    eventText: `Arisan, pengajian, rapat kantor, hajatan? Min. ${bulkOrder.minPcs} pcs · Pesan H-1 · DP di awal`,
    ctaLabel: `Chat ${businessConfig.phoneDisplay}`,
    ctaMessage: "Halo Mbak Cun, saya mau pesan lumpia.",
  } satisfies WhatsAppCardProps,
};

export const orderBanner = {
  title: "Ada rapat, arisan, atau acara?",
  highlight: "Pesan lumpia dalam jumlah banyak!",
  text: "Kami siap melayani pesanan untuk berbagai acara, dengan harga spesial.",
  tags: ["Rapat Kantor", "Arisan", "Ulang Tahun", "Acara Keluarga"],
  ctaLabel: order.card.ctaLabel,
  ctaMessage: order.card.ctaMessage,
};

export const testimonials = {
  title: "Kata pelanggan kami",
  rating: businessConfig.rating,
  reviews: [
    {
      name: "Chrisna Nafis",
      avatar: "/images/reviewers/chrisna-n.webp",
      source: "Ulasan Google",
      quote:
        "Lunpia nya enakkk bgtt, tahu rebungnya jg enakmantapp, piscoknya enak gurih manis bisa request manisnyaaa.. cocok untuk oleh2 atau cemilan di sore harii. Sangat recomended👍👍👍 pelayanan admin jg sangat ramah sekaliiii udah bbrp kali beli disini ga pernah ga enakk❤️",
    },
    {
      name: "Goe Ss",
      source: "Ulasan Google",
      quote:
        "Enak dan mantab..murmer.. tp rasa gk kalah dg yang up highclass.. enak banget pokoknya.. cocok untuk dikirim luar kota buat oleh2",
    },
    {
      name: "Ekka Nuraini",
      avatar: "/images/reviewers/ekka-n.webp",
      source: "Ulasan Google",
      quote:
        "Awalnya coba karena direkomendasiin temen, ternyata emang enak. Rebungnya nggak bau, bumbunya pas, dan packingnya rapi. Dateng masih hangat. Mantap 👍 buat warga semarang wajib coba sih ini .",
    },
    {
      name: "Inggit Novitasari",
      avatar: "/images/reviewers/inggit-n.webp",
      source: "Ulasan Google",
      quote:
        "Lumpianya enak banget, isi rebungnya kerasa dan nggak pelit. Kulitnya juga nggak terlalu tebal. Udah beberapa kali beli dan rasanya konsisten 👍",
    },
    {
      name: "Visca Fitriani",
      source: "Ulasan Google",
      quote:
        "Pelayanan sangat ramah dan responsif. Produk yang diberikan berkualitas, rasa terjaga, dan pengemasan rapi. Sangat direkomendasikan untuk yang mencari kualitas dan konsistensi.",
    },
  ] satisfies Testimonial[],
};

export const faq = {
  title: "Pertanyaan yang sering ditanyakan",
  items: [
    { question: "Apa itu lumpia Semarang?", answer: "Lumpia khas Semarang berisi rebung, telur, dan udang dengan cita rasa gurih dan renyah." },
    { question: "Bisa pesan untuk acara atau dalam jumlah banyak?", answer: "Bisa. Kirim jumlah dan tanggal acaranya lewat WhatsApp, lalu kami bantu hitung kebutuhannya." },
    { question: "Bisa diambil di tempat atau diantar?", answer: "Bisa ambil di tempat. Untuk pengantaran, tanyakan langsung lewat WhatsApp." },
    { question: "Berapa lama lumpia bisa disimpan?", answer: "Lumpia fresh paling enak dikonsumsi di hari yang sama. Untuk frozen, simpan di freezer dan goreng langsung dari beku kapan saja dibutuhkan." },
  ] satisfies FaqItem[],
};

export const location = {
  eyebrow: "Mampir langsung",
  title: "Mau camilan kriuk hari ini, atau oleh-oleh untuk dibawa pulang?",
  body: "Chat Mbak Cun sekarang, pesananmu langsung disiapkan. Atau mampir, kami searah jalur ke Ungaran, Solo & Jogja.",
  address: businessConfig.address.fullLine,
  hours: businessConfig.hours.label,
  whatsappLabel: "via WhatsApp",
  whatsappMessage: "Halo Mbak Cun, saya mau pesan lumpia.",
  mapsLabel: "Buka di Google Maps",
  mapsUrl: businessConfig.mapsUrl,
  contactLine: `WhatsApp ${businessConfig.phoneDisplay}`,
  contactHref: `https://wa.me/${businessConfig.phoneIntl}`,
  mapImage: { src: "/images/peta/peta-google.webp", alt: "Peta lokasi Lumpia Mbak Cun di Banyumanik, Semarang" },
};
