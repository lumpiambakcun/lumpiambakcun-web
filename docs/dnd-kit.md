# dnd-kit

Dipakai untuk mengurutkan baris lewat seret dan lewat papan ketik. Paket: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` (dipasang dengan `bun add`).

## Komponen di repo ini

- `src/components/admin/sortable-rows.tsx`: `SortableRows` (konteks DnD + daftar `<ul>`) dan `SortableRow` (satu `<li>` dengan pegangan seret). Pemanggil hanya memberi `ids`, `labelOf`, dan `onMove(from, to)`.
- `src/components/admin/editable-list.tsx`: daftar baris ringkas (seret, saklar, menu tiga titik, edit di tempat) untuk halaman Header dan Footer. Baris yang dibuka hanya satu.
- `src/app/admin/(panel)/faq` memakai `SortableRows` langsung; urutan disimpan lewat `reorderFaqAction(ids)` yang menulis ulang kolom `sort`.

## Keputusan

- Sensor: pointer (jarak aktivasi 4 px supaya klik biasa tidak jadi seret) dan keyboard (spasi angkat, panah pindah, spasi letakkan, Escape batal).
- Pengumuman pembaca layar dan petunjuk memakai bahasa Indonesia (`accessibility` di `DndContext`).
- `DndContext` diberi `id` dari `useId()` supaya atribut `aria-describedby` sama di server dan klien (tanpa galat hidrasi).
- Pegangan memakai `touch-none` agar seret di layar sentuh tidak menggulir halaman.

## Halaman bertab (`settings-form.tsx`)

`SettingsForm` satu `<form>` untuk semua tab: tab aktif disimpan di `?tab=`, penanda titik merah untuk tab yang berubah, ikon peringatan untuk tab yang galat (otomatis pindah ke tab galat pertama), bilah simpan lengket hanya saat ada perubahan (Buang, Simpan), peringatan `beforeunload`, dan Ctrl/Cmd+S. Payload JSON dan server action tetap sama.
