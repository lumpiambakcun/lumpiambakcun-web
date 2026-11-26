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

## Tabel `articles` (Artikel)

Migrasi `20261126030000_articles.sql`: tabel `articles` (RLS aktif tanpa policy, hanya `service_role`) dan bucket publik `articles` (JPG/PNG/WebP, maks 2 MB).

- Kolom: `slug` (unik, tidak diubah setelah dibuat), `title`, `excerpt` (maks 160, jadi meta description dan teks kartu), `body` (HTML dari CKEditor, **disanitasi di server** lewat `src/lib/sanitize-article.ts` sebelum disimpan), `cover_url`, `cover_alt`, `status` (`draft`/`published`), `published_at` (diisi sekali saat pertama terbit), `updated_at`.
- Pembacaan publik di `src/lib/articles.ts` (`'use cache'`, tag `articles`); server action admin memanggil `updateTag("articles")`. Hanya `published` yang tampil, termasuk di sitemap (`lastModified` = `updated_at`).
- Upload/hapus foto dipakai bersama produk dan artikel lewat `src/lib/admin-storage.ts`.
- **Seeder:** `bun run db:seed` memasukkan 4 artikel contoh (`scripts/seed/articles-data.ts`). Idempotent: artikel dengan slug yang sudah ada dilewati (tidak menimpa hasil edit); `bun run db:seed -- --force` menimpa. Naskah contoh hanya memakai fakta yang ada di situs, tetap perlu ditinjau pemilik. Cover contoh memakai foto lokal `/images/...`.

## Tabel `site_settings` (Header dan Footer)

Migrasi `20261126040000_site_settings.sql`: tabel `site_settings (key, data jsonb, updated_at)` dengan dua baris, `header` dan `footer` (RLS aktif tanpa policy, hanya `service_role`), diisi dari nilai awal di `src/config/site-defaults.ts`; plus bucket publik `branding` (JPG/PNG/WebP, maks 2 MB) untuk logo.

- Bentuk dan validasi data ada di `src/lib/site-settings-schema.ts` (zod). Pembacaan publik di `src/lib/site-settings.ts` (`getHeader`, `getFooter`, `getContact`; `'use cache'`, tag `site-settings`). Bila baris kosong atau tidak lolos skema, situs memakai `site-defaults.ts` (tabel yang belum ada tetap memunculkan galat, jadi terapkan migrasi sebelum deploy).
- **Kontak adalah satu sumber**: nomor, alamat, jam, peta, koordinat, sosmed, dan nomor halal di `footer.contact`/`footer.social`/`footer.halal`. `businessConfig` di `src/config/site.ts` hanya menyisakan rating dan logo halal.
- Tautan (menu, tombol, kolom footer) bertipe `internal` (path), `external` (https), atau `whatsapp` (teks pesan). Tautan WhatsApp dibuat dari nomor saat ini (`whatsappUrl(phoneIntl, pesan)` di `src/lib/whatsapp.ts`), jadi mengganti nomor tidak membuat tautan lama basi. Komponen client mengambil nomor dari `SiteContactProvider` (dipasang di `SiteShell`) lewat `useWhatsappUrl` atau `WhatsAppLink`/`WhatsAppButton`.
- Logo diunggah dari form dan tersimpan di bucket `branding`; nilai `logoUrl` dari klien diabaikan saat simpan (server memakai nilai di DB atau hasil unggah) supaya host gambar tetap dalam `images.remotePatterns`.
- Nama brand di header/footer (`brand.name`) tidak mengubah `siteConfig.name` (SEO, nota, OG image).

## Menerapkan migrasi

Proyek sudah ter-link (`supabase/.temp`). Perintah:

```bash
bunx supabase db push --dry-run   # lihat yang akan diterapkan
bunx supabase db push
```

Perubahan skema berikutnya: tambah file migrasi baru, jangan edit yang sudah diterapkan.
