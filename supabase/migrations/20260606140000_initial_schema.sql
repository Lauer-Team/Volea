-- VOLEA initial schema

create table if not exists public.courts (
  id serial primary key,
  name text not null,
  type text not null check (type in ('panorama', 'indoor', 'outdoor')),
  indoor boolean not null default false,
  mode text not null check (mode in ('Doppel', 'Einzel')),
  price numeric(8,2) not null
);

create table if not exists public.equipment (
  id text primary key,
  cat text not null check (cat in ('racket', 'ball', 'shoe', 'extra')),
  name text not null,
  tag text not null,
  price numeric(8,2) not null,
  per_day boolean not null default false,
  stock integer not null default 0,
  blurb text not null
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  initials text not null,
  member_tier text not null default 'Mitglied',
  since_year integer,
  credit numeric(8,2) not null default 0,
  level text,
  role text not null default 'player' check (role in ('player', 'admin'))
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  court_id integer not null references public.courts(id) on delete cascade,
  booking_date date not null,
  slot_index integer not null check (slot_index >= 0 and slot_index < 24),
  time_label text not null,
  players integer not null default 2,
  gear text[] not null default '{}',
  price numeric(8,2) not null,
  status text not null default 'bestätigt',
  created_at timestamptz not null default now()
);

create table if not exists public.slot_occupancy (
  court_id integer not null references public.courts(id) on delete cascade,
  booking_date date not null,
  slot_index integer not null check (slot_index >= 0 and slot_index < 24),
  state text not null check (state in ('free', 'booked', 'mine')),
  booked_by text,
  booking_id uuid references public.bookings(id) on delete set null,
  primary key (court_id, booking_date, slot_index)
);

alter table public.courts enable row level security;
alter table public.equipment enable row level security;
alter table public.profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.slot_occupancy enable row level security;

-- Public read for courts, equipment, occupancy (link-only app, no SEO)
create policy "courts_read" on public.courts for select using (true);
create policy "equipment_read" on public.equipment for select using (true);
create policy "occupancy_read" on public.slot_occupancy for select using (true);

create policy "profiles_read_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

create policy "bookings_read_own" on public.bookings for select using (auth.uid() = user_id);
create policy "bookings_insert_own" on public.bookings for insert with check (auth.uid() = user_id);

-- Seed courts
insert into public.courts (id, name, type, indoor, mode, price) values
  (1, 'Center', 'panorama', false, 'Doppel', 32),
  (2, 'Glashaus', 'panorama', true, 'Doppel', 32),
  (3, 'Allee', 'outdoor', false, 'Doppel', 26),
  (4, 'Lindenhof', 'outdoor', false, 'Doppel', 26),
  (5, 'Pavillon', 'indoor', true, 'Doppel', 30),
  (6, 'Orangerie', 'indoor', true, 'Doppel', 30),
  (7, 'Terrasse', 'outdoor', false, 'Doppel', 26),
  (8, 'Remise', 'indoor', true, 'Doppel', 30),
  (9, 'Solo Nord', 'indoor', true, 'Einzel', 22),
  (10, 'Solo Süd', 'outdoor', false, 'Einzel', 20)
on conflict (id) do nothing;

select setval('courts_id_seq', (select max(id) from public.courts));

-- Seed equipment
insert into public.equipment (id, cat, name, tag, price, per_day, stock, blurb) values
  ('rk-pro', 'racket', 'Head Speed Pro', 'Profi · Hard', 9, false, 6, 'Diamantform, kontrollierte Power für fortgeschrittene Spieler.'),
  ('rk-soft', 'racket', 'Bullpadel Vertex', 'Allround · Soft', 8, false, 10, 'Runde Form, großer Sweet-Spot — ideal zum Einstieg.'),
  ('rk-nox', 'racket', 'Nox AT10 Luxury', 'Premium', 12, false, 4, 'Carbon-Oberfläche, maximale Präzision am Netz.'),
  ('balls', 'ball', 'Dosen Padelbälle (3)', 'Druckbälle', 6, false, 40, 'Frische Dose mit drei offiziellen Turnierbällen.'),
  ('shoes', 'shoe', 'Court-Schuhe', 'Gr. 38–47', 7, false, 22, 'Sandplatz-Profil für sicheren Halt, frisch desinfiziert.'),
  ('towel', 'extra', 'Club-Handtuch', 'Frottee', 3, false, 60, 'Weiches Clubhandtuch mit eingesticktem VOLEA-Wappen.'),
  ('grip', 'extra', 'Overgrip-Set (3)', 'Verbrauch', 4, false, 50, 'Saugstarke Griffbänder — bleiben deins.'),
  ('water', 'extra', 'Iso-Trinkflasche', '0,75 l', 5, false, 30, 'Isolierte Edelstahlflasche, kühl über die ganze Partie.')
on conflict (id) do nothing;
