# react-day-picker

Dipasang lewat `bunx shadcn@latest add calendar` (bersama `date-fns`). Komponen: `src/components/ui/calendar.tsx` (milik repo, API v10).

## Pemakaian di repo

`src/components/shared/date-picker.tsx`: `Popover` + `Calendar mode="single"`. Menulis tanggal `yyyy-mm-dd` ke `<input type="hidden" name=...>` supaya ikut `FormData`; tampilan "Selasa, 24 November 2026" lewat `Intl.DateTimeFormat("id-ID")`. Locale kalender: `import { id } from "react-day-picker/locale"`.

## Hal yang perlu diketahui

- Tanggal dibuat dari `T12:00:00` lokal agar tidak bergeser sehari karena zona waktu; nilai dikirim sebagai string, bukan `Date`.
- Hari dari bulan sebelumnya/berikutnya (`showOutsideDays`) ikut tampil dan bisa diklik; di tes Playwright, pilih sel hari dengan cara yang tidak ambigu.
- Belum ada batas tanggal (`disabled`); tambahkan bila perlu menolak tanggal lampau.
