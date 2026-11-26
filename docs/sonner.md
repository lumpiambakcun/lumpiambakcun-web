# sonner

Toast, dipasang lewat `bunx shadcn@latest add sonner` (komponen `src/components/ui/sonner.tsx`).

## Pemakaian di repo

- `<Toaster position="bottom-right" />` ada di `src/app/admin/(panel)/layout.tsx`, jadi toast hanya tersedia di panel admin. Pasang di layout lain bila halaman lain butuh.
- Panggil dari komponen client: `import { toast } from "sonner"; toast.success("Pesanan disimpan.")`. Contoh: `order-row-actions.tsx`, `add-order-dialog.tsx`.

## Hal yang perlu diketahui

- Template shadcn memakai `next-themes` (`useTheme`). Repo ini belum punya toggle atau penyedia tema, jadi `next-themes` dibuang dan tema dikunci `light`. Bila dark mode ditambahkan, kembalikan pembacaan tema di `sonner.tsx`.
- Server action tidak bisa memanggil `toast`; kembalikan hasil ke komponen client (mis. `{ code }`) lalu tampilkan toast di sana.
