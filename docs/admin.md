# Admin

Halaman pemilik di `/admin`: login, daftar pesanan, dan pesanan manual. Tidak diindeks (`robots.txt` melarang `/admin` dan `/auth`, meta `noindex`).

## Cara kerja

- **Admin** = akun Supabase Auth dengan `app_metadata.role = "admin"`. `app_metadata` hanya bisa diubah dari server atau dashboard, tidak oleh pengguna.
- **Lapis 1** `src/proxy.ts` (matcher `/admin/:path*`): menyegarkan sesi dan mengalihkan yang belum punya sesi ke `/admin/login`. Hanya `/admin/login` dan `/admin/lupa-password` yang publik.
- **Lapis 2 (otorisasi sebenarnya)** `requireAdmin()` di `src/lib/admin-auth.ts`: bertanya ke server Auth lalu mengecek role. Dipanggil di setiap halaman admin dan setiap server action. Proxy saja tidak cukup.
- Data dibaca dan ditulis lewat service role (`src/lib/supabase/admin.ts`); tabel `orders` tetap tanpa policy untuk `anon` dan `authenticated`.
- Halaman yang memakai `requireAdmin()` memanggil `await connection()` dulu. Tanpa itu `next dev` mencatat galat `Date.now()` saat prerender.

## Halaman

| Path | Fungsi |
| --- | --- |
| `/admin/login` | Email dan password. Galat selalu "Email atau password salah." (akun tanpa role admin langsung dikeluarkan). |
| `/admin/lupa-password` | Minta tautan reset. Respons sama untuk email terdaftar atau tidak. |
| `/admin/atur-password` | Password baru (minimal 10 karakter). Hanya dari tautan reset. |
| `/admin` | Daftar pesanan: cari (kode, nama, nomor), rentang, status, 25 per halaman. Default: tanggal ambil hari ini dan seterusnya, urut naik. |
| `/admin/pesanan/baru` | Pesanan manual (tunai atau transfer; Lunas atau Belum bayar). |
| `/auth/confirm` | Route handler tautan email. Menukar `token_hash` jadi sesi, tujuan (`next`) hanya boleh di dalam `/admin`. |

Pesanan manual disimpan di tabel `orders` yang sama dengan `source = 'manual'` dan harga katalog. Tombol "Tandai lunas" dan "Batalkan" hanya muncul untuk pesanan **manual** yang masih belum bayar; pesanan online diselesaikan Midtrans.

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

Saat menulis tes browser: tombol "Keluar" di navigasi juga `type=submit`; pilih tombol form dengan selektor yang spesifik (mis. `form:has(#produk) button[type=submit]`), atau sesi ikut keluar.

## Batasan

- Pesanan manual belum mengenal DP atau pembayaran sebagian, dan memakai harga katalog (tanpa harga khusus).
- Tidak ada batas laju login sendiri; mengandalkan batas bawaan Supabase Auth.
- Token pengguna yang dihapus tetap berlaku sampai kedaluwarsa (1 jam); `requireAdmin()` bertanya ke server Auth sehingga sesi yang dicabut langsung ditolak.
