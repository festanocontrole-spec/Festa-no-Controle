-- ============================================================
-- Festa no Controle
-- Base comercial multi-cliente, planos, ofertas, contratos e menu
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.commercial_clients (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.commercial_leads(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  name text not null,
  slug text unique,
  contact_name text,
  contact_email text,
  contact_whatsapp text,
  city text,
  state text,
  segment text,
  status text not null default 'prospect' check (status in ('prospect','active','paused','finished','archived')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.commercial_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  product_type text not null default 'module' check (product_type in ('platform','module','service','bundle')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.commercial_plan_catalog (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  suggested_price_from_cents integer,
  suggested_price_to_cents integer,
  digital_sales_fee_percent numeric(5,2),
  billing_model text not null default 'per_event' check (billing_model in ('per_event','per_event_plus_percent','social','custom')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.commercial_offers (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  description text,
  when_to_use text,
  conditions jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.commercial_contracts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.commercial_clients(id) on delete cascade,
  lead_id uuid references public.commercial_leads(id) on delete set null,
  plan_id uuid references public.commercial_plan_catalog(id) on delete set null,
  offer_id uuid references public.commercial_offers(id) on delete set null,
  status text not null default 'draft' check (status in ('draft','sent','accepted','paid','active','completed','cancelled')),
  fixed_fee_cents integer not null default 0,
  digital_sales_fee_percent numeric(5,2) not null default 0,
  start_date date,
  end_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.commercial_client_modules (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.commercial_clients(id) on delete cascade,
  contract_id uuid references public.commercial_contracts(id) on delete cascade,
  product_id uuid references public.commercial_products(id) on delete set null,
  module_slug text not null,
  module_name text not null,
  status text not null default 'planned' check (status in ('planned','enabled','disabled','completed')),
  access_starts_at timestamptz,
  access_ends_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.commercial_event_access (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.commercial_clients(id) on delete cascade,
  contract_id uuid references public.commercial_contracts(id) on delete set null,
  event_id uuid,
  user_email text,
  role text not null default 'coordinator',
  status text not null default 'active' check (status in ('invited','active','suspended','expired')),
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.commercial_menu_items (
  id uuid primary key default gen_random_uuid(),
  scope text not null default 'internal' check (scope in ('internal','client','event','module')),
  client_id uuid references public.commercial_clients(id) on delete cascade,
  contract_id uuid references public.commercial_contracts(id) on delete cascade,
  parent_id uuid references public.commercial_menu_items(id) on delete set null,
  label text not null,
  route_path text,
  item_key text not null,
  sort_order integer not null default 100,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  unique(scope, client_id, contract_id, item_key)
);

insert into public.commercial_products (name, slug, description, product_type)
values
  ('Festa no Controle', 'festa-no-controle', 'Plataforma principal para eventos comunitários e beneficentes.', 'platform'),
  ('Módulo Essencial - Dia da Festa', 'modulo-essencial-dia-da-festa', 'Cardápio, garçom, pedidos, caixa, cancelamentos e relatório simples.', 'module'),
  ('Convites, Combos e Pré-venda', 'convites-combos-pre-venda', 'Convites, Pix/comprovante, combos, check-in e receita antecipada.', 'module'),
  ('Planejamento e Prestação de Contas', 'planejamento-prestacao-contas', 'Compras, voluntários, operação, relatórios e prestação de contas.', 'module'),
  ('Bingo no Controle', 'bingo-no-controle', 'Rodadas, várias quinas, cartela cheia, prendas, TV, som e conferência de chamadas.', 'module')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  product_type = excluded.product_type,
  is_active = true;

insert into public.commercial_plan_catalog (name, slug, description, suggested_price_from_cents, suggested_price_to_cents, digital_sales_fee_percent, billing_model)
values
  ('Essencial / Dia da Festa', 'essencial-dia-da-festa', 'Para começar resolvendo pedidos, garçom, caixa e fechamento sem redigitação.', 49700, 99700, 0, 'per_event'),
  ('Organização / Antes + Durante', 'organizacao-antes-durante', 'Inclui convites, Pix/comprovante, combos, WhatsApp manual, check-in e relatório financeiro.', 99700, 199700, 2.50, 'per_event_plus_percent'),
  ('Completo / Festa 360', 'completo-festa-360', 'Pré-venda, compras, voluntários, operação, prestação de contas, treinamento e plantão remoto.', 199700, 499700, 3.50, 'per_event_plus_percent'),
  ('Plano Social', 'plano-social', 'Valor reduzido, cortesia estratégica ou patrocínio para entidades pequenas e cases sociais.', null, null, 0, 'social'),
  ('Bingo no Controle', 'bingo-no-controle', 'Produto standalone ou módulo combinado para eventos com bingo.', null, null, 0, 'custom')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  suggested_price_from_cents = excluded.suggested_price_from_cents,
  suggested_price_to_cents = excluded.suggested_price_to_cents,
  digital_sales_fee_percent = excluded.digital_sales_fee_percent,
  billing_model = excluded.billing_model,
  is_active = true;

insert into public.commercial_offers (code, title, description, when_to_use, conditions)
values
  ('A', 'Piloto completo sem custo com contrapartida', 'Implantação sem custo para cliente estratégico.', 'Cliente com alto potencial de case, depoimento e indicação.', '["autorização para uso como case", "depoimento", "reuniões de feedback", "medição de resultados"]'::jsonb),
  ('B', 'Módulo essencial gratuito para Cliente Fundador', 'Oferta recomendada para provar valor sem liberar todos os módulos.', 'Lead bom que precisa reduzir risco para testar a solução.', '["pedidos por garçom", "caixa", "fechamento sem redigitação", "módulos extras pagos depois"]'::jsonb),
  ('C', 'Taxa simbólica', 'Valor simbólico para reservar implantação e demonstrar compromisso.', 'Lead interessado, mas sem decisão firme.', '["R$ 197, R$ 297 ou R$ 497", "escopo fechado", "agenda definida"]'::jsonb),
  ('D', 'Primeira edição piloto, próxima edição comercial', 'Validação na primeira edição com proposta comercial para a próxima.', 'Evento sazonal que ainda não quer contratar agora.', '["uso piloto", "pós-evento obrigatório", "proposta para próxima edição"]'::jsonb)
on conflict (code) do update set
  title = excluded.title,
  description = excluded.description,
  when_to_use = excluded.when_to_use,
  conditions = excluded.conditions,
  is_active = true;

do $$
begin
  if to_regclass('public.commercial_clients') is not null then
    grant select, insert, update, delete on public.commercial_clients to service_role;
  end if;
  if to_regclass('public.commercial_products') is not null then
    grant select, insert, update, delete on public.commercial_products to service_role;
  end if;
  if to_regclass('public.commercial_plan_catalog') is not null then
    grant select, insert, update, delete on public.commercial_plan_catalog to service_role;
  end if;
  if to_regclass('public.commercial_offers') is not null then
    grant select, insert, update, delete on public.commercial_offers to service_role;
  end if;
  if to_regclass('public.commercial_contracts') is not null then
    grant select, insert, update, delete on public.commercial_contracts to service_role;
  end if;
  if to_regclass('public.commercial_client_modules') is not null then
    grant select, insert, update, delete on public.commercial_client_modules to service_role;
  end if;
  if to_regclass('public.commercial_event_access') is not null then
    grant select, insert, update, delete on public.commercial_event_access to service_role;
  end if;
  if to_regclass('public.commercial_menu_items') is not null then
    grant select, insert, update, delete on public.commercial_menu_items to service_role;
  end if;
end $$;
