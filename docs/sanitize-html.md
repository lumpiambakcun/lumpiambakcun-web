# sanitize-html

Membersihkan HTML artikel dari CKEditor sebelum disimpan. Paket `sanitize-html` + `@types/sanitize-html` (dev).

## Pemakaian di repo

- `src/lib/sanitize-article.ts`:
  - `sanitizeArticleHtml(html)`: allowlist tag `h2, h3, p, br, strong, b, em, i, ul, ol, li, blockquote, a`; atribut hanya `href` pada `a`; skema `http`, `https`, `mailto`, `tel`; tiap tautan diberi `rel="noopener noreferrer"`.
  - `htmlToText(html)`: membuang semua tag, dipakai untuk memeriksa panjang isi minimal.
- Dipanggil di `saveArticle` (`src/lib/admin-articles.ts`) dan seeder (`scripts/seed-articles.ts`). Jangan menyimpan atau merender `body` tanpa melewati fungsi ini.

## Hal yang perlu diketahui

- Tag yang tidak ada di allowlist dibuang (teksnya tetap). Tambah tag di allowlist bila toolbar CKEditor ditambah.
- Modul ini tidak memakai `server-only` supaya bisa dipanggil skrip bun; jangan mengimpornya dari komponen client.
