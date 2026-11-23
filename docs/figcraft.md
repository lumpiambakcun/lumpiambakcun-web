# FigCraft (wireframe)

Wireframe desain disimpan di `app.figcraft` (aplikasi FigCraft/ArtCraft, bukan Figma). File ini arsip zip berisi `document.json` dan gambar.

## Cara kerja

FigCraft dijalankan pengguna dengan `figcraft --control 7979`. Aplikasi membuka port TCP `127.0.0.1:7979` (hanya loopback, tanpa autentikasi). Wireframe dibangun langsung di aplikasi yang berjalan lewat skrip di `design/figcraft/`, jangan menulis `app.figcraft` dari luar saat dokumennya terbuka.

Protokol: satu JSON per baris, `{"id":1,"method":"engine.execute","params":{"command":"node.create","params":{...}}}`. Balasan `{"id":1,"ok":true,"result":...}` atau `{"ok":false,"error":"..."}`. Beberapa perintah dikirim sebagai `command.batch` (all-or-nothing); langkah diberi `as` dan dirujuk dengan `{"$ref":"nama"}`.

Daftar perintah dan parameternya: `engine.commands` (645 perintah). CLI headless: `C:\Program Files\ArtCraft\FigCraft\figcraft-cli.exe` (`info`, `render`, `export`, `run`, `mcp --attach 7979`).

## Berkas di `design/figcraft/`

| Berkas | Fungsi |
| --- | --- |
| `client.mjs` | Klien TCP ke port kontrol (`FIGCRAFT_PORT` untuk mengganti port) |
| `tokens.mjs` | Warna, font, radius, border, shadow, jarak. Ganti tema di sini |
| `dsl.mjs` | `F` (frame), `T` (teks), `Img`, `Icon`, dan `flatten` ke langkah batch |
| `components.mjs` | Tombol, chip, kartu produk (Frozen + Goreng satu kartu), kartu Paket Mix, layanan/andalan, baris menu, field form, `Plate` dan `Doodle`, ikon (termasuk skuter antar) |
| `beranda.mjs` | Susunan 11 section beranda (urutan Poco home-4) dan kontennya |
| `build-beranda.mjs` | Membangun frame "Beranda" di aplikasi |
| `render.mjs` | Render frame ke PNG untuk pengecekan (nama atau id) |
| `make-assets.mjs` | Membuat potongan piring, `paket-mix.png`, dan doodle dari `promo 2.png` dengan ImageMagick |
| `assets/` | Foto produk crop `DAFTAR HARGA 2.jpg`, logo, dan hasil `make-assets.mjs` (`piring-*.png`, `paket-mix.png`, `doodle-*.png`) |

## Perintah

```bash
cd design/figcraft
node build-beranda.mjs             # bangun (berhenti bila frame Beranda sudah ada)
node build-beranda.mjs --rebuild   # hapus frame Beranda lalu bangun ulang
node build-beranda.mjs --rebuild --save   # sekaligus file.save
node build-beranda.mjs --dry       # tulis beranda.script.json tanpa mengirim
node render.mjs Beranda out.png 0.5       # render ke PNG (skala 0.5)
node render.mjs 3170 hero.png 0.8         # pakai id bila namanya kembar ("Hero" ada di Beranda v1 juga)
node make-assets.mjs                      # buat ulang aset piring dan doodle (butuh `magick`)
```

`--rebuild` menghapus seluruh frame bernama persis "Beranda", termasuk edit manual di dalamnya. Frame "Beranda v1" (versi pertama) dan "Beranda v2" (versi Poco sebelum revisi piring) sengaja dibiarkan sebagai cadangan dan tidak disentuh. Sebelum rebuild berikutnya, ganti nama frame yang ingin disimpan (`node.set` `name`).

## Keputusan desain

