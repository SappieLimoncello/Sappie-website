-- Voorraadtabel voor de siroop-webshop op de publieke site.
-- Uitvoeren in Supabase: SQL Editor > plak dit script > Run.
-- Eén vaste rij (id = 1) die Oscar bijwerkt via /intern/voorraad-siroop.

create table if not exists siroop_voorraad (
  id smallint primary key default 1,
  aantal integer not null default 0 check (aantal >= 0),
  updated_at timestamptz not null default now(),
  constraint siroop_voorraad_enkele_rij check (id = 1)
);

insert into siroop_voorraad (id, aantal)
values (1, 0)
on conflict (id) do nothing;

alter table siroop_voorraad enable row level security;

create policy "Iedereen mag de voorraad lezen"
  on siroop_voorraad for select
  using (true);

create policy "Ingelogde gebruikers mogen de voorraad aanpassen"
  on siroop_voorraad for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
