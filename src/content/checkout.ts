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

export type PaymentMethod = (typeof paymentMethods)[number]["id"];

export type OrderStatus = "pending" | "paid" | "failed" | "expired" | "cancelled";

export const orderStatusInfo: Record<OrderStatus, { label: string; title: string; description: string; tone: "pending" | "paid" | "failed" }> = {
  pending: {
    label: "Menunggu pembayaran",
    title: "Selesaikan pembayaranmu",
    description: "Pesanan sudah tersimpan. Bayar sebelum waktunya habis supaya pesanan diproses.",
    tone: "pending",
  },
  paid: {
    label: "Lunas",
    title: "Pembayaran diterima",
    description: "Terima kasih! Pesananmu akan disiapkan. Tunjukkan kode pesanan saat mengambil.",
    tone: "paid",
  },
  failed: {
    label: "Pembayaran gagal",
    title: "Pembayaran belum berhasil",
    description: "Pembayaran ditolak atau gagal diproses. Silakan pesan ulang atau hubungi Mbak Cun.",
    tone: "failed",
  },
  expired: {
    label: "Kedaluwarsa",
    title: "Waktu pembayaran habis",
    description: "Pesanan ini tidak dibayar tepat waktu. Silakan pesan ulang dari menu.",
    tone: "failed",
  },
  cancelled: {
    label: "Dibatalkan",
    title: "Pesanan dibatalkan",
    description: "Pembayaran dibatalkan. Silakan pesan ulang atau hubungi Mbak Cun.",
    tone: "failed",
  },
};
