# SEO, GEO, sitemap

Catatan setup. Dokumen ini diperbarui seiring fitur ditambah; bagian "Belum dikerjakan" adalah daftar kerja berikutnya.

"GEO" di sini berarti Generative Engine Optimization (agar muncul/terkutip di jawaban AI). SEO lokal (area layanan, alamat) dicatat terpisah di bagian terakhir.

## Yang sudah ada

| Fitur | File | Keterangan |
| --- | --- | --- |
| Identitas situs | `src/config/site.ts` | `siteConfig` (nama, deskripsi, bahasa, locale, url) dan `sitePages` (daftar halaman publik) |
| Metadata global | `src/app/layout.tsx` | `metadataBase`, title template `%s \| Lumpia Mbak Cun`, description, Open Graph dasar |
| Canonical | `src/app/(site)/page.tsx` | `alternates: { canonical: "/" }` per halaman |
| robots.txt | `src/app/robots.ts` | Izinkan semua, tunjuk ke sitemap |
| sitemap.xml | `src/app/sitemap.ts` | Dibuat dari `sitePages` |
| JSON-LD | `src/components/seo/json-ld.tsx` | `Organization` (logo, sameAs) + `WebSite` di layout |
| Detail menu | `src/app/(site)/menu/[slug]/page.tsx` | JSON-LD `Product` (+ `Offer` bila ada harga) dan `BreadcrumbList` dari `src/lib/structured-data.ts` |
| Helper | `src/lib/seo.ts` | `absoluteUrl()`, `serializeJsonLd()`, `pageMetadata(path, absoluteTitle?)` (title, description, canonical, Open Graph per halaman) |
| Share preview | `src/app/opengraph-image.tsx` (global) dan `src/app/(site)/menu/[slug]/opengraph-image.tsx` (per produk) | 1200x630 hasil `ImageResponse`; helper font dan aset di `src/lib/og.tsx`, aset PNG/JPEG di `src/assets/og/`; metadata dirakit `shareMetadata()` di `src/lib/seo.ts` |
| Nota pesanan | `src/lib/order-nota.tsx`, `src/app/(site)/pesanan/[kode]/nota/route.ts` | Gambar nota 1200x630 untuk tombol "Simpan bukti pembayaran" (`/pesanan/{kode}/nota`, unduhan PNG). Hanya ada untuk pesanan **lunas** (selain itu 404), tanpa cache. Isinya sama dengan halaman: nama depan dan nomor tersamar. Sengaja tidak dipakai sebagai og:image dan tautan nota tidak dikirim lewat WhatsApp |
| Ikon | `src/app/favicon.ico` (16/32/48), `icon.png` (512), `apple-icon.png` (180, tanpa alpha) | Tag `<link>` dibuat otomatis oleh Next |
| Manifest | `src/app/manifest.ts`, `public/icons/icon-192.png`, `icon-512.png` | Android, Chrome, dan Edge/Windows modern |
| Windows tile | `public/browserconfig.xml`, `public/icons/mstile-150x150.png` | Tile Windows lama; dirujuk lewat `metadata.other` |
| Warna tema | `siteConfig.themeColor` / `backgroundColor` | Hex literal (meta tidak bisa membaca CSS var); samakan dengan `--brand` dan `--cream` di `globals.css` |

Tidak ada package tambahan; semua memakai fitur bawaan Next.

## Environment

`NEXT_PUBLIC_SITE_URL` (lihat `.env.example`) menentukan domain di canonical, sitemap, robots dan JSON-LD. Jika kosong, jatuh ke `http://localhost:3000`, jadi **wajib diisi di production**. Nilainya ikut tertanam saat build, bukan saat runtime.

## Menambah halaman baru

1. Buat route di `src/app/...`.
2. Daftarkan di `sitePages` (`src/config/site.ts`). Otomatis masuk sitemap.
3. Di `page.tsx`: `export const metadata = pageMetadata("/path")` (dari `@/lib/seo`). Title otomatis diberi akhiran nama situs; isi `canonical` dan Open Graph ikut dibuat.
4. Halaman dinamis (mis. `/menu/[slug]`): tidak masuk `sitePages`. Tambahkan URL-nya ke `src/app/sitemap.ts`, isi `generateStaticParams`, dan buat metadata di `generateMetadata` dengan `shareMetadata()`. Slug yang tidak dikenal memanggil `notFound()`; karena `cacheComponents` mengalirkan halaman, statusnya tetap 200 tetapi tampilannya 404 dengan `noindex`.
   Artikel (`/artikel/[slug]`) mengikuti pola ini: URL terbit ditambahkan di `src/app/sitemap.ts` dengan `lastModified` dari `updated_at` database, metadata di `generateMetadata`, JSON-LD `Article` (`articleJsonLd`) dan `BreadcrumbList`. `generateStaticParams` mengembalikan placeholder `_` bila belum ada artikel (array kosong membuat build gagal dengan `cacheComponents`); slug itu menjadi 404.
