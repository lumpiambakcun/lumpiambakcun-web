# Midtrans (Snap)

Pembayaran "Beli sekarang" memakai Midtrans Snap (popup). Tidak ada paket npm: `src/lib/midtrans.ts` hanya memakai `fetch` dan `node:crypto`.

## Alur

1. Detail Menu → `Link /checkout?produk={id}&jumlah={n}` (`product-actions.tsx`). Produk tanpa harga (Pisang Karamel) tidak bisa dibeli.
2. `/checkout` (noindex, tidak masuk sitemap) → form → server action `createOrder` (`src/app/(site)/checkout/actions.ts`): validasi (`src/lib/checkout.ts`), harga dihitung ulang di server dari `menuProducts` (klien tidak mengirim nominal), baris `orders` berstatus `pending`, lalu transaksi Snap dibuat dan `snap_token` disimpan.
3. Klien memanggil `window.snap.pay(token)` (`src/lib/snap.ts`; skrip dimuat `SnapScript`). Sukses atau pending → `/pesanan/{kode}`. Popup ditutup → tombol "Bayar sekarang" memakai token yang sama (tidak membuat pesanan baru).
4. Status diperbarui dua arah: webhook `POST /api/midtrans/notification` dan sinkronisasi saat `/pesanan/{kode}` dibuka (Status API, hanya bila masih `pending`), jadi tetap benar walau webhook belum sampai.

## Env

| Variabel | Keterangan |
| --- | --- |
| `MIDTRANS_SERVER_KEY` | Server key (sandbox: `SB-Mid-server-...`). Hanya server. |
| `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` | Client key untuk `snap.js`. |
| `MIDTRANS_IS_PRODUCTION` | `false` (sandbox) atau `true`. Memilih URL sandbox/production. |
| `NEXT_PUBLIC_SITE_URL` | Domain situs; dipakai untuk `callbacks.finish` (`/pesanan/{kode}`). |

## Webhook

Isi di dashboard Midtrans: Settings → Configuration → Payment Notification URL = `https://<domain>/api/midtrans/notification`. Midtrans tidak bisa menjangkau `localhost`; untuk tes lokal pakai tunnel (mis. cloudflared), atau cukup andalkan sinkronisasi di halaman status.

Handler memverifikasi `signature_key` (`sha512(order_id + status_code + gross_amount + serverKey)`), mencocokkan `gross_amount` dengan `orders.total`, lalu memetakan status (`settlement`/`capture` → `paid`, `deny` → `failed`, `cancel` → `cancelled`, `expire` → `expired`). Update idempoten: pesanan `paid` tidak diubah lagi.

## Metode pembayaran

Pilihan di form dipetakan ke `enabled_payments` Snap di `src/content/checkout.ts` (QRIS → `other_qris`; Transfer bank → VA bank; E-wallet → `gopay`, `shopeepay`, `dana`). Jika Midtrans menolak karena metode belum aktif di akun, ubah daftar itu (atau aktifkan metodenya di dashboard). Daftar ini belum diuji dengan akun sandbox.

## Tes sandbox

Gunakan kunci sandbox, buat pesanan, lalu bayar lewat simulator Midtrans (QRIS/VA/e-wallet). Pindah ke production: ganti kunci, set `MIDTRANS_IS_PRODUCTION=true`, dan isi Notification URL production.

## Batasan

Satu produk per pesanan, tanpa keranjang, kode promo, antar, atau email konfirmasi. Tidak ada rate limit: bot bisa membuat baris `pending`; tambahkan Turnstile atau rate limit bila perlu.
