create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null default '',
  full_name text not null default '',
  phone text,
  avatar_url text,
  role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;
grant select, insert, update, delete on public.profiles to service_role;

create schema if not exists private;

create function private.sync_profile() returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.profiles (id, email, full_name, role)
    values (
      new.id,
      coalesce(new.email, ''),
      coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(coalesce(new.email, ''), '@', 1)),
      new.raw_app_meta_data ->> 'role'
    )
    on conflict (id) do nothing;
  else
    -- Nama, nomor HP, dan foto sengaja tidak ditimpa: itu diedit pengguna di halaman profil.
    update public.profiles
    set email = coalesce(new.email, ''), role = new.raw_app_meta_data ->> 'role', updated_at = now()
    where id = new.id;
  end if;
  return new;
end;
$$;

revoke execute on function private.sync_profile() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.sync_profile();

create trigger on_auth_user_updated
  after update of email, raw_app_meta_data on auth.users
  for each row
  when (old.email is distinct from new.email or old.raw_app_meta_data is distinct from new.raw_app_meta_data)
  execute function private.sync_profile();

insert into public.profiles (id, email, full_name, role)
select
  id,
  coalesce(email, ''),
  coalesce(nullif(raw_user_meta_data ->> 'full_name', ''), split_part(coalesce(email, ''), '@', 1)),
  raw_app_meta_data ->> 'role'
from auth.users
on conflict (id) do nothing;
