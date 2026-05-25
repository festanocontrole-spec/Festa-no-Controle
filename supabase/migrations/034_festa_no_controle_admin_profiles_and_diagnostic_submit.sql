-- 034_festa_no_controle_admin_profiles_and_diagnostic_submit.sql
-- Executar no Supabase SQL Editor.
-- Objetivo: criar/liberar admin_profiles e garantir colunas comerciais usadas pelo diagnóstico.

create extension if not exists "pgcrypto";

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin'
    check (role in ('admin', 'coordenador', 'caixa', 'cozinha', 'entrega', 'garcom')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists admin_profiles_role_idx on public.admin_profiles(role);
create index if not exists admin_profiles_active_idx on public.admin_profiles(active);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_admin_profiles_updated_at on public.admin_profiles;
create trigger trg_admin_profiles_updated_at
before update on public.admin_profiles
for each row
execute function public.set_updated_at();

alter table public.admin_profiles enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'admin_profiles'
      and policyname = 'Admin users can read own profile'
  ) then
    create policy "Admin users can read own profile"
    on public.admin_profiles
    for select
    to authenticated
    using (id = auth.uid());
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'admin_profiles'
      and policyname = 'Admin users can update own name'
  ) then
    create policy "Admin users can update own name"
    on public.admin_profiles
    for update
    to authenticated
    using (id = auth.uid())
    with check (id = auth.uid());
  end if;
end $$;

-- Libera o primeiro administrador do Festa no Controle, desde que o usuário já exista em Authentication > Users.
insert into public.admin_profiles (id, full_name, role, active)
select
  id,
  coalesce(raw_user_meta_data->>'full_name', 'Administrador Festa no Controle') as full_name,
  'admin' as role,
  true as active
from auth.users
where lower(email) = 'festanocontrole@gmail.com'
on conflict (id) do update
set
  full_name = coalesce(excluded.full_name, public.admin_profiles.full_name),
  role = 'admin',
  active = true,
  updated_at = now();


-- Base comercial mínima para o diagnóstico público, caso as migrations anteriores ainda não tenham sido aplicadas.
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

drop trigger if exists trg_commercial_leads_updated_at on public.commercial_leads;
create trigger trg_commercial_leads_updated_at
before update on public.commercial_leads
for each row
execute function public.set_updated_at();

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

-- Segurança: garante que a base comercial do diagnóstico tem as colunas usadas pela aplicação.
alter table if exists public.commercial_leads
  add column if not exists consent_whatsapp boolean not null default true,
  add column if not exists consent_email boolean not null default true,
  add column if not exists desired_solution text,
  add column if not exists botconversa_status text,
  add column if not exists last_contacted_at timestamptz,
  add column if not exists event_ready_link text;

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

create index if not exists idx_commercial_followups_lead_id on public.commercial_followups(lead_id);
create index if not exists idx_commercial_followups_due_at on public.commercial_followups(due_at);
create index if not exists idx_commercial_leads_desired_solution on public.commercial_leads(desired_solution);

-- Verificação final.
select
  u.id as user_id,
  u.email,
  ap.role,
  ap.active
from auth.users u
left join public.admin_profiles ap on ap.id = u.id
where lower(u.email) = 'festanocontrole@gmail.com';
