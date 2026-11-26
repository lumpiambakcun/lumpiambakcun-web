# Admin

Halaman pemilik di `/admin`: login, daftar pesanan, dan pesanan manual, dengan kerangka sidebar + header profil. Tidak diindeks (`robots.txt` melarang `/admin` dan `/auth`, meta `noindex`).

## Cara kerja

- **Admin** = akun Supabase Auth dengan `app_metadata.role = "admin"`. `app_metadata` hanya bisa diubah dari server atau dashboard, tidak oleh pengguna.
- **Lapis 1** `src/proxy.ts` (matcher `/admin/:path*`): menyegarkan sesi dan mengalihkan yang belum punya sesi ke `/admin/login`. Hanya `/admin/login` dan `/admin/lupa-password` yang publik.
- **Lapis 2 (otorisasi sebenarnya)** `requireAdmin()` di `src/lib/admin-auth.ts`: bertanya ke server Auth lalu mengecek role. Dipanggil di setiap halaman admin dan setiap server action. Proxy saja tidak cukup.
- Data dibaca dan ditulis lewat service role (`src/lib/supabase/admin.ts`); tabel `orders` tetap tanpa policy untuk `anon` dan `authenticated`.
- Halaman yang memakai `requireAdmin()` memanggil `await connection()` dulu. Tanpa itu `next dev` mencatat galat `Date.now()` saat prerender.

## Kerangka panel

`(panel)/layout.tsx`: `SidebarProvider` + `AdminSidebar` + `SidebarInset` (`AdminHeader` + `main`). Menu ada di `src/config/admin.ts` (satu daftar; tambah item di sini). Sidebar ikon + teks, bisa diciutkan jadi ikon (tooltip), di mobile jadi sheet; keadaan buka/tutup tidak disimpan (tanpa cookie, karena `cacheComponents`). Header hanya berisi tombol sidebar dan `ProfileMenu` (avatar + nama; isi: nama/email, **Lihat Situs** di tab baru, **Keluar**). `ProfileMenu` (server) membaca sesi, jadi dibungkus `<Suspense>`; tampilannya ada di `ProfileMenuView` (client). **Keluar** membuka `AlertDialog` konfirmasi; saat ditutup, fokus dikembalikan ke pemicu profil lewat `onCloseAutoFocus` (item menu sudah tidak ada saat itu). Halaman login/lupa/atur kata sandi memakai `AuthShell` (tanpa sidebar).

Komponen form: `SelectField` (shadcn Select + input tersembunyi lewat `name`, nilai item tidak boleh string kosong), `DatePicker`, `TimeSelect` (slot 30 menit dari `businessConfig.hours`), `PasswordInput`. Form pesanan manual memakai `onSubmit` + `startTransition`, bukan `<form action>`, supaya isian tidak dikosongkan React 19 saat validasi gagal. Label form panel memakai `FormField tone="admin"` (sentence case, netral); tone `brand` (kapital merah) tetap untuk checkout publik.

**Gaya panel.** Latar `bg-canvas` (netral hangat), card putih `border-border` + `shadow-card`, merek hanya untuk aksi utama, item menu aktif (tint saja), dan teks galat. Warna status lewat token `--status-paid|pending|void|failed` (titik di `OrderStatusBadge`). Tombol panel memakai variant `default` (sentence case); variant `brand`/`accent` (kapital) khusus situs publik. Tinggi kontrol panel: 40px (toolbar) dan 45px (form); `SelectField` memaksa `data-[size=default]:h-[45px]` karena `SelectTrigger` punya tinggi sendiri.

**Header halaman** memakai `PageHeader` (H1 dan aksi di kanan, tanpa deskripsi). Judul tab: template `%s | Panel Admin Lumpia Mbak Cun` di `app/admin/layout.tsx`.

**Daftar pesanan.** `OrdersContent` (server) mengambil data; `OrdersLiveFilters` (client) memegang pencarian. Pencarian debounce 300 ms, dropdown dan Enter langsung berlaku, state di URL lewat `router.replace(..., { scroll: false })` di dalam `useTransition` (tanpa riwayat per ketikan; React menahan hasil lama sambil memuat dan hanya menerapkan navigasi terakhir, jadi tidak ada flash kosong atau hasil basi). Jumlah hasil hanya tampil di paginasi (`role=status aria-live=polite`, jadi diumumkan saat berubah). Panel tidak menggulir halaman: `SidebarInset` setinggi layar (`h-svh`), dan hanya kontainer tabel yang menggulir (header sticky, paginasi di bawahnya tetap terlihat); rantai flex `min-h-0` dari layout sampai card tabel yang membuatnya begitu. Header tabel sticky dengan scroll di dalam card (`Table containerClassName`). Aksi baris: `OrderRowActions` (menu ⋯: detail, chat WhatsApp, tandai lunas, batalkan dengan `AlertDialog`).

**Tambah pesanan.** Tombol di header halaman Pesanan membuka `AddOrderDialog`: Dialog di layar lebar, Sheet dari bawah di layar kecil (`useIsMobile`). Form `ManualOrderForm` memakai ulang server action `addManualOrder`; setelah tersimpan: toast (`sonner`), dialog menutup, tabel refresh lewat `revalidatePath("/admin")` (aksi tidak lagi `redirect`). Tanggal awal dihitung saat dialog dibuka, bukan saat render.

