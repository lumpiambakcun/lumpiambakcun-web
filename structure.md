lumpiambakcun-web/
├── .claude/
│   └── settings.local.json
├── docs/
│   ├── admin.md
│   ├── embla-carousel.md
│   ├── figcraft.md
│   ├── media.md
│   ├── midtrans.md
│   ├── react-day-picker.md
│   ├── seo.md
│   ├── shadcn-ui.md
│   ├── sonner.md
│   ├── supabase.md
│   └── zod.md
├── public/
│   ├── icons/
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── mstile-150x150.png
│   ├── images/
│   │   ├── 404/
│   │   │   └── piring-lumpia.webp
│   │   ├── brand/
│   │   │   ├── emblem.webp
│   │   │   └── halal.webp
│   │   ├── doodles/
│   │   │   ├── doodle-01.webp
│   │   │   ├── doodle-02.webp
│   │   │   ├── doodle-03.webp
│   │   │   ├── doodle-04.webp
│   │   │   ├── doodle-05.webp
│   │   │   ├── doodle-06.webp
│   │   │   ├── doodle-07.webp
│   │   │   ├── doodle-08.webp
│   │   │   ├── doodle-09.webp
│   │   │   ├── doodle-10.webp
│   │   │   ├── doodle-11.webp
│   │   │   ├── doodle-lumpia-oval.webp
│   │   │   └── doodle-piscok.webp
│   │   ├── hero/
│   │   │   └── piring-lumpia.webp
│   │   ├── icons/
│   │   │   ├── gofood.webp
│   │   │   ├── grabfood.webp
│   │   │   └── shopeefood.webp
│   │   ├── katalog/
│   │   │   ├── goreng.webp
│   │   │   └── mentah.webp
│   │   ├── menu/
│   │   │   ├── detail/
│   │   │   │   ├── lumpia-1.webp
│   │   │   │   ├── lumpia-2.webp
│   │   │   │   ├── lumpia-3.webp
│   │   │   │   ├── pisang-coklat-1.webp
│   │   │   │   ├── pisang-coklat-2.webp
│   │   │   │   ├── pisang-coklat-3.webp
│   │   │   │   ├── tahu-bakso-1.webp
│   │   │   │   ├── tahu-bakso-2.webp
│   │   │   │   ├── tahu-bakso-3.webp
│   │   │   │   ├── tahu-rebung-1.webp
│   │   │   │   ├── tahu-rebung-2.webp
│   │   │   │   └── tahu-rebung-3.webp
│   │   │   ├── lumpia-frozen.webp
│   │   │   ├── lumpia-goreng.webp
│   │   │   ├── pisang-coklat-frozen.webp
│   │   │   ├── pisang-coklat-goreng.webp
│   │   │   ├── tahu-bakso-frozen.webp
│   │   │   ├── tahu-bakso-goreng.webp
│   │   │   ├── tahu-rebung-frozen.webp
│   │   │   └── tahu-rebung-goreng.webp
│   │   ├── peta/
│   │   │   └── peta-google.webp
│   │   └── reviewers/
│   │       ├── chrisna-n.webp
│   │       ├── ekka-n.webp
│   │       └── inggit-n.webp
│   └── browserconfig.xml
├── scripts/
│   └── create-admin.ts
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── cara-pesan/
│   │   │   │   └── page.tsx
│   │   │   ├── checkout/
│   │   │   │   ├── actions.ts
│   │   │   │   └── page.tsx
│   │   │   ├── lokasi/
│   │   │   │   └── page.tsx
│   │   │   ├── menu/
│   │   │   │   ├── [slug]/
│   │   │   │   │   ├── opengraph-image.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── pesanan/
│   │   │   │   └── [kode]/
│   │   │   │       ├── nota/
│   │   │   │       │   └── route.ts
│   │   │   │       └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   ├── (auth)/
│   │   │   │   ├── atur-password/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── lupa-password/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── actions.ts
│   │   │   │   └── layout.tsx
│   │   │   ├── (panel)/
│   │   │   │   ├── actions.ts
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   └── midtrans/
│   │   │       └── notification/
│   │   │           └── route.ts
│   │   ├── auth/
│   │   │   └── confirm/
│   │   │       └── route.ts
│   │   ├── apple-icon.png
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── icon.png
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   ├── not-found.tsx
│   │   ├── opengraph-image.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── assets/
│   │   └── og/
│   │       ├── emblem.png
│   │       ├── menu-lumpia.jpg
│   │       ├── menu-pisang-coklat.jpg
│   │       ├── menu-tahu-bakso.jpg
│   │       ├── menu-tahu-rebung.jpg
│   │       └── plate.png
│   ├── components/
│   │   ├── admin/
│   │   │   ├── add-order-button.tsx
│   │   │   ├── add-order-dialog.tsx
│   │   │   ├── admin-header.tsx
│   │   │   ├── admin-sidebar-nav.tsx
│   │   │   ├── admin-sidebar.tsx
│   │   │   ├── auth-form.tsx
│   │   │   ├── auth-shell.tsx
│   │   │   ├── manual-order-form.tsx
│   │   │   ├── order-row-actions.tsx
│   │   │   ├── order-status-badge.tsx
│   │   │   ├── orders-content.tsx
│   │   │   ├── orders-live-filters.tsx
│   │   │   ├── orders-pagination.tsx
│   │   │   ├── orders-skeleton.tsx
│   │   │   ├── orders-table.tsx
│   │   │   ├── page-header.tsx
│   │   │   ├── profile-menu-view.tsx
│   │   │   ├── profile-menu.tsx
│   │   │   └── reset-link-notice.tsx
│   │   ├── icons/
│   │   │   └── brand-icons.tsx
│   │   ├── layout/
│   │   │   ├── brand-logo.tsx
│   │   │   ├── header-row.tsx
│   │   │   ├── menu-toggle.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   ├── nav-links.tsx
│   │   │   ├── site-footer.tsx
│   │   │   ├── site-header.tsx
│   │   │   ├── site-shell.tsx
│   │   │   └── top-bar.tsx
│   │   ├── sections/
│   │   │   ├── checkout-card.tsx
│   │   │   ├── checkout-content.tsx
│   │   │   ├── checkout-form.tsx
│   │   │   ├── delivery-options.tsx
│   │   │   ├── faq.tsx
│   │   │   ├── feature-card.tsx
│   │   │   ├── features.tsx
│   │   │   ├── hero-headline.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── location-info-card.tsx
│   │   │   ├── location.tsx
│   │   │   ├── menu-browser.tsx
│   │   │   ├── menu-section.tsx
│   │   │   ├── not-found-hero.tsx
│   │   │   ├── order-apps.tsx
│   │   │   ├── order-card.tsx
│   │   │   ├── order-methods.tsx
│   │   │   ├── order-section.tsx
│   │   │   ├── order-status-card.tsx
│   │   │   ├── order-status-content.tsx
│   │   │   ├── order-steps.tsx
│   │   │   ├── order-summary.tsx
│   │   │   ├── payment-method-options.tsx
│   │   │   ├── price-card.tsx
│   │   │   ├── price-catalog.tsx
│   │   │   ├── price-sticker.tsx
│   │   │   ├── product-actions.tsx
│   │   │   ├── product-card.tsx
│   │   │   ├── product-detail.tsx
│   │   │   ├── product-gallery.tsx
│   │   │   ├── product-grid.tsx
│   │   │   ├── related-products.tsx
│   │   │   ├── resume-payment.tsx
│   │   │   ├── step-card.tsx
│   │   │   ├── testimonial-card.tsx
│   │   │   ├── testimonials-carousel.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── use-drag-scroll.ts
│   │   │   └── whatsapp-card.tsx
│   │   ├── seo/
│   │   │   └── json-ld.tsx
│   │   ├── shared/
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── channel-card.tsx
│   │   │   ├── channel-logos.tsx
│   │   │   ├── container.tsx
│   │   │   ├── cta-band.tsx
│   │   │   ├── date-picker.tsx
│   │   │   ├── doodle.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── form-field.tsx
│   │   │   ├── icon-badge.tsx
│   │   │   ├── info-row.tsx
│   │   │   ├── map-link.tsx
│   │   │   ├── page-shell.tsx
│   │   │   ├── password-input.tsx
│   │   │   ├── rating-stars.tsx
│   │   │   ├── scroll-reveal.tsx
│   │   │   ├── section-heading.tsx
│   │   │   ├── section.tsx
│   │   │   ├── select-field.tsx
│   │   │   ├── snap-script.tsx
│   │   │   ├── stable-height.tsx
│   │   │   ├── submit-button.tsx
│   │   │   ├── time-select.tsx
│   │   │   ├── titled-section.tsx
│   │   │   └── whatsapp-button.tsx
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── sonner.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   ├── config/
│   │   ├── admin.ts
│   │   └── site.ts
│   ├── content/
│   │   ├── beranda.ts
│   │   ├── cara-pesan.ts
│   │   ├── checkout.ts
│   │   ├── doodles.ts
│   │   ├── lokasi.ts
│   │   ├── menu.ts
│   │   └── not-found.ts
│   ├── fonts/
│   │   ├── AtypKido-Bold.otf
│   │   ├── AtypKido-Medium.otf
│   │   └── AtypKido-Semibold.otf
│   ├── hooks/
│   │   └── use-mobile.ts
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── admin.ts
│   │   │   ├── client.ts
│   │   │   ├── middleware.ts
│   │   │   └── server.ts
│   │   ├── admin-auth.ts
│   │   ├── admin-orders.ts
│   │   ├── checkout.ts
│   │   ├── currency.ts
│   │   ├── form-data.ts
│   │   ├── format.ts
│   │   ├── midtrans.ts
│   │   ├── og.tsx
│   │   ├── order-nota.tsx
│   │   ├── orders.ts
│   │   ├── profiles.ts
│   │   ├── reveal.ts
│   │   ├── seo.ts
│   │   ├── snap.ts
│   │   ├── structured-data.ts
│   │   ├── utils.ts
│   │   └── whatsapp.ts
│   └── proxy.ts
├── supabase/
│   └── migrations/
│       ├── 20261120031054_init.sql
│       ├── 20261124000000_orders.sql
│       ├── 20261124010000_orders_grants.sql
│       ├── 20261125000000_orders_manual.sql
│       └── 20261125010000_profiles.sql
├── .env.example
├── .gitignore
├── .mcp.json
├── AGENTS.md
├── bun.lock
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── README.md
├── rules.md
└── tsconfig.json
