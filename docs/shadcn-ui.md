# shadcn/ui

Terpasang pada 2026-10-29 lewat `bunx shadcn@latest init -t next -b radix -d -y`.

## Konfigurasi

Sumber kebenaran ada di `components.json`.

| Item | Nilai |
| --- | --- |
| Style | `radix-nova` |
| Base library | Radix (paket `radix-ui`) |
| Base color | `neutral` |
| CSS variables | ya, di `src/app/globals.css` |
| Icon | `lucide-react` |
| RSC | ya |
| Tailwind config | kosong (Tailwind v4, token lewat CSS) |

Alias:

| Alias | Lokasi |
| --- | --- |
| `@/components` | `src/components/` |
| `@/components/ui` | `src/components/ui/` (komponen shadcn) |
| `@/lib/utils` | `src/lib/utils.ts` (`cn`) |
| `@/hooks` | `src/hooks/` |

## Menambah komponen

```bash
bunx shadcn@latest add card
bunx shadcn@latest add dialog input label
```

File masuk ke `src/components/ui/` dan **menjadi milik repo ini**: boleh diedit. Jangan menimpa komponen yang sudah dimodifikasi tanpa `git diff` dulu (`add` akan menanyakan sebelum menimpa; jangan pakai `--overwrite` sembarangan).

Jika sebuah komponen shadcn dimodifikasi dari aslinya, catat perubahannya di bagian "Keputusan dan hal yang perlu diketahui" di bawah.

## Mengubah tema

Seluruh warna dan radius ada di `src/app/globals.css`:

- `:root` untuk mode terang, `.dark` untuk mode gelap (format `oklch`).
- `--radius` mengatur skala radius seluruh komponen.
- `--primary` adalah warna brand utama. Saat ini masih netral bawaan shadcn dan **belum** warna brand Jasalocal.

Komponen hanya memakai utility token (`bg-primary`, `text-muted-foreground`, `border-border`). Jangan menulis hex atau palet Tailwind mentah (`zinc-500`) di komponen.

## Keputusan dan hal yang perlu diketahui

- **Radix, bukan Base UI.** CLI menawarkan `radix`, `base`, `aria`. Dipilih Radix karena paling umum dan dokumentasinya paling banyak. Mengganti base di kemudian hari berarti meng-install ulang semua komponen.
- **`cn` dari paket `cn`**, bukan `clsx` + `tailwind-merge`. Ini bawaan CLI saat ini (`src/lib/utils.ts` hanya `export { cn } from "cn"`). Paket tersebut dari org `shadcn-ui` di GitHub. Impor tetap lewat `@/lib/utils`, jadi bisa diganti tanpa menyentuh komponen.
- **Dark mode berbasis class `.dark`.** Boilerplate Next sebelumnya memakai `prefers-color-scheme`; itu dihapus oleh CLI. Saat ini tidak ada toggle dan class `.dark` tidak dipasang di mana pun, jadi tampilan selalu terang. Untuk mengaktifkan, pasang provider tema (mis. `next-themes`) atau pasang class `dark` sendiri. Belum diputuskan.
- **Perbaikan font di `globals.css`.** CLI menulis `--font-sans: var(--font-sans)` (merujuk dirinya sendiri, font tidak akan termuat). Sudah diganti menjadi `var(--font-geist-sans)`, sama dengan variabel yang didefinisikan di `src/app/layout.tsx`. Jika menjalankan `shadcn init` ulang atau `--reinstall`, periksa baris ini lagi.
- **Dependency yang ikut terpasang**: `radix-ui`, `class-variance-authority`, `cn`, `lucide-react`, `tw-animate-css`, dan `shadcn` (dipakai untuk `@import "shadcn/tailwind.css"`).
- **Verifikasi**: `tsc --noEmit`, `eslint`, dan `next build` lolos setelah setup. Tampilan di browser belum dicek.
- **Modifikasi (beranda Lumpia Mbak Cun).** `button.tsx`: variant baru `brand`, `accent`, `outline-brand`, `outline-ink` (teks kapital, tracking 0,04em) dan size `cta` (tinggi 46). `sheet.tsx`: overlay `bg-ink/40` dan `motion-reduce:animate-none`. `carousel.tsx`: lihat `docs/embla-carousel.md`. Komponen tambahan: accordion, badge, card, carousel, sheet, toggle, toggle-group. Token tema sudah diganti ke palet brand di `globals.css` (`--primary` merah, `--secondary` kuning, `--muted` krem).
- **`tabs.tsx`** (ditambah untuk halaman Cara Pesan): variant list `chips` (chip terpisah seperti chip kategori menu: aktif berisi kuning, hover berisi ink). Kelas fokus bawaan dibuang supaya cincin fokus global di `globals.css` yang berlaku. Pakai `forceMount` + sel grid bersama bila tinggi antar panel harus sama.
