export const paymentMethods = [
  {
    id: "qris",
    label: "QRIS",
    description: "Bayar dengan scan QR dari aplikasi bank atau e-wallet.",
    enabledPayments: ["other_qris"],
  },
  {
    id: "bank",
    label: "Transfer bank",
    description: "Virtual account BCA, BNI, BRI, Permata, atau bank lain.",
    enabledPayments: ["bca_va", "bni_va", "bri_va", "permata_va", "other_va"],
  },
  {
    id: "ewallet",
    label: "E-wallet",
    description: "GoPay, ShopeePay, atau DANA.",
    enabledPayments: ["gopay", "shopeepay", "dana"],
  },
] as const;

export const manualPaymentMethods = [
  { id: "cash", label: "Tunai" },
  { id: "transfer", label: "Transfer" },
] as const;

export function paymentLabel(id: string) {
  return [...paymentMethods, ...manualPaymentMethods].find((method) => method.id === id)?.label ?? id;
}

export type PaymentMethod = (typeof paymentMethods)[number]["id"];

export type OrderStatus = "pending" | "paid" | "failed" | "expired" | "cancelled";

export const orderStages: Partial<Record<OrderStatus, string>> = {
  pending: "Tahap 2 dari 3 · Menunggu pembayaran",
  paid: "Tahap 3 dari 3 · Ambil di tempat",
};

export const orderStatusInfo: Record<OrderStatus, { label: string; description: string }> = {
  pending: {
    label: "Belum dibayar",
    description: "Pesananmu sudah kami catat. Selesaikan pembayaran supaya langsung kami siapkan.",
  },
  paid: {
    label: "Lunas",
    description: "Pesananmu sedang disiapkan. Sebutkan nomor ini saat ambil ya.",
  },
  failed: {
    label: "Gagal",
    description: "Pembayaran belum berhasil. Coba pesan ulang, atau tanya Mbak Cun.",
  },
  expired: {
    label: "Kedaluwarsa",
    description: "Waktu bayar habis dan pesanan ini ditutup. Silakan pesan ulang.",
  },
  cancelled: {
    label: "Dibatalkan",
    description: "Pembayaran dibatalkan. Silakan pesan ulang, atau tanya Mbak Cun.",
  },
};
