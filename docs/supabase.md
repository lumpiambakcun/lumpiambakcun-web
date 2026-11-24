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

## Menerapkan migrasi

Proyek sudah ter-link (`supabase/.temp`). Perintah:

```bash
bunx supabase db push --dry-run   # lihat yang akan diterapkan
bunx supabase db push
```

Perubahan skema berikutnya: tambah file migrasi baru, jangan edit yang sudah diterapkan.