Halaman auth (`(auth)/layout.tsx`) menengahkan form secara vertikal dengan `min-h-dvh` + `my-auto`, dan mengekspor `viewport.interactiveWidget = "resizes-content"` agar keyboard mobile/tablet mengecilkan area layout (Chrome Android); bila konten lebih tinggi dari area terlihat, halaman bisa digulir. iOS Safari mengabaikan `interactive-widget`, tetapi menggulir input yang fokus ke area terlihat.

## Halaman

| Path | Fungsi |
| --- | --- |
| `/admin/login` | Email dan kata sandi (ikon mata untuk menampilkan). Galat selalu "Email atau kata sandi salah." (akun tanpa role admin langsung dikeluarkan). |
| `/admin/lupa-password` | Minta tautan reset. Respons sama untuk email terdaftar atau tidak. |
| `/admin/atur-password` | Kata sandi baru (minimal 10 karakter). Hanya dari tautan reset. |
| `/admin` | Daftar pesanan: cari (kode, nama, nomor), rentang, status, 25 per halaman, dan tombol Tambah pesanan (pesanan manual: tunai atau transfer; Lunas atau Belum bayar). Default: tanggal ambil hari ini dan seterusnya, urut naik. |
| `/admin/produk` | Daftar produk (foto, kategori, harga, status). Tambah/ubah lewat dialog (termasuk unggah foto). Varian, satuan jual (mika/box/pack), dan isi per satuan (mis. 20 pcs) diisi terpisah, menu aksi (tiga titik) berlabel: Ubah produk, Sembunyikan dari situs / Tampilkan di situs, Hapus produk (dengan konfirmasi; pesanan lama aman karena menyimpan salinan nama, varian, satuan, dan harga). Semua produk aktif tampil di paket cepat beranda; situs ini single page dengan 2 produk (Lumpia Frozen dan Goreng). |
| `/admin/faq` | Daftar FAQ: tambah, ubah, hapus, naik/turun urutan, status aktif/nonaktif. Tampil di beranda dan JSON-LD `FAQPage`. |
| `/auth/confirm` | Route handler tautan email. Menukar `token_hash` jadi sesi, tujuan (`next`) hanya boleh di dalam `/admin`. |

Pesanan manual disimpan di tabel `orders` yang sama dengan `source = 'manual'` dan harga katalog. Tombol "Tandai lunas" dan "Batalkan" hanya muncul untuk pesanan **manual** yang masih belum bayar; pesanan online diselesaikan Midtrans.

## Membuat akun admin

```bash
bun run admin:create email@anda.com "Nama Lengkap"
```

Kata sandi ditanya di terminal (tidak tampil, minimal 10 karakter, diulang dua kali). Bila email sudah terdaftar, akun itu dijadikan admin (kata sandi hanya diganti jika diisi). Skrip memakai service role dari `.env` (`scripts/create-admin.ts`), membuat akun tanpa konfirmasi email, dan mengisi `app_metadata.role = "admin"`; profil terisi otomatis lewat trigger. Tanpa terminal interaktif, isi kata sandi lewat env `ADMIN_PASSWORD`. Jalankan hanya dari mesin tepercaya karena memakai kunci service role.

## Setup di dashboard Supabase (sekali, tidak bisa lewat kode)

1. Authentication, Sign In / Providers: **matikan "Allow new users to sign up"**.
2. Authentication, Users, **Add user**: email dan password, centang auto confirm.
3. Jadikan admin (SQL Editor):
   ```sql
   update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}' where email = '<email pemilik>';
   ```
4. Authentication, URL Configuration: Site URL = domain produksi. Redirect URLs: `http://localhost:3000/**` dan `https://<domain>/**`.
5. Authentication, Email Templates, **Reset password**: isi tautan dengan
   ```html
   <a href="{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=recovery&next=/admin/atur-password">Atur password baru</a>
   ```
   Kode mengirim `redirectTo = {NEXT_PUBLIC_SITE_URL}/auth/confirm`, jadi dev dan produksi memakai template yang sama.
6. **SMTP**: tanpa SMTP kustom Supabase hanya mengirim ke anggota tim organisasi dan maksimal 2 email per jam. Untuk pemilik tunggal yang emailnya anggota tim itu cukup; selain itu pasang SMTP (mis. Resend).
7. (Opsional) Authentication, Password: panjang minimal 10.

Tautan email bisa "terpakai" bila penyedia email memindai tautan; minta tautan baru.

## Menguji

Buat akun uji lewat Admin API (`POST /auth/v1/admin/users` dengan service role, `email_confirm: true`, `app_metadata: {"role":"admin"}`), hapus setelah selesai. Tautan reset tanpa email: `POST /auth/v1/admin/generate_link` dengan `type: "recovery"`, lalu buka `/auth/confirm?token_hash=<hashed_token>&type=recovery&next=/admin/atur-password`.

Saat menulis tes browser: tombol "Keluar" di dropdown profil juga `type=submit`; pilih tombol form dengan selektor yang spesifik (mis. `form:has(#produk) button[type=submit]`), atau sesi ikut keluar.

## Batasan

- Pesanan manual belum mengenal DP atau pembayaran sebagian, dan memakai harga katalog (tanpa harga khusus).
- Tidak ada batas laju login sendiri; mengandalkan batas bawaan Supabase Auth.
- Token pengguna yang dihapus tetap berlaku sampai kedaluwarsa (1 jam); `requireAdmin()` bertanya ke server Auth sehingga sesi yang dicabut langsung ditolak.
