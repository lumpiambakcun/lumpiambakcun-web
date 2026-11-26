# CKEditor 5

Editor isi artikel di `/admin/artikel`. Paket: `ckeditor5` (build npm, modul-modul digabung) dan `@ckeditor/ckeditor5-react`.

## Pemakaian di repo

- Komponen: `src/components/admin/article-editor.tsx` (client). Memakai `ClassicEditor` dengan plugin `Essentials, Paragraph, Heading, Bold, Italic, Link, List, BlockQuote, Undo, Autoformat`. Hasil HTML disalin ke `<input type="hidden" name="body">` sehingga ikut terkirim bersama form (`FormData`).
- Toolbar sengaja kecil: undo/redo, heading (paragraf, H2, H3), tebal, miring, tautan, daftar bullet/angka, kutipan. Tidak ada upload gambar di dalam isi (foto sampul dipisah lewat `PhotoField`).
- Bahasa Indonesia: `import translations from "ckeditor5/translations/id.js"`.
- CSS: `import "ckeditor5/ckeditor5.css"` di file komponen. Gaya tambahan editor (`.article-editor`) dan tampilan artikel di situs (`.article-body`) ada di `src/app/globals.css`.
- Hanya dimuat di halaman admin artikel (bundelnya besar), tidak ada di halaman publik.

## Lisensi

`licenseKey` diambil dari `NEXT_PUBLIC_CKEDITOR_LICENSE_KEY`; bila kosong memakai `'GPL'`. Lisensi GPL mewajibkan kode yang memakainya ikut GPL dan menampilkan logo "Powered by CKEditor". Untuk produk komersial/tertutup, daftar paket komersial atau Free plan di akun CKEditor dan isi kuncinya di env. Keputusan lisensi ada di pemilik proyek.

## Keamanan

HTML dari editor **tidak dipercaya**. `saveArticle` menyanitasi lewat `src/lib/sanitize-article.ts` (lihat `docs/sanitize-html.md`) sebelum disimpan, karena situs merendernya dengan `dangerouslySetInnerHTML`. Bila toolbar ditambah (mis. tabel, gambar), tambahkan tag/atribut yang sesuai di allowlist sanitasi, kalau tidak hasilnya dibuang saat disimpan.
