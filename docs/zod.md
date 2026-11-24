# Zod

Dipakai untuk validasi di batas kepercayaan (input form dan body webhook). Versi 4.

- `src/lib/checkout.ts`: `checkoutSchema(now)` memvalidasi form checkout (`validateCheckout` memangkas spasi, parse, lalu memetakan galat ke kolom form). Pesan galat per kolom ditulis di skema. Galat `jumlah` ditampilkan lewat kolom `produk` (pemberitahuan di ringkasan). `quantitySchema` dipakai juga oleh `/checkout` (`checkout-content.tsx`).
- `src/lib/midtrans.ts`: `notificationSchema`/`parseNotification` untuk body webhook dan respons Status API; `snapResponseSchema` untuk respons Snap.
- Sintaks v4: pesan galat sebagai argumen string (`z.string("pesan")`, `.min(2, "pesan")`); `z.email()` top-level; tambahkan isu manual di `.transform` lewat `ctx.issues.push({ code: "custom", input, ... })`.
- Refinement tingkat objek hanya jalan bila semua kolom lolos, jadi aturan "minimal 1 jam dari sekarang" (butuh tanggal dan jam) muncul setelah kolom lain valid.
