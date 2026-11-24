import { Flame, ShieldCheck, Smile, Package, Tag } from "lucide-react";
import type { FaqItem } from "@/components/sections/faq";
import type { FeatureCardProps } from "@/components/sections/feature-card";
import type { HeroProps } from "@/components/sections/hero";
import type { PriceCardProps } from "@/components/sections/price-card";
import type { Testimonial } from "@/components/sections/testimonial-card";
import type { WhatsAppCardProps } from "@/components/sections/whatsapp-card";
import { businessConfig } from "@/config/site";
import { menuCategories, menuProducts } from "@/content/menu";

export const hero: HeroProps = {
  label: "Lumpia mini khas Semarang",
  titleTop: "Lumpia Semarang,",
  titleAccent: "Rebungnya Nggak Bau",
  ribbon: { price: "Rp 23 ribu", note: "isi 10, mentah atau siap santap" },
  body: "Isi rebung, telur, dan udang. Kriuk, gurih, tanpa pengawet & MSG. Buatan rumahan Mbak Cun dari resep keluarga sejak 1998.",
  whatsappLabel: "Pesan via WhatsApp",
  whatsappMessage: "Halo Mbak Cun, saya mau pesan lumpia.",
  menuLabel: "Lihat Menu",
  rating: businessConfig.rating,
  sticker: { prefix: "Cuma", price: "Rp 2.300", suffix: "per biji" },
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
      features: ["Siap goreng di rumah, sekitar 7 menit", "Tahan 2 bulan di freezer", "Rp 2.300 per biji"],
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
      features: ["Siap santap, kriuk dari dapur", "Pas untuk camilan, arisan, dan rapat", "Rp 2.700 per biji"],
      ctaLabel: "Pesan Goreng",
      ctaMessage: "Halo Mbak Cun, saya mau pesan Lumpia Goreng (isi 10).",
      image: { src: "/images/katalog/goreng.webp", alt: "Lumpia mini goreng kriuk di atas selada dengan saus" },
    },
  ] satisfies PriceCardProps[],
};

export const features = {
  eyebrow: "Kenapa Lumpia Mbak Cun",
  title: "Kecil ukurannya, besar ketagihannya",
  items: [
    {
      number: "01",
      title: "Rebung tanpa bau menyengat",
      description: "Banyak pelanggan yang awalnya tidak suka rebung justru jadi langganan.",
      icon: Smile,
    },
    {
      number: "02",
      title: "Ukuran pas, sekali hap",
      description: "Panjang ±10 cm. Praktis untuk camilan, suguhan tamu, atau bekal anak.",
      icon: Package,
    },
    {
      number: "03",
      title: "Harga bersahabat",
      description: "Mulai Rp 2.300 per biji. Enak dibeli banyak untuk keluarga atau acara.",
      icon: Tag,
    },
    {
      number: "04",
      title: "Bisa digoreng sendiri",
      description: "Pilih yang mentah, goreng saat mau disajikan. Kriuknya tetap seperti baru beli.",
      icon: Flame,
    },
    {
      number: "05",
      title: "Resep keluarga sejak 1998",
      description: "Dibuat di dapur rumahan Banyumanik. Tanpa pengawet, tanpa MSG, bersertifikat halal BPJPH.",
      icon: ShieldCheck,
    },
  ] satisfies Omit<FeatureCardProps, "className">[],
};

export const menu = {
  eyebrow: "Menu lainnya",
  title: "Mau coba hidangan lainnya?",
  categories: menuCategories,
  products: menuProducts,
};

export const order = {
  eyebrow: "Cara pesan",
  title: "Pilih cara yang paling enak buatmu",
  steps: [
    "Sebutkan mentah atau goreng, dan jumlah pack",
    "Pilih ambil di tempat atau dikirim, termasuk ke Jakarta dan luar kota",
    "Pesanan di atas 50 pcs: minimal H-1 dengan DP",
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
    eventText: "Arisan, pengajian, rapat kantor, hajatan? Min. 50 pcs · Pesan H-1 · DP di awal",
    ctaLabel: `Chat ${businessConfig.phoneDisplay}`,
    ctaMessage: "Halo Mbak Cun, saya mau pesan lumpia.",
  } satisfies WhatsAppCardProps,
};

