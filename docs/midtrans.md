# Midtrans (Snap)

Pembayaran "Beli sekarang" memakai Midtrans Snap (popup). Tidak ada paket npm: `src/lib/midtrans.ts` hanya memakai `fetch` dan `node:crypto`.

## Alur

1. Detail Menu → `Link /checkout?produk={id}&jumlah={n}` (`product-actions.tsx`). Produk tanpa harga tidak bisa dibeli (saat ini semua 8 produk punya harga).
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

Gunakan kunci sandbox, buat pesanan, lalu bayar lewat simulator Midtrans. Pindah ke production: ganti kunci, ubah `MIDTRANS_IS_PRODUCTION` menjadi `true`, dan isi Notification URL production.

### QRIS: pakai simulator v2

Buka **https://simulator.sandbox.midtrans.com/v2/qris/index**, tempel *QR Code Image Url*, klik Scan QR, lalu Pay (issuer GoPay). Status berubah jadi PAID.

Jangan pakai `https://simulator.sandbox.midtrans.com/qris/index` (versi lama, hasilnya di `/qris/payment/gopay`): untuk akun sandbox ini selalu menjawab **"Transaction is unsuccessful."**, dengan URL QR yang sama persis. Versi lama hanya berlaku untuk akun yang dikonfigurasi sebelum 4 Nov 2024 ([dokumen resmi](https://docs.midtrans.com/docs/testing-payment-on-sandbox)). Terbukti dengan pesanan uji: URL gambar QR yang sama berhasil (`settlement`) di `/v2/qris/index` dan gagal di `/qris/index`; kegagalan itu tidak membatalkan transaksi (tetap `pending`).

Cara mendapat URL gambar QR:
- Dari popup Snap: klik kanan gambar QR, salin alamat gambar (bentuknya `https://merchants-app.sbx.midtrans.com/v4/qris/gopay/{referenceId}/qr-code`), atau
- dari Status API: `https://api.sandbox.midtrans.com/v2/qris/{transaction_id}/qr-code` (host sandbox; `api.midtrans.com` memberi galat JSON). `transaction_id` ada di `GET https://api.sandbox.midtrans.com/v2/{order_id}/status` (Basic auth `serverKey:`).

### Status tanpa webhook di localhost

Midtrans tidak bisa memanggil `localhost`, jadi webhook tidak datang saat dev. Status baru ikut berubah ketika `/pesanan/{kode}` dibuka (sinkron lewat Status API); sebelum itu baris `orders` tetap `pending` walau di Midtrans sudah `settlement`. Terbukti: setelah bayar di simulator, halaman status menampilkan "LUNAS".

### Hal lain yang terukur

- Menutup popup lalu menekan "Bayar sekarang" memakai transaksi yang sama (tidak membuat charge baru dan tidak membatalkan).
- Dua pesanan beruntun dengan nomor yang sama tidak saling membatalkan.
- Pesan galat CSP dan Clipboard di konsol saat popup terbuka berasal dari halaman internal Midtrans, bukan dari situs ini.
- Pesanan yang popup-nya belum sempat memuat (ditinggalkan dalam beberapa detik pertama) belum punya transaksi di Midtrans (Status API 404) sampai popup dibuka lagi lewat "Bayar sekarang".

## Batasan

Satu produk per pesanan, tanpa keranjang, kode promo, antar, atau email konfirmasi. Checkout online hanya 1 sampai 4 pack; 50 pcs (5 pack) ke atas lewat WhatsApp dengan DP (`bulkOrder` di `src/config/site.ts`, juga ditegakkan server di `quantitySchema`). Tidak ada rate limit: bot bisa membuat baris `pending`; tambahkan Turnstile atau rate limit bila perlu.
