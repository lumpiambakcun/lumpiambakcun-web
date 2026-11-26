alter table public.products
  add column unit text not null default 'pack',
  add column pcs int not null default 10 check (pcs between 1 and 1000),
  add column summary text not null default '';

update public.products set unit = 'mika', summary = 'Isi 10 pcs, frozen, tinggal goreng.' where variant = 'Frozen';
update public.products set unit = 'box', summary = 'Isi 10 pcs, sudah digoreng.' where variant = 'Goreng';

alter table public.orders add column unit text not null default 'pack';

update public.orders set unit = case variant when 'Frozen' then 'mika' when 'Goreng' then 'box' else 'pack' end;