- Palet dari Pedoman Identitas Visual: kuning `#FFDF00`, merah `#A80000`, hitam `#0A0A0A`, putih; krem `#FFF8D6` turunan untuk latar selang-seling.
- Tipografi: Atyp Kido (versi TRIAL, family `Atyp Kido TRIAL`) untuk judul, Nunito untuk isi, Mr Dafoe (tanda tangan, OFL) untuk label skrip seperti "Selamat datang!" (`SCRIPT` di `tokens.mjs`; ganti satu konstanta bila ingin font lain).
- Ringkas: jarak antar kartu 12, di dalam kartu 6, padding kartu 10, padding section 40-44, line height 98-132% sesuai gaya teks. Border 1 px ink 10%; token `SHADOW` (satu lapis `0 1 3` ink 8%) tersedia tapi beranda saat ini tidak memakainya.
- Referensi utama: https://demo2.pavothemes.com/poco/home-4/ (top bar, header, hero, welcome, eksplor + daftar menu, layanan, hidangan populer, testimoni, kartu "Our Talented Chefs", reservasi, footer). Aset hanya sumber konten dan brand. Container 1290 seperti Poco.
- Pemetaan warna Poco ke brand: kuning `#FFC222` jadi `#FFDF00`; oranye hero jadi kuning; hijau (logo, pita, lencana) jadi merah `#A80000`; gelap `#1E1D23` jadi `#0A0A0A`; krem netral jadi token krem. Harga memakai merah supaya terbaca di atas putih. Font Gilroy diganti Atyp Kido dan Nunito.
- Penyesuaian konten: bagian chef menjadi "Produk Andalan" (tidak ada foto tim); bintang rating pada kartu hidangan diganti label varian (Frozen atau Goreng) karena tidak ada data rating; kolom "Opening hours" di footer menjadi "Pesan antar" karena jam buka tidak ada di aset.
- Angka Poco dirapatkan: hero 827 jadi 540, padding section 100 jadi 48 sampai 56, border 1 px ink 10%, tanpa shadow.
- Testimoni berisi placeholder (`[Nama pelanggan]`); Pisang Karamel memakai kotak foto placeholder karena belum ada foto dan harga di aset. Deskripsi kartu hidangan ("frozen, tinggal goreng" / "sudah digoreng") disimpulkan dari label Frozen dan Goreng di daftar harga.

## Font

Font belum ada di Windows secara bawaan. Font brand: salin dari `LUMPIA MBAK CUN/FONT/*.zip`. Mr Dafoe: unduh `MrDafoe-Regular.ttf` dari `raw.githubusercontent.com/google/fonts/main/ofl/mrdafoe/`. Salin file font ke `%LOCALAPPDATA%\Microsoft\Windows\Fonts`, daftarkan di `HKCU\Software\Microsoft\Windows NT\CurrentVersion\Fonts`, lalu minta aplikasi memindai ulang dengan perintah `text.rescanFonts` (tanpa restart). Cek dengan `figcraft-cli info app.figcraft --json`: `missingFonts` harus kosong.

## Catatan

- Properti `effects` memakai `{type, color, offset:[x,y], radius, spread}` (bukan `blur`/`offsetX`).
- Frame di auto layout memakai `sizingH`/`sizingV` (`fixed|hug|fill`); child `absolute: true` tidak ikut alur dan terpotong oleh `clip` induknya.
- `node.find` mencocokkan substring nama, jadi runner dan `render.mjs` menyaring nama persis.
- Vektor tidak boleh tanpa tinggi (garis lurus); garis titik-titik dibuat dari frame setinggi 1 px dengan `dashes`.
- Menambah halaman: buat `design/figcraft/<halaman>.mjs` memakai komponen yang ada, lalu runner serupa `build-beranda.mjs`.

## Aset piring dan doodle

`make-assets.mjs` memotong piring dari `LUMPIA MBAK CUN/promo 2.png` (1254 x 1254). Latar kuning berpola mirip warna gorengan, jadi flood-fill dan colorkey memakan makanan; yang dipakai adalah mask elips piring + poligon makanan yang menjulang, dikurangi poligon label merah, lalu pita 12 px di tepi dibersihkan dari sisa kuning. Koordinat ada di konstanta `PLATES`.

