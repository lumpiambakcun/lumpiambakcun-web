alter table public.orders
  add column source text not null default 'online' check (source in ('online', 'manual'));

alter table public.orders drop constraint orders_payment_method_check;
alter table public.orders
  add constraint orders_payment_method_check
  check (payment_method in ('qris', 'bank', 'ewallet', 'cash', 'transfer'));
