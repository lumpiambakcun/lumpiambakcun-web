create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  category text not null,
  variant text not null,
  name text not null,
  description text not null default '',
  ingredients text not null default '',
  chili boolean not null default false,
  price int not null check (price > 0),
  image_url text not null,
  featured boolean not null default false,
  active boolean not null default true,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.faqs enable row level security;
alter table public.products enable row level security;
revoke all on public.faqs, public.products from anon, authenticated;
grant select, insert, update, delete on public.faqs, public.products to service_role;

insert into public.faqs (question, answer, sort) values
  ('Apa itu lumpia Semarang?', 'Lumpia khas Semarang berisi rebung, telur, dan udang dengan cita rasa gurih dan renyah.', 1),
  ('Bisa pesan untuk acara atau dalam jumlah banyak?', 'Bisa. Kirim jumlah dan tanggal acaranya lewat WhatsApp, lalu kami bantu hitung kebutuhannya.', 2),
  ('Bisa diambil di tempat atau diantar?', 'Bisa ambil di tempat. Untuk pengantaran, tanyakan langsung lewat WhatsApp.', 3),
  ('Berapa lama lumpia bisa disimpan?', 'Lumpia fresh paling enak dikonsumsi di hari yang sama. Untuk frozen, simpan di freezer dan goreng langsung dari beku kapan saja dibutuhkan.', 4);

insert into public.products (id, category, variant, name, description, ingredients, chili, price, image_url, featured, sort) values
  ('lumpia-frozen', 'Lumpia', 'Frozen', 'Lumpia', 'Lumpia mini khas Semarang berisi rebung, telur, dan udang. Kulitnya tipis, kriuk saat digoreng, dan gurih tanpa pengawet maupun MSG.', 'rebung segar 100%, udang, telur, dan bumbu khas Lumpia Mbak Cun', true, 25000, '/images/menu/lumpia-frozen.webp', true, 1),
  ('lumpia-goreng', 'Lumpia', 'Goreng', 'Lumpia', 'Lumpia mini khas Semarang berisi rebung, telur, dan udang. Kulitnya tipis, kriuk saat digoreng, dan gurih tanpa pengawet maupun MSG.', 'rebung segar 100%, udang, telur, dan bumbu khas Lumpia Mbak Cun', true, 30000, '/images/menu/lumpia-goreng.webp', true, 2),
  ('tahu-rebung-frozen', 'Tahu Rebung', 'Frozen', 'Tahu Rebung', 'Tahu isi rebung buatan rumahan Mbak Cun, renyah saat digoreng.', 'rebung segar 100%, udang, telur, dan bumbu khas Lumpia Mbak Cun', true, 27000, '/images/menu/tahu-rebung-frozen.webp', false, 3),
  ('tahu-rebung-goreng', 'Tahu Rebung', 'Goreng', 'Tahu Rebung', 'Tahu isi rebung buatan rumahan Mbak Cun, renyah saat digoreng.', 'rebung segar 100%, udang, telur, dan bumbu khas Lumpia Mbak Cun', true, 35000, '/images/menu/tahu-rebung-goreng.webp', false, 4),
  ('tahu-bakso-frozen', 'Tahu Bakso', 'Frozen', 'Tahu Bakso', 'Tahu bakso buatan rumahan Mbak Cun, berisi daging sapi.', 'daging sapi 100%', true, 22000, '/images/menu/tahu-bakso-frozen.webp', false, 5),
  ('tahu-bakso-goreng', 'Tahu Bakso', 'Goreng', 'Tahu Bakso', 'Tahu bakso buatan rumahan Mbak Cun, berisi daging sapi.', 'daging sapi 100%', true, 26000, '/images/menu/tahu-bakso-goreng.webp', false, 6),
  ('pisang-coklat-frozen', 'Pisang Coklat', 'Frozen', 'Pisang Coklat', 'Pisang coklat buatan rumahan Mbak Cun, manis dan renyah.', 'pisang raja, gula murni 100%, dan meses', false, 20000, '/images/menu/pisang-coklat-frozen.webp', false, 7),
  ('pisang-coklat-goreng', 'Pisang Coklat', 'Goreng', 'Pisang Coklat', 'Pisang coklat buatan rumahan Mbak Cun, manis dan renyah.', 'pisang raja, gula murni 100%, dan meses', false, 25000, '/images/menu/pisang-coklat-goreng.webp', false, 8);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('products', 'products', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
