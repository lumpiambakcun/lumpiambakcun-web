# Supabase

Dipakai untuk menyimpan pesanan (`orders`) dan akun admin (Auth, lihat `docs/admin.md`). Paket: `@supabase/supabase-js` dan `@supabase/ssr`.

## Env

| Variabel | Keterangan |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL proyek. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Kunci publik (dipakai helper `src/lib/supabase/{client,server,middleware}.ts` untuk login admin; pesanan tidak memakainya). |
| `SUPABASE_SERVICE_ROLE_KEY` | Kunci service role. **Hanya server**, jangan beri awalan `NEXT_PUBLIC_`. Dipakai `src/lib/supabase/admin.ts`. |

## Tabel `orders`

Migrasi: `supabase/migrations/20261124000000_orders.sql`. Satu baris per pesanan (satu produk): kode (`LMC-` + 10 karakter, juga `order_id` Midtrans), produk, harga satuan, jumlah, total, data pemesan, waktu ambil (`pickup_at`), metode (`qris|bank|ewallet` untuk online, `cash|transfer` untuk pesanan manual), `source` (`online|manual`, default `online`, migrasi `20261125000000_orders_manual.sql`), `status` (`pending|paid|failed|expired|cancelled`), `payment_type`, `snap_token`, `paid_at`.

Hak tabel diberikan eksplisit ke `service_role` (`20261124010000_orders_grants.sql`): proyek Supabase baru tidak lagi memberi hak otomatis, tanpa ini insert gagal dengan `42501 permission denied`. Tabel baru berikutnya butuh `grant` serupa. RLS aktif tanpa policy dan hak `anon`/`authenticated` dicabut, jadi browser tidak bisa membaca atau menulis. Semua akses lewat server dengan service role (`src/lib/orders.ts`, server action, webhook). Halaman `/pesanan/{kode}` hanya menampilkan nama depan dan nomor tersamar; kode acak adalah satu-satunya kunci akses.

## Tabel `profiles`

Migrasi `20261125010000_profiles.sql`. Satu baris per user Auth (`id` = `auth.users.id`, hapus user menghapus profil): `email`, `full_name`, `phone`, `avatar_url`, `role`. Dibuat dan disinkronkan otomatis oleh trigger `private.sync_profile()` (`security definer`, schema `private`, `execute` dicabut):

- Saat user dibuat: profil terisi (`full_name` dari `user_metadata.full_name`, bila kosong dari bagian depan email).
- Saat email atau `app_metadata` berubah: hanya `email` dan `role` yang disinkronkan. Nama, nomor HP, dan foto tidak pernah ditimpa, jadi aman diedit dari halaman profil nanti.
- `role` hanyalah cermin untuk tampilan. **Otorisasi tetap `app_metadata.role`** (`requireAdmin()`), jangan memakai `profiles.role` untuk keputusan akses.

Akses seperti `orders`: RLS aktif, `anon`/`authenticated` dicabut, hanya `service_role` (`src/lib/profiles.ts`). Edit profil nanti lewat server action yang memanggil `requireAdmin()` lalu mengubah baris milik `user.id` saja.

## Tabel `faqs` dan `products` (CMS)

Migrasi `20261126020000_product_unit_pcs.sql` menambah `unit`, `pcs`, `summary` ke `products` dan `unit` ke `orders` (salinan satuan saat pesanan dibuat, jadi mengubah satuan produk tidak mengubah pesanan lama; diisi dari varian lama). **Terapkan migrasi ini sebelum men-deploy kodenya**, karena insert pesanan menulis kolom `unit`. Batas pesanan online mengikuti isi: maksimal `floor((50 - 1) / pcs)` satuan, sisanya lewat WhatsApp (`maxOnlinePacks` di `src/config/site.ts`).

Migrasi `20261126000000_cms.sql` (seed 4 FAQ dan 8 produk dari konten lama), lalu `20261126010000_products_single_page.sql` yang menyisakan 2 produk (`lumpia-frozen`, `lumpia-goreng`) dan membuang kolom `featured`: semua produk aktif tampil di paket cepat beranda. Akses seperti `orders`: RLS aktif tanpa policy, hanya `service_role`.

- `faqs`: `question`, `answer`, `sort`, `active`. Situs hanya menampilkan yang `active`, urut `sort`.
- `products`: satu baris per item jual. `id` = slug (huruf kecil, angka, tanda hubung; tidak diubah setelah dibuat karena `orders.product_id` merujuk teksnya tanpa FK), `category` (label), `variant` (label bebas, mis. Frozen/Goreng; hanya nama), `unit` (satuan jual: mika, box, pack, atau lainnya), `pcs` (isi per satuan), `summary` (keterangan singkat kartu; kosong = otomatis "Isi N pcs per satuan"), `name`, `description`, `ingredients`, `chili`, `price` (rupiah, integer), `image_url`, `active` (hanya produk aktif yang bisa dibeli), `sort`.
- Bucket Storage publik `products` (JPG/PNG/WebP, maks 2 MB). Foto diunggah dari form produk lewat service role; `image_url` berisi URL publik. Host Supabase didaftarkan di `images.remotePatterns` (`next.config.ts`), jadi `NEXT_PUBLIC_SUPABASE_URL` harus terisi saat build. Server action menerima badan sampai 3 MB (`serverActions.bodySizeLimit`).

Pembacaan publik ada di `src/lib/products.ts` dan `src/lib/faqs.ts` memakai `'use cache'` dengan tag `products` dan `faqs`. Server action admin memanggil `updateTag(...)` setelah menulis, jadi halaman statis ikut berubah. **Build butuh akses database** karena beranda dan footer membaca tabel ini saat prerender.

## Menerapkan migrasi

Proyek sudah ter-link (`supabase/.temp`). Perintah:

```bash
bunx supabase db push --dry-run   # lihat yang akan diterapkan
bunx supabase db push
```

Perubahan skema berikutnya: tambah file migrasi baru, jangan edit yang sudah diterapkan.
