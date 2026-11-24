# Supabase

Dipakai untuk menyimpan pesanan (`orders`). Paket: `@supabase/supabase-js` dan `@supabase/ssr`.

## Env

| Variabel | Keterangan |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL proyek. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Kunci publik (dipakai helper `src/lib/supabase/{client,server,middleware}.ts`, belum dipakai fitur pesanan). |
| `SUPABASE_SERVICE_ROLE_KEY` | Kunci service role. **Hanya server**, jangan beri awalan `NEXT_PUBLIC_`. Dipakai `src/lib/supabase/admin.ts`. |

## Tabel `orders`

Migrasi: `supabase/migrations/20261124000000_orders.sql`. Satu baris per pesanan (satu produk): kode (`LMC-` + 10 karakter, juga `order_id` Midtrans), produk, harga satuan, jumlah, total, data pemesan, waktu ambil (`pickup_at`), metode, `status` (`pending|paid|failed|expired|cancelled`), `payment_type`, `snap_token`, `paid_at`.

RLS aktif tanpa policy dan hak `anon`/`authenticated` dicabut, jadi browser tidak bisa membaca atau menulis. Semua akses lewat server dengan service role (`src/lib/orders.ts`, server action, webhook). Halaman `/pesanan/{kode}` hanya menampilkan nama depan dan nomor tersamar; kode acak adalah satu-satunya kunci akses.

## Menerapkan migrasi

Proyek sudah ter-link (`supabase/.temp`). Perintah:

```bash
bunx supabase db push --dry-run   # lihat yang akan diterapkan
bunx supabase db push
```

Perubahan skema berikutnya: tambah file migrasi baru, jangan edit yang sudah diterapkan.