- Mask harus abu-abu tanpa alpha (`-alpha off -colorspace Gray`), kalau tidak `CopyOpacity` memakai alpha yang selalu penuh dan gambar tidak terpotong.
- Poligon tambahan harus menembus elips; kalau hanya menempel, ada celah tipis (terlihat sebagai garis transparan di makanan).
- Piring yang tertutup label (kanan bawah Piscok dan Tahu Bakso) menyisakan takik kecil; tidak bisa dipulihkan dari gambar sumber.
- `doodle-*.png` berasal dari `-canny` pada versi blur piring (garis ink, latar transparan). Opacity diatur di FigCraft (0.10-0.12), bukan di file.
- `RATIO` di `components.mjs` membaca ukuran PNG dari header file, jadi `Plate` dan `Doodle` selalu proporsional setelah aset dibuat ulang.
- Piscok memakai foto piring Pisang Karamel (satu produk yang sama), harga dari daftar harga.
- Harga Paket Mix tidak ada di aset, jadi kartu hanya menulis "Tanya harga paket via WhatsApp".

## Beranda diedit langsung di FigCraft

Frame "Beranda" sekarang dirapikan langsung di aplikasi lewat port kontrol (`node.reparent`, `node.set`, `edit.duplicate`), bukan dari skrip. `build-beranda.mjs --rebuild` akan menghapus frame "Beranda" beserta semua perubahan manual, jadi hanya dipakai sebagai titik awal; skrip `beranda.mjs` tidak lagi sinkron dengan dokumen. Cadangan sebelum perapian ada di frame "Beranda v4 (cadangan sebelum rapikan)".

