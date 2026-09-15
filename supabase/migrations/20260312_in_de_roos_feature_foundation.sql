create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.member_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  full_name text not null,
  display_name text not null,
  bio text not null default '',
  location text not null default '',
  looking_for text not null default '',
  interests text[] not null default '{}',
  avatar_url text,
  attended_event_ids text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  external_id text unique not null,
  event_id text not null,
  member_user_id uuid references public.member_profiles (user_id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  ticket_type text not null check (ticket_type in ('man', 'stel', 'vrouw', 'membership')),
  quantity integer not null default 1 check (quantity > 0),
  total_price numeric(10,2) not null default 0,
  status text not null default 'new' check (status in ('new', 'pending', 'paid', 'cancelled')),
  booking_mode text check (booking_mode in ('ticket', 'membership')),
  selection_label text,
  language text check (language in ('nl', 'en', 'de')),
  notes text,
  admin_notes text,
  tikkie_reference text,
  payment_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservation_messages (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.reservations (id) on delete cascade,
  recipient_email text not null,
  subject text not null,
  body text not null,
  kind text not null check (kind in ('payment_request', 'update')),
  created_at timestamptz not null default now()
);

create table if not exists public.direct_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.member_profiles (user_id) on delete cascade,
  recipient_id uuid not null references public.member_profiles (user_id) on delete cascade,
  subject text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image text not null,
  author text not null default 'In De Roos',
  tags text[] not null default '{}',
  published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shop_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text not null,
  price numeric(10,2) not null default 0,
  image text not null,
  badge text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_offerings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  duration text not null,
  price_label text not null,
  image text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists member_profiles_set_updated_at on public.member_profiles;
create trigger member_profiles_set_updated_at
before update on public.member_profiles
for each row execute function public.set_updated_at();

drop trigger if exists reservations_set_updated_at on public.reservations;
create trigger reservations_set_updated_at
before update on public.reservations
for each row execute function public.set_updated_at();

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

drop trigger if exists shop_products_set_updated_at on public.shop_products;
create trigger shop_products_set_updated_at
before update on public.shop_products
for each row execute function public.set_updated_at();

drop trigger if exists service_offerings_set_updated_at on public.service_offerings;
create trigger service_offerings_set_updated_at
before update on public.service_offerings
for each row execute function public.set_updated_at();

alter table public.member_profiles enable row level security;
alter table public.reservations enable row level security;
alter table public.reservation_messages enable row level security;
alter table public.direct_messages enable row level security;
alter table public.blog_posts enable row level security;
alter table public.shop_products enable row level security;
alter table public.service_offerings enable row level security;

drop policy if exists "Authenticated users can view member profiles" on public.member_profiles;
create policy "Authenticated users can view member profiles"
on public.member_profiles
for select
to authenticated
using (true);

drop policy if exists "Members can insert own profile" on public.member_profiles;
create policy "Members can insert own profile"
on public.member_profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Members can update own profile" on public.member_profiles;
create policy "Members can update own profile"
on public.member_profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Members can see own reservations" on public.reservations;
create policy "Members can see own reservations"
on public.reservations
for select
to authenticated
using (
  member_user_id = auth.uid()
  or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
);

drop policy if exists "Members can see own reservation messages" on public.reservation_messages;
create policy "Members can see own reservation messages"
on public.reservation_messages
for select
to authenticated
using (
  exists (
    select 1
    from public.reservations reservations
    where reservations.id = reservation_messages.reservation_id
      and (
        reservations.member_user_id = auth.uid()
        or lower(reservations.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
  )
);

drop policy if exists "Members can view own direct messages" on public.direct_messages;
create policy "Members can view own direct messages"
on public.direct_messages
for select
to authenticated
using (sender_id = auth.uid() or recipient_id = auth.uid());

drop policy if exists "Members can send direct messages" on public.direct_messages;
create policy "Members can send direct messages"
on public.direct_messages
for insert
to authenticated
with check (sender_id = auth.uid());

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
on public.blog_posts
for select
to anon, authenticated
using (published = true);

drop policy if exists "Public can read active shop products" on public.shop_products;
create policy "Public can read active shop products"
on public.shop_products
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Public can read active service offerings" on public.service_offerings;
create policy "Public can read active service offerings"
on public.service_offerings
for select
to anon, authenticated
using (is_active = true);

insert into storage.buckets (id, name, public)
values ('member-avatars', 'member-avatars', true)
on conflict (id) do nothing;

insert into public.blog_posts (slug, title, excerpt, content, cover_image, author, tags, published, published_at)
values
  (
    'velvet-entry-guide',
    'Hoe je de nacht binnenstapt zonder de spanning te verliezen',
    'Een verfijnde voorbereiding maakt de eerste indruk stiller, sterker en veel verleidelijker.',
    'Discretie begint ruim voor aankomst. Kies kleding die spanning oproept zonder alles prijs te geven, bevestig je timing, en laat ruimte voor anticipatie. In De Roos draait om de energie waarmee je binnenkomt: verzorgd, ontspannen en aanwezig.',
    '/koppels/interracialkoppel1.png',
    'In De Roos',
    array['guides', 'stijl', 'nachtleven'],
    true,
    now()
  ),
  (
    'consent-code',
    'Consent als stille luxe van een goede avond',
    'De juiste sfeer ontstaat wanneer grenzen helder zijn en verlangen ontspannen kan bewegen.',
    'Een goede avond voelt licht, veilig en geladen tegelijk. Dat kan alleen wanneer consent niet als formaliteit wordt behandeld, maar als elegante basis van elke ontmoeting. Duidelijkheid vergroot juist de spanning.',
    '/groepen/group1.png',
    'In De Roos',
    array['consent', 'veiligheid', 'community'],
    true,
    now()
  )
on conflict (slug) do nothing;

insert into public.shop_products (name, category, description, price, image, badge, is_active)
values
  ('Golden Lace Set', 'Lingerie set', 'Een verfijnde set met zachte glans, ontworpen voor spanning die langzaam wordt opgebouwd.', 129, '/koppels/arabblackkoppel1.png', 'Signature', true),
  ('Velvet Touch Massage Oil', 'Massage olie', 'Warme, sensuele olie met een lange glide en een subtiele geur voor intieme rituelen.', 34, '/groepen/foursome1.png', 'Bestseller', true),
  ('Afrodisiac Night Tea', 'Thee', 'Een kruidige blend voor tragere ademhaling, rust in het lijf en een zachtere opbouw.', 22, '/groepen/Gemini_Generated_Image_9wzqn49wzqn49wzq.png', null, true)
on conflict do nothing;

insert into public.service_offerings (name, description, duration, price_label, image, is_active)
values
  ('Koppel Therapie', 'Een besloten sessie om verlangen, grenzen en communicatie opnieuw op één lijn te brengen.', '75 min', 'Vanaf € 180', '/koppels/interracialkoppel1.png', true),
  ('Massage Therapie', 'Een intieme duo-ervaring gericht op ontspanning, vertraging en subtiele herverbinding.', '90 min', 'Vanaf € 220', '/koppels/cuckkoppel3.png', true),
  ('ReiTanKam', 'Een zachte, aandachtige sessie die ademhaling, aanwezigheid en spanningsregulatie centraal zet.', '90 min', 'Vanaf € 240', '/solos/solo1.png', true),
  ('Intimiteits Genezing', 'Een verdiepend traject waarin lichaam, emotie en spirituele zachtheid samenkomen, inclusief ruimte voor plant medicine-context waar passend en verantwoord.', 'Traject op intake', 'Op aanvraag', '/groepen/group2.png', true)
on conflict do nothing;
