-- 031_festa_no_controle_commercial_base.sql
-- Base comercial do produto Festa no Controle.
-- Objetivo:
-- - Preparar o produto para multi-entidade/cliente.
-- - Criar CRM comercial para captação por diagnóstico.
-- - Criar estrutura inicial de planos e snapshots de cobrança.

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  document_number text,
  contact_name text,
  contact_email text,
  contact_whatsapp text,
  city text,
  state text,
  segment text,
  status text not null default 'active'
    check (status in ('active', 'inactive', 'pilot', 'demo')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid,
  email text not null,
  full_name text,
  role text not null default 'coordinator'
    check (role in ('owner', 'admin', 'coordinator', 'cashier', 'waiter', 'kitchen', 'viewer')),
  status text not null default 'active'
    check (status in ('active', 'inactive', 'invited')),
  created_at timestamptz not null default now(),
  unique (organization_id, email)
);

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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

create table if not exists public.subscription_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  setup_fee_cents integer not null default 0,
  event_fee_cents integer not null default 0,
  digital_sales_fee_percent numeric(5,2) not null default 0,
  max_events integer,
  max_orders integer,
  features jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.event_billing_snapshots (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  event_id uuid,
  plan_id uuid references public.subscription_plans(id) on delete set null,
  gross_revenue_cents integer not null default 0,
  digital_revenue_cents integer not null default 0,
  cash_revenue_cents integer not null default 0,
  card_revenue_cents integer not null default 0,
  pix_revenue_cents integer not null default 0,
  fee_percent numeric(5,2) not null default 0,
  calculated_fee_cents integer not null default 0,
  fixed_fee_cents integer not null default 0,
  total_due_cents integer not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

drop trigger if exists trg_organizations_updated_at on public.organizations;
create trigger trg_organizations_updated_at
before update on public.organizations
for each row
execute function public.set_updated_at();

drop trigger if exists trg_commercial_leads_updated_at on public.commercial_leads;
create trigger trg_commercial_leads_updated_at
before update on public.commercial_leads
for each row
execute function public.set_updated_at();

insert into public.subscription_plans
  (name, slug, description, setup_fee_cents, event_fee_cents, digital_sales_fee_percent, features)
values
  (
    'Essencial - Dia da Festa',
    'essencial-dia-da-festa',
    'Garçom, pedidos, caixa e relatório simples.',
    0,
    99700,
    0,
    '{"waiter":true,"cashier":true,"orders":true,"basic_reports":true}'::jsonb
  ),
  (
    'Organização - Antes + Durante',
    'organizacao-antes-durante',
    'Convites, Pix manual, comprovantes, combos, pedidos e caixa.',
    0,
    199700,
    2.50,
    '{"tickets":true,"manual_pix":true,"combos":true,"waiter":true,"cashier":true,"reports":true}'::jsonb
  ),
  (
    'Completo - Festa 360',
    'completo-festa-360',
    'Pré-venda, planejamento, voluntários, compras, operação e prestação de contas.',
    0,
    399700,
    3.50,
    '{"tickets":true,"combos":true,"planning":true,"volunteers":true,"supplies":true,"operation":true,"accountability":true}'::jsonb
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  setup_fee_cents = excluded.setup_fee_cents,
  event_fee_cents = excluded.event_fee_cents,
  digital_sales_fee_percent = excluded.digital_sales_fee_percent,
  features = excluded.features,
  is_active = true;

create index if not exists idx_organizations_slug on public.organizations(slug);
create index if not exists idx_organizations_status on public.organizations(status);
create index if not exists idx_organization_members_organization_id on public.organization_members(organization_id);
create index if not exists idx_organization_members_email on public.organization_members(email);
create index if not exists idx_commercial_leads_status on public.commercial_leads(status);
create index if not exists idx_commercial_leads_priority on public.commercial_leads(priority);
create index if not exists idx_commercial_leads_next_action_at on public.commercial_leads(next_action_at);
create index if not exists idx_commercial_diagnostic_created_at on public.commercial_diagnostic_responses(created_at);
create index if not exists idx_commercial_followups_due_at on public.commercial_followups(due_at);
create index if not exists idx_event_billing_snapshots_organization_id on public.event_billing_snapshots(organization_id);