export const testimonials = {
  eyebrow: "Kata pelanggan",
  title: "Yang sudah coba, jadi langganan",
  rating: businessConfig.rating,
  allReviewsLabel: "Lihat semua ulasan di Google",
  allReviewsHref: businessConfig.mapsUrl,
  reviews: [
    {
      name: "Nurlia E.",
      source: "Ulasan Google",
      quote:
        "Sebagai orang yang nggak suka makan rebung, entah kenapa makan lumpia satu ini kerasa beda. Rebungnya juga bukan tipikal yang bau menyengat. Kriuknya mantep. Selalu jadi pilihan oleh-oleh kalau pulang kampung.",
    },
    {
      name: "Ria R.",
      source: "Ulasan Google",
      quote:
        "Home made product. Walaupun ukurannya lebih kecil dari lumpia pada umumnya, rasa tetap enak. Murah tapi rasa nggak murahan. Kulitnya setelah digoreng renyah, seimbang dengan isiannya. Pas banget buat oleh-oleh.",
    },
    {
      name: "Ekka N.",
      avatar: "/images/reviewers/ekka-n.webp",
      source: "Ulasan Google",
      quote:
        "Awalnya coba karena direkomendasiin teman, ternyata memang enak. Rebungnya nggak bau, bumbunya pas, dan packingnya rapi. Buat warga Semarang wajib coba sih ini.",
    },
    {
      name: "Inggit N.",
      avatar: "/images/reviewers/inggit-n.webp",
      source: "Ulasan Google",
      quote:
        "Lumpianya enak banget, isi rebungnya kerasa dan nggak pelit. Kulitnya juga nggak terlalu tebal. Sudah beberapa kali beli dan rasanya konsisten.",
    },
    {
      name: "Chrisna N.",
      avatar: "/images/reviewers/chrisna-n.webp",
      source: "Ulasan Google",
      quote:
        "Lunpianya enak banget, tahu rebungnya juga mantap, piscoknya gurih manis. Pelayanan admin juga sangat ramah. Sudah beberapa kali beli di sini, nggak pernah nggak enak.",
    },
    {
      name: "Mita V.",
      source: "Ulasan Google",
      quote: "Lumpianya enak sekali, ownernya ramah dan baik banget. Jauh-jauh dari Blora tidak mengecewakan.",
    },
  ] satisfies Testimonial[],
};

export const faq = {
  eyebrow: "Pertanyaan umum",
  title: "Sebelum pesan",
  items: [
    { question: "Ukurannya seberapa?", answer: "Panjang ±10 cm, isi 10 pcs per pack. Pas untuk camilan, suguhan tamu, atau bekal anak." },
    { question: "Isinya apa?", answer: "Rebung, telur, dan udang. Dibuat rumahan dari resep keluarga, tanpa pengawet dan tanpa MSG." },
    { question: "Yang mentah tahan berapa lama?", answer: "Di suhu ruang 24 jam, di kulkas 7 hari, dan di freezer sampai 2 bulan." },
    { question: "Yang goreng tahan berapa lama?", answer: "Paling enak disantap di hari yang sama. Simpan di wadah tertutup, lalu hangatkan sebentar agar kriuknya kembali." },
    { question: "Bagaimana cara menggoreng yang mentah?", answer: "Goreng langsung dari freezer dengan minyak panas sekitar 7 menit sampai kuning keemasan." },
    { question: "Sudah halal?", answer: `Sudah. ${businessConfig.halalCertificate}.` },
    { question: "Ada sambalnya?", answer: "Setiap pembelian dapat cabai rawit gratis." },
    { question: "Bisa kirim ke Jakarta atau kota lain?", answer: "Bisa. Kami melayani pengiriman ke Jakarta dan luar kota. Tanyakan ongkos kirimnya lewat WhatsApp." },
    { question: "Bisa pesan banyak untuk acara?", answer: "Bisa. Pesanan di atas 50 pcs minimal H-1 dengan DP, cocok untuk arisan, pengajian, rapat kantor, dan hajatan." },
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
