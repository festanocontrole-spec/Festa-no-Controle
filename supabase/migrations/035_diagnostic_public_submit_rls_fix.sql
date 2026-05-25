-- 035_diagnostic_public_submit_rls_fix.sql
-- Festa no Controle
-- Objetivo:
-- 1) permitir que o diagnóstico público grave leads mesmo quando a aplicação estiver usando anon key como fallback;
-- 2) evitar erro de SELECT após INSERT, pois a action agora gera o UUID antes e não usa .select();
-- 3) manter leitura/gestão restrita aos administradores cadastrados em public.admin_profiles.

create extension if not exists "pgcrypto";

create table if not exists public.commercial_leads (
  id uuid primary key default gen_random_uuid(),
  organization_name text,
  contact_name text not null,
  contact_email text,
  contact_whatsapp text,
  city text,
  state text,
  event_type text,
  expected_audience integer,
  next_event_date date,
  main_pain text,
  lead_source text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'diagnostic_sent', 'demo_scheduled', 'proposal_sent', 'won', 'lost', 'archived')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'urgent')),
  next_action_at timestamptz,
  next_action_note text,
  internal_notes text,
  consent_whatsapp boolean not null default true,
  consent_email boolean not null default true,
  desired_solution text,
  botconversa_status text,
  last_contacted_at timestamptz,
  event_ready_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.commercial_leads
  add column if not exists consent_whatsapp boolean not null default true,
  add column if not exists consent_email boolean not null default true,
  add column if not exists desired_solution text,
  add column if not exists botconversa_status text,
  add column if not exists last_contacted_at timestamptz,
  add column if not exists event_ready_link text;

create table if not exists public.commercial_diagnostic_responses (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.commercial_leads(id) on delete set null,
  organization_name text,
  contact_name text,
  contact_email text,
  contact_whatsapp text,
  event_type text,
  expected_audience integer,
  sells_tickets_before boolean,
  uses_paper_tickets boolean,
  cashier_retypes_orders boolean,
  had_cashier_lines boolean,
  had_food_shortage_or_leftovers boolean,
  volunteer_management text,
  accountability_process text,
  biggest_fear text,
  next_event_date date,
  maturity_score integer,
  dominant_profile text,
  recommended_offer text,
  raw_answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.commercial_followups (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.commercial_leads(id) on delete cascade,
  followup_type text not null default 'whatsapp'
    check (followup_type in ('whatsapp', 'email', 'call', 'meeting', 'demo', 'proposal', 'other')),
  subject text,
  notes text,
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin'
    check (role in ('admin', 'coordenador', 'caixa', 'cozinha', 'entrega', 'garcom')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.admin_profiles (id, full_name, role, active)
select
  id,
  coalesce(raw_user_meta_data->>'full_name', 'Administrador Festa no Controle'),
  'admin',
  true
from auth.users
where lower(email) = 'festanocontrole@gmail.com'
on conflict (id) do update
set
  full_name = coalesce(excluded.full_name, public.admin_profiles.full_name),
  role = 'admin',
  active = true,
  updated_at = now();

alter table public.commercial_leads enable row level security;
alter table public.commercial_diagnostic_responses enable row level security;
alter table public.commercial_followups enable row level security;
alter table public.admin_profiles enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'admin_profiles'
      and policyname = 'Admin can read own profile'
  ) then
    create policy "Admin can read own profile"
    on public.admin_profiles
    for select
    to authenticated
    using (id = auth.uid());
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'commercial_leads'
      and policyname = 'Public diagnostic can create lead'
  ) then
    create policy "Public diagnostic can create lead"
    on public.commercial_leads
    for insert
    to anon, authenticated
    with check (lead_source = 'diagnostico-publico');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'commercial_diagnostic_responses'
      and policyname = 'Public diagnostic can create response'
  ) then
    create policy "Public diagnostic can create response"
    on public.commercial_diagnostic_responses
    for insert
    to anon, authenticated
    with check (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'commercial_followups'
      and policyname = 'Public diagnostic can create followups'
  ) then
    create policy "Public diagnostic can create followups"
    on public.commercial_followups
    for insert
    to anon, authenticated
    with check (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'commercial_leads'
      and policyname = 'Admins can manage commercial leads'
  ) then
    create policy "Admins can manage commercial leads"
    on public.commercial_leads
    for all
    to authenticated
    using (
      exists (
        select 1
        from public.admin_profiles ap
        where ap.id = auth.uid()
          and ap.active = true
          and ap.role = 'admin'
      )
    )
    with check (
      exists (
        select 1
        from public.admin_profiles ap
        where ap.id = auth.uid()
          and ap.active = true
          and ap.role = 'admin'
      )
    );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'commercial_diagnostic_responses'
      and policyname = 'Admins can read diagnostic responses'
  ) then
    create policy "Admins can read diagnostic responses"
    on public.commercial_diagnostic_responses
    for select
    to authenticated
    using (
      exists (
        select 1
        from public.admin_profiles ap
        where ap.id = auth.uid()
          and ap.active = true
          and ap.role = 'admin'
      )
    );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'commercial_followups'
      and policyname = 'Admins can manage commercial followups'
  ) then
    create policy "Admins can manage commercial followups"
    on public.commercial_followups
    for all
    to authenticated
    using (
      exists (
        select 1
        from public.admin_profiles ap
        where ap.id = auth.uid()
          and ap.active = true
          and ap.role = 'admin'
      )
    )
    with check (
      exists (
        select 1
        from public.admin_profiles ap
        where ap.id = auth.uid()
          and ap.active = true
          and ap.role = 'admin'
      )
    );
  end if;
end $$;

create index if not exists idx_commercial_leads_created_at on public.commercial_leads(created_at desc);
create index if not exists idx_commercial_leads_status on public.commercial_leads(status);
create index if not exists idx_commercial_leads_priority on public.commercial_leads(priority);
create index if not exists idx_commercial_diagnostic_responses_lead_id on public.commercial_diagnostic_responses(lead_id);
create index if not exists idx_commercial_followups_lead_id on public.commercial_followups(lead_id);

select
  'commercial_leads' as tabela,
  count(*) as total
from public.commercial_leads
union all
select
  'commercial_diagnostic_responses' as tabela,
  count(*) as total
from public.commercial_diagnostic_responses
union all
select
  'commercial_followups' as tabela,
  count(*) as total
from public.commercial_followups
union all
select
  'admin_profiles' as tabela,
  count(*) as total
from public.admin_profiles;