- Label abu-abu di kanvas (mis. "Foto lumpia", "Teks pita") adalah nama layer tingkat atas: tandanya layer itu terlepas dari frame induk. Pindahkan kembali dengan `node.reparent`.
- `hero-*.png` (4 piring hero) dipotong dari `assets/kolase-produk.png` oleh `cutoutKolase()` di `make-assets.mjs` (elips piring + poligon makanan; latar kolase buram jadi tidak perlu key warna).
- `doodle-01..09.png` dipotong dari `assets/doodle-sheet.png` (lembar 3 x 3 sketsa garis, latar abu) oleh `doodleSheet()` di `make-assets.mjs`: gray sRGB (`-grayscale Rec601Luma`), `-level 0%,18%`, negate jadi alpha, ink di atas transparan, disimpan RGBA.
- `image.place` pada layer yang sudah punya gambar MENAMBAH fill baru, tidak mengganti. Untuk mengganti gambar, setelah place sisakan fill terakhir saja (`node.set` `fills` dengan elemen terakhir), kalau tidak gambar lama tetap terlihat bertumpuk.
- Panel peta di "Pesan sekarang" adalah wireframe vektor (jalan, blok, pin, kartu alamat), bukan tile peta nyata.
- Peta di section Lokasi memakai `assets/peta-google.png` (640 x 400): tangkapan layar Google Maps zoom 17 di titik -7.0712887, 110.4210899 (Playwright, jendela 1400 x 1000 lalu dipotong di tengah peta, tanpa panel UI), dengan teks atribusi "Google Maps" di pojok. Pin dan kartu "Lumpia Mbak Cun" adalah elemen desain. Embed Google langsung (`output=embed`) menolak dibuka di luar iframe; untuk situs asli pakai iframe Google Maps Embed. Klik peta dan tombol Maps memakai `proto.interaction.add` (`openUrl`). `assets/peta-lokasi.png` (OpenStreetMap) tidak lagi dipakai.
- Kolom Pesan di footer memakai gaya yang sama dengan kolom Kunjungi: ikon kecil di chip putih 26 px + teks putih 13 px. Ikon: `assets/logo-whatsapp.png` (simple-icons, #25D366), `icon-gofood.png` (ikon dari Wikimedia Commons "Gofood logo.svg"), `logo-grabfood.png` (logo bertumpuk Grab/Food putih, dibuat dari PNG seeklogo 389124 dengan ImageMagick, dipasang di chip hijau #00B14F) dan `icon-shopeefood.png` (kotak garpu+sendok, dipotong dari PNG seeklogo 397473). Semuanya PNG karena FigCraft tidak punya kontrol fill-rule (path bertumpuk tampil rusak) dan ImageMagick bawaan merender SVG rusak; rasterisasi SVG pakai `@resvg/resvg-js`.
- Kartu section Menu: foto lingkaran 156 px (cincin putih 5 px) absolut di `y:-64` sehingga menonjol di atas kartu, jadi kartu dan baris hidangan wajib `clip:false`; baris diberi padding atas 64 untuk ruang lingkaran dan isi kartu padding atas 108 dengan teks rata tengah.
- Lingkaran foto kartu Menu memakai `assets/foto-*-cermin.jpg`: foto utuh (`foto-*-asli.jpg`, dikirim pengguna) diperluas jadi persegi dengan pantulan tepi (ImageMagick `-virtual-pixel Mirror -distort SRT 0` dengan viewport persegi), lalu dipasang mode fill di lingkaran, jadi seluruh foto terlihat dan ruang kosong menyatu. Pisang Karamel dari `8qaytp...jfif` (1032x774) diperlakukan sama. Lumpia kembali memakai foto lama `foto-lumpia.jpg` (825x370, dari Daftar Harga); `foto-lumpia-asli.jpg` (Go-Biz 500x375) tidak dipakai di Menu.

## Tablet dan Mobile

- Frame `Beranda Tablet` (768 px, x 1540) dan `Beranda Mobile` (390 px, x 2508) dibuat dengan `edit.duplicate` dari frame `Beranda` live lalu disesuaikan lewat `node.set` (bukan dari `beranda.mjs`, yang sudah tidak sinkron). Perubahan di desktop tidak otomatis ikut ke dua frame ini.
- Nama anak sama dengan desktop (mis. "Menu", "Hero"), jadi skrip harus menelusuri dari root salinan (anak dengan nama persis), bukan `node.find` (substring).
- `node.set` menerima `layout` (`horizontal`/`vertical`/`grid`), `wrap`, `crossGap` (jarak antarbaris saat wrap), `sizingH`/`sizingV`, `fontSize`, `visible`. `sizingH:"fill"` gagal bila induk tidak auto layout (mis. "Judul tag" di Hero); pakai `fixed` + `width`. Vektor (`Tag miring`, `Pita bertakik`) ikut ter-scale saat `width/height` diubah.
- Aturan ringkas: padding samping 32 (tablet) / 6 (mobile; vertikal 12, bar atas 6); Hero Tablet = versi mini desktop (teks 350 px kiri, piring absolut kanan dengan constraint right), Hero Mobile vertikal; Cara pesan vertikal; Keunggulan 3 kolom grid, kartu ke-5 `gridColumnSpan:2` (tablet) / 1 kolom (mobile); Menu 2 kolom wrap dengan `crossGap` 74 supaya lingkaran foto 64 px tidak menabrak (mobile 1 kolom vertikal gap 74); Testimoni seperti carousel: tablet 2 ulasan horizontal (kartu ke-3 `visible:false`, 2 titik), mobile 1 ulasan (3 titik); Lokasi dan Footer vertikal. Mobile: Top bar tanpa alamat, Header hanya merek + hamburger (menu utama dan CTA dihapus di salinan).
- Jarak bawah kartu Menu = 16 px (padding bawah kartu luar 0, padding `Isi kartu` 16).
- Preview prototipe (mis. iPhone 17 Pro Max 430 px) meregangkan frame mobile, jadi elemen berlebar tetap tidak ikut melebar. Pakai `sizingH:"fill"` bila induk auto layout; untuk anak `absolute` pakai `constraints` (`{horizontal:"center"|"right"|"leftRight", vertical:"top"}`). Kartu Keunggulan/Menu di Tablet memakai `layout:"grid"` (`gridColumns`), di Mobile tumpukan vertikal dengan kartu fill; lingkaran foto Menu `constraints.horizontal:"center"`; kartu WhatsApp di Cara pesan tidak lagi `absolute`.
- Frame terpisah `Menu hamburger (terbuka)` (390 px, x 6260, di kanan Beranda v3 agar tidak menimpa potongan section lama di x 2920-4360): tampilan menu saat hamburger dibuka (header dengan tombol tutup X, daftar Beranda/Menu/Cara Pesan/Lokasi, tombol WA dan Lihat Menu, info kontak). Header disalin dari `Beranda Mobile`; X dibuat dari dua garis `absolute` dengan `rotation` ±45 (x,y = titik kiri-atas sebelum rotasi, pivot di titik itu; rotation positif = berlawanan arah jarum jam). Belum ada interaksi prototipe dari tombol hamburger.

## Halaman lain (desktop, Tablet, Mobile)

Dibuat langsung di aplikasi (duplikat bagian Beranda lewat `edit.duplicate` + `node.reparent`, bagian baru lewat DSL `flatten` + `batch`), di bawah semua frame lain. Satu baris per halaman mulai y 10400; tiap baris diberi jarak 400 px dari frame tertinggi di baris sebelumnya. Desktop di x 0 (1440 px), Tablet di x 1540 (768 px), Mobile di x 2508 (390 px).

| Halaman | Desktop | Tablet | Mobile | Isi |
| --- | --- | --- | --- | --- |
| Menu | `Halaman Menu` 7701 | 8871 | 9204 | Chip kategori (+ "Semua"), 8 kartu produk, ajakan pesan banyak |
| Cara Pesan | `Halaman Cara Pesan` 7963 | 9524 | 9784 | Pilih cara pesan (website/WhatsApp/aplikasi), Cara memesan (tab Via website | Via WhatsApp, 4 langkah masing-masing), Pengiriman, Bantuan (kartu WhatsApp) |
| Lokasi | `Halaman Lokasi` 8210 | 10031 | 10240 | Kartu info + peta, GoFood/GrabFood/ShopeeFood |
| 404 | `Halaman 404` 11347 | 11450 | 11625 | Angka 404 dengan piring lumpia, pesan galat, tombol Kembali ke beranda / Lihat menu, tautan cepat |
| Checkout | `Halaman Checkout` 11829 | 12016 | 12275 | Form (data pemesan, pengambilan, metode pembayaran) + ringkasan pesanan (item, kode promo, total, Bayar sekarang / WhatsApp) |
| Detail Menu | `Halaman Detail Menu` 8509 | 10436 | 10695 | Templat Lumpia: galeri, varian, harga, jumlah, tombol Beli sekarang / WhatsApp / Tanya dulu, menu lainnya |

- Section yang sudah dihapus pengguna di desktop (banner judul, Frozen atau goreng, FAQ, ulasan, dst.) tidak ada di Tablet/Mobile.
- Tablet dan Mobile = `edit.duplicate` desktop, lalu Top bar, Header, dan Footer diganti salinan dari `Beranda Tablet` / `Beranda Mobile` (header tanpa menu utama, ada hamburger). Section "Cara pesan" memakai salinan langsung dari Beranda Tablet (6877) / Mobile (7415).
- Aturan sama dengan Beranda: padding samping 32 (tablet) / 6 (mobile; di halaman selain Beranda padding samping 12, vertikal 24, gap antar elemen 12); kartu produk grid 2 kolom `crossGap` 74 (tablet) atau vertikal gap 74 (mobile); baris kartu jadi vertikal di mobile dengan kartu `sizingH:fill` (`sizingV:hug`); teks panjang `sizingH:fill`; Detail Menu vertikal (foto, thumbnail, info; Aksi beli mobile vertikal).
- Desktop tidak otomatis menyebar ke Tablet/Mobile; ubah ketiganya bila ada perubahan.
- Teks yang ditulis sendiri (perlu dikonfirmasi): `@lumpiambakcun`, minimal 50 pcs dengan DP H-1, harga Lumpia 25.000/30.000, penjelasan penyimpanan dan cara menggoreng.
- Detail Menu: `Aksi beli` vertikal: counter jumlah (lebar 168, tombol 44) lalu baris `Tombol pesan` (Beli sekarang merah dengan ikon keranjang, Pesan via WhatsApp outline, Tanya dulu outline; vertikal fill di mobile). Thumbnail punya fill putih di bawah gambar supaya PNG transparan tidak menyatu dengan latar krem. Tombol website baru hanya di Detail Menu; kartu produk dan Header masih WhatsApp.
- Cara Pesan: section "Pilih cara pesan" dan "Pesan via website" dibuat dengan DSL; teks metode pembayaran (QRIS, Transfer bank, E-wallet) dan label "Rekomendasi" adalah placeholder untuk integrasi payment.
- Cara Pesan: section "Cara memesan" punya chip tab; frame `Isi tab website` (tampil, berisi langkah) dan `Isi tab WhatsApp` (`visible:false`). Tab belum punya interaksi prototipe; ubah `visible` keduanya untuk melihat tab WhatsApp. Section "Cara pesan" sekarang ajakan bantuan ("Butuh bantuan memesan?").
- Komponen Cart slider (laci keranjang), sebaris dengan Checkout di kanan Mobile: `Cart slider` 12521 (x 3000, 420 px, 2 item), `Cart slider (kosong)` 12568 (x 3500, keadaan kosong), `Cart slider Mobile` 12583 (x 4000, 390 px). Isi: kepala (judul, jumlah item, tombol tutup), daftar item (foto, nama, varian, stepper, harga, hapus), kaki (subtotal, Checkout, Lanjut belanja). Belum ada interaksi prototipe (buka/tutup).
- Menu Tablet/Mobile: chip `Kategori` satu baris (tanpa wrap) dengan `overflow: horizontal` dan `clip`, rata kiri, jadi bisa digeser kanan-kiri; di mobile chip yang tidak muat terpotong di tepi kanan.
- Slider `Kategori` (Menu Tablet/Mobile) punya `Fade kanan` (absolute, constraint kanan/topBottom): gradien horizontal dari krem transparan ke krem (`type:"gradient", kind:"linear", from:[0,0.5], to:[1,0.5], stops`), lebar 28 tablet / 44 mobile, supaya chip memudar di tepi kanan.
- Cara Pesan Tablet, section "Pilih cara pesan": kartu "Via website" satu baris penuh lebar, lalu `Baris dua` (Via WhatsApp dan Via aplikasi, dua kolom, tinggi kartu disamakan dengan tinggi tetap hasil ukur isi).
- Kartu produk di Tablet/Mobile (Menu dan Menu lainnya): lingkaran foto (`Media`) memakai `constraints.horizontal:"center"` dan x dihitung dari lebar kartu, supaya tetap di tengah saat frame meregang di preview.
- Detail Menu Tablet: `Galeri` horizontal, `Thumbnail` jadi kolom vertikal (96 px) di kiri foto, foto utama tinggi 384. Detail Menu Mobile: `Baris beli` vertikal (counter, Beli sekarang, WhatsApp, Tanya dulu bertumpuk penuh lebar).

## Implementasi Next (beranda)

Beranda sudah dipindah ke `src/app/(site)/page.tsx`; header, top bar, dan footer ada di `src/app/(site)/layout.tsx`.

| Mockup | Kode |
| --- | --- |
| Top bar, Header (+ hamburger), Footer | `src/components/layout/` (`top-bar`, `site-header`, `nav-links`, `mobile-nav`, `site-footer`) |
| Hero | `sections/hero.tsx`, `hero-headline.tsx` (tag miring + pita bertakik lewat `clip-path`), `price-sticker.tsx` |
| Katalog, Keunggulan, Menu, Cara pesan, Testimoni, FAQ, Lokasi | `sections/price-catalog`, `features`, `menu-section` + `menu-browser`, `order-section` + `whatsapp-card`, `testimonials` + `testimonials-carousel`, `faq`, `location` |
| Teks dan data | `src/content/beranda.ts`; kontak, alamat, jam, tautan di `src/config/site.ts` |
| Gambar | `public/images/`; yang tidak cocok dengan berkas di `design/figcraft/assets/` (piring hero, foto katalog, foto lumpia bundar, dua doodle) diekstrak dari `app.figcraft` (`images/<sha256>`) |

Breakpoint: mobile < 768 (padding samping 12), tablet 768-1023 (32), desktop >= 1024 (40, 75 mulai 1280). Mockup mengikuti frame Beranda, Beranda Tablet, Beranda Mobile.

Keputusan dan hal yang perlu dikonfirmasi:

- Font judul Atyp Kido adalah versi TRIAL (`src/fonts/`, dimuat `next/font/local` di `src/app/layout.tsx`). Ganti file dengan versi berlisensi sebelum rilis komersial.
- Mockup tidak punya spesifikasi hover/fokus; semuanya dirancang di kode: hover hanya di perangkat yang punya hover, satu ring fokus global di `globals.css` (`@layer base`, `:focus-visible`: pita kuning 3 px + garis tepi ink 2 px, terlihat di semua latar; jangan menambah kelas `focus-visible:ring-*` atau `outline-none` per komponen, dan jangan beri `overflow-hidden` pada induk elemen fokus karena ring terpotong), hover tautan/menu hanya ganti warna teks (tanpa garis bawah animasi), hover chip/tombol outline memakai isi ink + teks kuning, hover kartu FAQ memakai border merah penuh (bukan transparan), `cursor: pointer` lewat base layer, animasi hanya `motion-safe`.
- Chip kategori menu mendapat "Semua" dan aktif awal (mockup menampilkan "Lumpia" aktif tapi 8 kartu terlihat). Klik chip aktif kembali ke semua.
- Header dibuat sticky; ikon skuter di tombol pesan digambar ulang dari vektor mockup (`DeliveryScooterIcon`). Peta berupa gambar `peta-google.png` yang menjadi tautan ke Google Maps (tanpa label hover dan tanpa shadow; shadow dihapus di seluruh beranda atas permintaan).
- Doodle latar: posisi, ukuran, putaran, dan opacity ada di `src/content/doodles.ts` (tabel per section, dihasilkan dari frame Beranda, Beranda Tablet, Beranda Mobile). `Section` merendernya lewat prop `doodles` di lapisan yang menempel ke section (bukan ke isi), doodle di separuh kanan frame dijangkar ke tepi kanan. Doodle piring di "Cara pesan" tidak dipakai karena di mockup tertutup kartu WhatsApp. Di FigCraft rotasi positif berlawanan arah jarum jam dan berputar di pojok kiri-atas (`x`,`y` node = titik putar), jadi `Doodle` memakai `rotate: -derajat` dengan `transform-origin: top left`. Untuk membaca posisi baru, hitung titik putar dari `absoluteBounds` dan rotasi node, lalu kurangi pojok section.
- Fade-in saat pertama di-scroll: `ScrollReveal` (satu di `(site)/layout.tsx`) mengamati `[data-reveal]` (dipasang `Section` dan footer). Elemen yang sudah terlihat saat muat tidak dianimasikan; tanpa JS atau dengan `prefers-reduced-motion` semuanya langsung tampil. Atributnya diubah di luar React, jadi elemen target memakai `suppressHydrationWarning`.
- FAQ memakai `StableHeight`: salinan tak terlihat dari daftar dengan jawaban terpanjang terbuka menahan tinggi, sehingga membuka item tidak menggeser section di bawahnya.
- Kontrol carousel ulasan tampil karena ada 6 ulasan (3 per halaman di desktop = 2 titik, sama dengan mockup).
- Ulasan: teks dari `old-example/Main.dc.html`. Foto profil diunduh dari Google Maps untuk 3 pengulas (Ekka N., Inggit N., Chrisna N.) ke `public/images/reviewers/`; Maps tanpa login hanya menampilkan 5 ulasan, jadi Nurlia E., Ria R., Mita V. memakai inisial sampai fotonya tersedia (letakkan berkas di folder itu dan isi `avatar` di `src/content/beranda.ts`).
- Tautan GoFood, GrabFood, ShopeeFood dan Instagram diambil dari `old-example/Main.dc.html` (`orderChannels` dan `businessConfig` di `src/config/site.ts`); semua baris footer punya hover yang sama.
- Jawaban FAQ nomor 2 sampai 9 tidak ada di mockup; disusun dari fakta lain di mockup dan perlu dikonfirmasi. Harga hero (Rp 23 ribu, Rp 2.300 per biji) tidak cocok dengan katalog (Rp 25.000 isi 10, Rp 2.300 per biji); teks disalin apa adanya dari mockup.

- Carousel ulasan berputar tanpa ujung (`loop: true`); tombol sebelumnya/berikutnya selalu aktif.
- Slider (chip menu di bawah `lg`, carousel ulasan) memakai utility `edge-fade-x` di `globals.css`: lebar fade lewat `--fade-l`/`--fade-r`. Chip menu mengatur fade dari posisi gulir (tanpa fade di ujung); carousel ulasan hanya fade saat bergerak dan viewport-nya melebar sampai tepi layar (`viewportClassName` di `CarouselContent`).
- Panah akordeon adalah SVG 14x8 stroke 2,2 seperti mockup (bukan ikon lucide), diputar 180 derajat saat terbuka. Peta lokasi: 366x240 (mobile), 704x320 (tablet), 640x400 (desktop).
- Menu hamburger (di bawah `lg`) berupa Sheet layar penuh. Isinya memakai komponen yang sama dengan halaman: `TopBar` (hanya bila terlihat saat dibuka), `HeaderRow`, `BrandLogo`, dan `MenuToggle` (hamburger saat tertutup, X saat `open`), jadi tombol tidak berpindah tempat.

## Halaman Menu, Cara Pesan, Lokasi, 404 (sudah dibuat)

- Route: `/menu`, `/cara-pesan`, `/lokasi` di `src/app/(site)/` dan `src/app/not-found.tsx`. Detail Menu, Checkout, dan laci Keranjang belum dibuat. `navLinks` menunjuk halaman baru; `NavLinks` dan `MobileNav` menandai aktif lewat `pathname`. CTA "Lihat Menu" di Beranda dan menu hamburger juga ke `/menu`.
- `SiteShell` (`src/components/layout/site-shell.tsx`) membungkus skip link, `TopBar`, `SiteHeader`, `<main>`, `SiteFooter`; dipakai `(site)/layout.tsx` dan `not-found.tsx` (root `not-found` hanya dibungkus root layout, jadi rangka halaman dirakit sendiri).
- Konten menu dipakai bersama di `src/content/menu.ts` (`menuCategories`, `menuProducts`, `menuPage`); `/menu` tidak punya banner judul (h1 sr-only), langsung chip + kartu, lalu `CtaBand` merah.
- Doodle halaman memakai `doodleLayout.menuPage`, `lokasiInfo`, `lokasiApps`, `caraPesanMetode`, `caraPesanLangkah`, `caraPesanPengiriman`, `notFound` (koordinat dari `absoluteBounds` seperti Beranda). Aset baru: `doodle-lumpia-oval.png`, `doodle-piscok.png` di `public/images/doodles`, piring 404 di `public/images/404/piring-lumpia.png`.
- Cara Pesan: kartu metode, langkah (tab chip), pengiriman memakai `OrderCard`, `StepCard`, `TitledSection`, `IconBadge`, `ChannelLogos`. Tab memakai shadcn `tabs` dengan variant `chips` (sama dengan chip kategori menu); semua panel `forceMount` dan ditumpuk di satu sel grid supaya tinggi tidak berubah saat ganti tab. Judul kartu ketiga "Via aplikasi" (desktop mockup menulis "Via Ojol"; Tablet/Mobile "Via aplikasi").
- Karena Keranjang dan Checkout belum ada, tombol "Beli sekarang" (kartu Via website) mengarah ke `/menu` sebagai pengganti sementara. Ganti ke halaman checkout saat tersedia.
- Lokasi: `LocationInfoCard` + `MapLink` (juga dipakai section lokasi Beranda) + `OrderApps` (kartu `ChannelCard`). Alamat memakai `businessConfig.address.postalLine` (alamat lengkap dengan kode pos dari mockup).
- Bagian Bantuan di Cara Pesan memakai `OrderSection` yang sama dengan Beranda (props `text`, `id`, `doodles`; `steps` opsional).
- 404: `NotFoundHero`; "4 [piring] 4" disusun dari dua huruf Kido dan gambar piring (aria-hidden), judul h1 di bawahnya. Halaman 404 tidak masuk sitemap dan memberi `noindex`.
- Kartu produk: jarak harga ke keterangan 4 px (bukan 12) sehingga tinggi kartu 226 seperti mockup; jarak antar baris kartu 74 (78 di desktop).
