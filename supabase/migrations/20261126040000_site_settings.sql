create table public.site_settings (
  key text primary key check (key in ('header', 'footer')),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
revoke all on public.site_settings from anon, authenticated;
grant select, insert, update, delete on public.site_settings to service_role;

insert into public.site_settings (key, data) values
  ('header', $json${"brand":{"name":"Lumpia Mbak Cun","tagline":"Lumpia Khas Semarang Sejak 1998","logoUrl":"/images/brand/emblem.webp"},"topBar":[{"icon":"truck","text":"Pesan hari ini sebelum 14.00 – Dikirim hari yang sama di area Semarang","active":true},{"icon":"check","text":"Terjamin Halal oleh BPJPH No. ID3511000210992322","active":true}],"nav":[{"label":"Beranda","kind":"internal","value":"/"},{"label":"Paket Lumpia","kind":"internal","value":"/#menu"},{"label":"Keunggulan","kind":"internal","value":"/#keunggulan"},{"label":"Testimoni","kind":"internal","value":"/#testimoni"}],"cta":{"label":"Pesan via WhatsApp","message":"Halo Mbak Cun, saya mau pesan lumpia."},"extraCtas":[{"link":{"label":"Lihat Paket","kind":"internal","value":"/#menu"},"style":"outline","showInHeader":false}]}$json$::jsonb),
  ('footer', $json${"logoUrl":"/images/brand/logo-footer.webp","description":"Lumpia isi rebung, telur, dan udang dengan rasa gurih, renyah, dan autentik khas Semarang.","copyright":"© 2026 Lumpia Mbak Cun","columns":[{"title":"Halaman","links":[{"label":"Paket Lumpia","kind":"internal","value":"/#menu"},{"label":"Keunggulan","kind":"internal","value":"/#keunggulan"},{"label":"Testimoni","kind":"internal","value":"/#testimoni"},{"label":"FAQ","kind":"internal","value":"/#faq"},{"label":"Artikel","kind":"internal","value":"/artikel"}]},{"title":"Menu","links":[{"label":"Lumpia Mentah","kind":"internal","value":"/#menu"},{"label":"Lumpia Goreng","kind":"internal","value":"/#menu"},{"label":"Tahu Rebung","kind":"whatsapp","value":"Halo Mbak Cun, saya mau tanya ketersediaan dan harga Tahu Rebung."},{"label":"Tahu Bakso","kind":"whatsapp","value":"Halo Mbak Cun, saya mau tanya ketersediaan dan harga Tahu Bakso."},{"label":"Pisang Coklat","kind":"whatsapp","value":"Halo Mbak Cun, saya mau tanya ketersediaan dan harga Pisang Coklat."},{"label":"Pesanan Acara","kind":"whatsapp","value":"Halo Mbak Cun, saya mau pesan lumpia untuk acara."}]}],"social":[{"platform":"instagram","url":"https://www.instagram.com/lumpiambakcun"},{"platform":"tiktok","url":"https://www.tiktok.com/@lumpiambakcun"}],"halal":{"number":"ID3511000210992322"},"contact":{"phoneDisplay":"0857-1364-4140","phoneIntl":"6285713644140","mapsUrl":"https://maps.app.goo.gl/jigyJhSDkJSNxhyL6","address":{"street":"Jl. Meranti Barat I No. 322","district":"Srondol Wetan, Banyumanik","city":"Semarang","postalLine":"Jl. Meranti Bar. I No.322, Srondol Wetan, Kec. Banyumanik, Kota Semarang, Jawa Tengah 50264"},"hours":{"opens":"09.00","closes":"20.30"},"geo":{"lat":-7.0712887,"lng":110.4210899}}}$json$::jsonb);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('branding', 'branding', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
