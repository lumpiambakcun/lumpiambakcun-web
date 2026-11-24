create table public.orders (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  product_id text not null,
  product_name text not null,
  variant text not null,
  unit_price integer not null check (unit_price > 0),
  quantity integer not null check (quantity between 1 and 99),
  total integer not null check (total > 0),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  pickup_at timestamptz not null,
  notes text,
  payment_method text not null check (payment_method in ('qris', 'bank', 'ewallet')),
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'expired', 'cancelled')),
  payment_type text,
  snap_token text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;
revoke all on public.orders from anon, authenticated;
