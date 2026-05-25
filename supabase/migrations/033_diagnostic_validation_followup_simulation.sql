-- 033_diagnostic_validation_followup_simulation.sql
-- Reforços para diagnóstico público: consentimentos, solução desejada, mensagens de follow-up e simulação inicial.

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
