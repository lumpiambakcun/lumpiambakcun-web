# Media

- Semua gambar raster di `public/images` berformat **WebP** (6,3 MB menjadi 1,1 MB). Yang bukan WebP: `src/app/favicon.ico` dan SVG (ikon).
- Konversi dengan ImageMagick, kualitas 80 (doodle 70), alpha dipertahankan. Sisi terpanjang dibatasi sekitar 2x ukuran tampil: doodle 640, foto menu 400, piring 404 480, emblem 330, katalog 800. Hero, peta, dan logo kanal tetap ukuran asli.
- Contoh untuk menambah gambar: `magick foto.jpg -resize "400x400>" -quality 80 foto.webp`, lalu rujuk `.webp` di `src/content/*`. Jangan simpan PNG/JPG asli di `public/`.
- `next/image` tetap dipakai dengan `sizes` yang sesuai; hanya hero dan logo header yang `priority`.
- Galeri detail menu: `public/images/menu/detail/{kategori}-{1..3}.webp` (sisi terpanjang maks 1000, kualitas 80), sumber di `design/figcraft/assets/` (urutan: foto asli, foto lebar, piring). Pisang Karamel hanya 2 foto; daftar di `menuGallery` (`src/content/menu.ts`). Foto Tahu Bakso #3 hanya 387 px sehingga agak lunak.
- Aset OG (`src/assets/og/*.png|jpg`) harus PNG/JPEG, total per rute di bawah 500 KB.
- Foto lumpia dan tahu bakso (katalog beranda, kartu menu, galeri) berasal dari foto pemilik dan foto referensi di luar repo, di-crop 4:3 (galeri) atau persegi 400 px (kartu). Watermark "ResepKoki" pada foto selada dibuang lewat crop; hak pakai foto tahu belum dikonfirmasi.
- `public/images/brand/halal.webp`: logo Halal Indonesia (BPJPH), hasil render SVG resmi (Wikimedia Commons, domain publik, sumber halal.go.id) ke WebP tinggi 160 px dengan latar transparan; tampil 40 px.
