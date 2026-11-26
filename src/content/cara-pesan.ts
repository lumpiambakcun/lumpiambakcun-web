import { BadgeCheck, Globe, MapPin, MessageCircle, Search, ShoppingCart, User, Wallet } from "lucide-react";
import type { DeliveryOption } from "@/components/sections/delivery-options";
import type { OrderMethod } from "@/components/sections/order-methods";
import type { OrderStepsTab } from "@/components/sections/order-steps";
import { bulkOrder } from "@/config/site";
import { buildOrder } from "@/content/beranda";
import type { Contact } from "@/lib/site-settings-schema";

export const buildCaraPesanPage = (contact: Contact) => {
  const phone = contact.phoneDisplay;
  return {
  heading: "Cara pesan Lumpia Mbak Cun",
  methods: {
    eyebrow: "Tiga cara",
    title: "Pilih cara pesan",
    cards: [
      {
        icon: Globe,
        title: "Via website",
        badge: "Rekomendasi",
        text: "Pilih menu, masukkan keranjang, lalu bayar online. Pesanan langsung tercatat.",
        cta: { kind: "link", label: "Beli sekarang", href: "/menu", variant: "brand" },
      },
      {
        icon: MessageCircle,
        title: "Via WhatsApp",
        text: `Chat Mbak Cun di ${phone}: sebut produk, jumlah, dan mau ambil atau diantar.`,
        cta: { kind: "whatsapp", label: "Chat WhatsApp", message: "Halo Mbak Cun, saya mau pesan lumpia." },
      },
      {
        icon: ShoppingCart,
        title: "Via aplikasi",
        text: "Pesan antar lewat GoFood, GrabFood, atau ShopeeFood.",
        logos: true,
        cta: { kind: "link", label: "Lihat lokasi", href: "/lokasi", variant: "outline-ink" },
      },
    ] satisfies OrderMethod[],
  },
  steps: {
    eyebrow: "Langkah-langkahnya",
    title: "Cara memesan",
    tabs: [
      {
        id: "website",
        label: "Via website",
        items: [
          { icon: Search, title: "Pilih menu", text: "Buka halaman Menu, pilih Lumpia, Tahu Rebung, Tahu Bakso, atau Pisang Coklat." },
          { icon: ShoppingCart, title: "Masukkan keranjang", text: "Tentukan frozen atau goreng, atur jumlah, lalu tekan Beli sekarang." },
          { icon: User, title: "Isi data pesanan", text: "Isi nama dan nomor HP, lalu pilih ambil di tempat atau diantar." },
          { icon: Wallet, title: "Bayar online", text: "Bayar lewat metode yang tersedia. Pesanan diproses setelah pembayaran masuk." },
        ],
      },
      {
        id: "whatsapp",
        label: "Via WhatsApp",
        items: [
          { icon: Search, title: "Pilih menu", text: "Lihat menu, tentukan frozen atau goreng, lalu hitung jumlah pack yang dibutuhkan." },
          { icon: MessageCircle, title: "Chat WhatsApp", text: `Kirim pesanan ke ${phone}: produk, jumlah, dan mau ambil atau diantar.` },
          { icon: BadgeCheck, title: "Konfirmasi dan bayar", text: `Mbak Cun konfirmasi total harga. Pesanan ${bulkOrder.rule}` },
          { icon: MapPin, title: "Ambil atau diantar", text: "Ambil di Banyumanik, atau diantar lewat GoFood, GrabFood, dan ShopeeFood." },
        ],
      },
    ] satisfies OrderStepsTab[],
  },
  delivery: {
    eyebrow: "Pengiriman",
    title: "Ambil sendiri atau diantar",
    cards: [
      {
        icon: MapPin,
        title: "Ambil di tempat",
        text: [
          `${contact.address.postalLine}.`,
          `Buka setiap hari ${contact.hours.opens} sampai ${contact.hours.closes}. Chat dulu supaya pesananmu sudah siap.`,
        ],
      },
      {
        icon: ShoppingCart,
        title: "Diantar",
        text: "Pesan lewat GoFood, GrabFood, atau ShopeeFood. Untuk luar kota, kirim dalam kondisi frozen.",
        logos: true,
      },
    ] satisfies DeliveryOption[],
  },
  help: {
    id: "bantuan",
    eyebrow: "Bantuan",
    title: "Butuh bantuan memesan?",
    text: "Chat Mbak Cun, kami bantu pilih produk, jumlah, dan pengiriman.",
    card: buildOrder(contact).card,
  },
  };
};
