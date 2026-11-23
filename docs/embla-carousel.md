# Embla Carousel

Terpasang lewat `bunx shadcn@latest add carousel` (paket `embla-carousel-react`). Komponen: `src/components/ui/carousel.tsx`.

## Pemakaian di repo ini

- Hanya dipakai di `src/components/sections/testimonials-carousel.tsx` (ulasan beranda): 1 kartu per layar (mobile), 2 (tablet), 3 (desktop) lewat `basis-*` pada `CarouselItem`.
- Kontrol (panah dan titik) dibuat sendiri, bukan `CarouselPrevious/Next`. Statusnya dibaca dari embla lewat `useSyncExternalStore` (string `jumlah|terpilih|bisaMundur|bisaMaju`), karena aturan lint `react-hooks/set-state-in-effect` melarang `setState` sinkron di effect.
- Kontrol disembunyikan bila jumlah snap `<= 1`. `slidesToScroll: "auto"` membuat satu snap = satu halaman (6 ulasan = 2 titik di desktop, 3 di tablet, 6 di mobile).
- `opts={{ align: "start", containScroll: "trimSnaps" }}`; kursor `grab/grabbing` dipasang pada pembungkus.

## Modifikasi pada file shadcn

`carousel.tsx`: satu baris `eslint-disable-next-line react-hooks/set-state-in-effect` sebelum `onSelect(api)` di effect sinkronisasi awal (kode bawaan shadcn melanggar aturan lint ini). Periksa lagi bila komponen di-`add` ulang.
