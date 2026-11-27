# Resend (email auth)

Email reset password dan konfirmasi ganti email dikirim dari aplikasi lewat Resend, bukan email bawaan Supabase (yang dibatasi 2 email per jam). Memakai paket `resend` (`bun add resend`); `src/lib/email/resend.ts` membungkusnya jadi satu fungsi `sendEmail`.

## Alur

1. `supabase.auth.admin.generateLink` (service role) membuat token **tanpa mengirim email**.
2. `src/lib/email/auth-emails.ts` (`sendAuthLink`) membentuk tautan `{NEXT_PUBLIC_SITE_URL}/auth/confirm?token_hash=...&type=recovery|email_change&next=...`.
3. `src/lib/email/layout.ts` (`renderEmail`) membuat HTML berbasis tabel dengan style inline. Warna dari `brandColors` di `src/config/site.ts`; tanpa gambar karena webp tidak aman di Outlook.
4. `sendEmail` mengirimnya. Route `src/app/auth/confirm/route.ts` menukar `token_hash` jadi sesi.

| Alur | Pemanggil | Tujuan setelah klik |
| --- | --- | --- |
| Lupa kata sandi | `requestReset` di `src/app/admin/(auth)/actions.ts` | `/admin/atur-password` |
| Ganti email dan kirim ulang | `updateEmail`, `resendEmailChange` di `src/app/admin/(panel)/akun/actions.ts` | `/admin/akun` |

Untuk lupa kata sandi, email tidak terdaftar dijawab sama seperti yang terdaftar (tidak ada email terkirim, tidak ada pesan beda).

## Setup (sekali)

1. Resend: buat API key dan verifikasi domain pengirim (SPF dan DKIM). Tanpa domain terverifikasi, Resend hanya mengirim dari `onboarding@resend.dev` ke email pemilik akun Resend.
2. Isi `RESEND_API_KEY` dan `RESEND_FROM` (contoh `Lumpia Mbak Cun <no-reply@domainanda>`) di `.env` dan environment produksi.
3. Supabase, Authentication, Sign In / Providers, Email: **matikan "Secure email change"**. Bila menyala, email baru baru berlaku setelah konfirmasi dari email lama dan baru, sedangkan aplikasi hanya mengirim satu tautan ke email baru.
4. Email Templates dan SMTP Supabase tidak dipakai oleh alur ini.

## Catatan

- Batas Resend gratis: 100 email per hari, 3.000 per bulan.
- Tautan berlaku 1 jam (pengaturan Supabase) dan sekali pakai; pemindai email bisa memakainya lebih dulu, minta tautan baru.
- Perubahan email yang menunggu konfirmasi tersimpan di `new_email` milik user Supabase; "Kirim ulang" di halaman Akun membuat token baru dan mengirimnya lagi.
