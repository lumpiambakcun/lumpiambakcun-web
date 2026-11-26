delete from public.products where id not in ('lumpia-frozen', 'lumpia-goreng');

alter table public.products drop column featured;
