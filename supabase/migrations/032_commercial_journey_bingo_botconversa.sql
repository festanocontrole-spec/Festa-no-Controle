-- 032_commercial_journey_bingo_botconversa.sql
-- Evolução comercial do Festa no Controle: jornada de lead, cliente, acesso, pós-venda e Bingo no Controle.

create extension if not exists "pgcrypto";

alter table if exists public.commercial_leads
  add column if not exists consent_whatsapp boolean not null default true,
  add column if not exists consent_email boolean not null default true,
  add column if not exists botconversa_status text,
  add column if not exists last_contacted_at timestamptz,
  add column if not exists event_ready_link text,
  add column if not exists desired_solution text;

create table if not exists public.commercial_activity_log (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.commercial_leads(id) on delete cascade,
  activity_type text not null check (activity_type in ('diagnostic', 'email', 'whatsapp', 'call', 'demo', 'proposal', 'payment', 'access', 'post_event', 'reactivation', 'note')),
  title text not null,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.commercial_proposals (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.commercial_leads(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  title text not null,
  offer_type text not null default 'founder_essential' check (offer_type in ('founder_essential', 'pilot_full_case', 'symbolic_fee', 'first_event_pilot_next_paid', 'standard')),
  plan_slug text,
  amount_cents integer not null default 0,
  digital_sales_fee_percent numeric(5,2) not null default 0,
  scope_summary text,
  valid_until date,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'rejected', 'expired', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.commercial_payments (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references public.commercial_proposals(id) on delete set null,
  lead_id uuid references public.commercial_leads(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  amount_cents integer not null default 0,
  payment_method text not null default 'pix' check (payment_method in ('pix', 'card', 'cash', 'bank_transfer', 'courtesy', 'other')),
  status text not null default 'pending' check (status in ('pending', 'proof_sent', 'paid', 'failed', 'refunded', 'cancelled')),
  paid_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.commercial_access_grants (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.commercial_leads(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete cascade,
  event_id uuid,
  access_type text not null default 'event' check (access_type in ('event', 'demo', 'pilot', 'admin')),
  status text not null default 'active' check (status in ('active', 'suspended', 'expired', 'revoked')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  reactivation_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.commercial_post_event_actions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  lead_id uuid references public.commercial_leads(id) on delete set null,
  event_id uuid,
  event_date date,
  action_type text not null default 'feedback' check (action_type in ('feedback', 'case_request', 'testimonial', 'renewal', 'referral', 'reactivation')),
  due_at timestamptz,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.bingo_commercial_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  includes_system boolean not null default true,
  includes_bingo_globe boolean not null default false,
  includes_tvs boolean not null default false,
  includes_sound_system boolean not null default false,
  starting_price_cents integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.bingo_commercial_packages
  (name, slug, description, includes_system, includes_bingo_globe, includes_tvs, includes_sound_system, starting_price_cents)
values
  (
    'Bingo no Controle - Somente Sistema',
    'bingo-no-controle-somente-sistema',
    'Rodadas, várias quinas, cartela cheia opcional, prendas com fotos, pedras sorteadas e chamada de bingo pelo celular.',
    true,
    false,
    false,
    false,
    99700
  ),
  (
    'Bingo no Controle - Sistema + Estrutura',
    'bingo-no-controle-sistema-estrutura',
    'Sistema completo com apoio operacional: globo de pedras, telas de TV para acompanhamento e sistema de som.',
    true,
    true,
    true,
    true,
    249700
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  includes_system = excluded.includes_system,
  includes_bingo_globe = excluded.includes_bingo_globe,
  includes_tvs = excluded.includes_tvs,
  includes_sound_system = excluded.includes_sound_system,
  starting_price_cents = excluded.starting_price_cents,
  is_active = true;

create index if not exists idx_commercial_activity_log_lead_id on public.commercial_activity_log(lead_id);
create index if not exists idx_commercial_proposals_lead_id on public.commercial_proposals(lead_id);
create index if not exists idx_commercial_payments_lead_id on public.commercial_payments(lead_id);
create index if not exists idx_commercial_access_grants_organization_id on public.commercial_access_grants(organization_id);
create index if not exists idx_commercial_post_event_actions_due_at on public.commercial_post_event_actions(due_at);