5. Halaman yang tidak boleh diindeks (login, dashboard): jangan masukkan ke `sitePages`, dan set `robots: { index: false }` pada metadata-nya.

JSON-LD `Restaurant` (alamat, telepon, jam, koordinat, `sameAs`) dan `Organization` kini dibuat dari data kontak/sosmed di tabel `site_settings` (lihat `docs/supabase.md`), bukan dari konstanta kode.

## Keputusan dan batasan

- **Sitemap: `lastModified` hanya untuk URL dari database (artikel).** Dengan `cacheComponents: true`, `new Date()` saat prerender membuat build gagal (contoh di doc Next memakainya, tapi tidak berlaku di setup ini). Isi `lastModified` hanya dari data nyata, mis. `updatedAt` konten dari database.
- **Canonical diset per halaman, bukan di layout.** Canonical di layout akan menunjuk semua halaman ke `/`.
- **`twitter:card` = `summary_large_image`** memakai gambar OG yang sama.
- **Open Graph lewat `shareMetadata()` + `opengraph-image.tsx`.** `openGraph` di level halaman menimpa seluruh `openGraph` layout (termasuk gambar file convention), jadi halaman statis memanggil `pageMetadata()` yang menulis `images: /opengraph-image` eksplisit. Halaman detail menu memanggil `shareMetadata(..., null)` tanpa `images` supaya Next menambahkan OG per produk (`/menu/{id}/opengraph-image-<hash>`) otomatis.
- **OG image dibuat dengan satori**: hanya flexbox, font ttf/otf (Atyp Kido dari `src/fonts`), gambar PNG/JPEG (bukan WebP). Warna hex ada di `brandColors` (`src/config/site.ts`) karena OG tidak bisa membaca token CSS; samakan dengan `globals.css`. Untuk mengganti foto bulat produk, ubah `src/assets/og/menu-{kategori}.jpg` (400 px).
- **Font Atyp Kido adalah versi TRIAL** (`src/fonts`). Ganti file bila sudah punya lisensi.
- **Membuat ulang ikon dan OG image**: sumbernya `public/images/brand/emblem.webp` (330 px, jadi `icon.png` 512 sedikit lunak; ganti dengan logo vektor/PNG besar bila ada) dan `public/images/hero/piring-lumpia.webp`, diolah dengan ImageMagick (`magick ... -define icon:auto-resize=48,32,16 favicon.ico`).
- **`<html lang>`** diambil dari `siteConfig.language` (`id`).
- **JSON-LD** disisipkan lewat `<script>` biasa, dengan `<` di-escape (`<`) sesuai panduan Next, supaya data dinamis tidak bisa menutup tag script.jelas, JSON-LD, dan halaman yang bisa di-crawl.
- **Crawler AI** (GPTBot, ClaudeBot, PerplexityBot, dll.) tidak diblokir karena aturan `*` mengizinkan semua. Untuk membatasi, tambah rule per `userAgent` di `robots.ts`.

## Belum dikerjakan

- [ ] **Search Console / Bing Webmaster**: verifikasi domain dan submit `sitemap.xml` setelah domain final.
- [ ] **Skema per jenis halaman**: `Service`, `FAQPage`, `BreadcrumbList` saat halaman terkait ada.
- [ ] **Multi-bahasa** (`alternates.languages` / hreflang) bila situs lebih dari satu bahasa. Lihat guide `internationalization.md`.
- [ ] **Validasi** dengan Rich Results Test dan Schema Markup Validator setelah ada URL publik.

## SEO lokal (area layanan)

Belum ada data bisnis, jadi belum diimplementasi. Untuk bisnis jasa lokal, tambahkan `LocalBusiness` (atau subtipe) JSON-LD dengan `address`, `geo`, `areaServed`, `openingHoursSpecification`, `telephone`. Datanya harus sama persis dengan Google Business Profile. Letakkan di halaman terkait (bukan layout), memakai komponen `JsonLd`.

## Reset cache produksi

`POST /api/revalidate` dengan header `Authorization: Bearer <REVALIDATE_SECRET>` menandai semua halaman basi (`revalidatePath("/", "layout")`); render ulang terjadi di kunjungan berikutnya. Isi `REVALIDATE_SECRET` di env server.

```bash
curl -X POST https://lumpiambakcun.allfilldev.com/api/revalidate -H "Authorization: Bearer $REVALIDATE_SECRET"
```

Endpoint ini tidak memperbaiki proses lama: jika `next start` tidak di-restart setelah build, render ulang memakai kode build lama. Setelah build, selalu restart proses.
