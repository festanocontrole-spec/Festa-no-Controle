"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Coffee,
  CreditCard,
  DoorOpen,
  FileText,
  Gift,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  ListTree,
  LogOut,
  Menu,
  Megaphone,
  MessageCircle,
  PackageCheck,
  ReceiptText,
  Settings,
  ShoppingCart,
  Ticket,
  Trophy,
  Users,
  Utensils,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

export type CommercialAdminNavItem = {
  href: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  badge?: string;
};

export type CommercialAdminNavSection = {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  items: CommercialAdminNavItem[];
};

export const commercialAdminNavSections: CommercialAdminNavSection[] = [
  {
    title: "Comercial",
    description: "Do diagnóstico ao cliente ativo.",
    defaultOpen: true,
    items: [
      { href: "/admin/comercial", title: "Painel", icon: LayoutDashboard, description: "Visão geral da gestão interna." },
      { href: "/admin/comercial/leads", title: "Leads e diagnósticos", icon: MessageCircle, description: "Diagnósticos, dores, prioridade e WhatsApp." },
      { href: "/admin/comercial/clientes", title: "Clientes", icon: Users, description: "Organizações, eventos e responsáveis." },
      { href: "/admin/comercial/planos", title: "Planos e ofertas", icon: PackageCheck, description: "Essencial, Organização, 360, Social e Bingo." },
      { href: "/admin/comercial/propostas", title: "Propostas", icon: FileText, description: "Plano, oferta, escopo e valor." },
      { href: "/admin/comercial/pagamentos", title: "Pagamentos", icon: CreditCard, description: "Valores, comprovantes e status." },
      { href: "/admin/comercial/acessos", title: "Acessos", icon: KeyRound, description: "Usuários, permissões e período contratado." },
      { href: "/admin/comercial/pos-venda", title: "Pós-venda", icon: CalendarDays, description: "Case, depoimento e próxima edição." },
    ],
  },
  {
    title: "Evento selecionado",
    description: "Funcionalidades herdadas e evoluídas do Tucxa.",
    defaultOpen: true,
    items: [
      { href: "/admin/festa-junina", title: "Painel do evento", icon: LayoutDashboard },
      { href: "/admin/festa-junina/eventos", title: "Eventos", icon: CalendarDays },
      { href: "/admin/festa-junina/menu", title: "Menu", icon: ListTree, badge: "configurável" },
      { href: "/admin/festa-junina/ajuda", title: "Manuais e Ajuda", icon: HelpCircle },
      { href: "/admin/festa-junina/simulacao/capacidade", title: "Simulações", icon: BarChart3 },
      { href: "/admin/festa-junina/modulos", title: "Módulos", icon: ListChecks },
      { href: "/admin/festa-junina/configuracoes", title: "Configurações do evento", icon: Settings },
    ],
  },
  {
    title: "Vendas",
    description: "Receita antes e durante o evento.",
    defaultOpen: true,
    items: [
      { href: "/admin/festa-junina/convites", title: "Convites", icon: Ticket },
      { href: "/admin/festa-junina/convites", title: "Individuais", icon: Ticket },
      { href: "/admin/festa-junina/combos", title: "Combos", icon: Gift },
      { href: "/admin/festa-junina/indicacoes", title: "Campanhas", icon: Megaphone },
      { href: "/admin/festa-junina/upsell", title: "Upsell", icon: ShoppingCart },
      { href: "/admin/festa-junina/pagamentos", title: "Pagamento", icon: WalletCards },
      { href: "/admin/festa-junina/pedidos", title: "Aprovações", icon: ClipboardCheck },
      { href: "/admin/festa-junina/relatorios?modulo=vendas", title: "Relatórios de vendas", icon: ReceiptText },
    ],
  },
  {
    title: "Operação",
    description: "Pedidos, preparo, caixa e equipe.",
    defaultOpen: true,
    items: [
      { href: "/admin/festa-junina/cardapio", title: "Cardápio", icon: Utensils },
      { href: "/admin/festa-junina/cliente-resumo", title: "Cardápio para vendas", icon: Coffee },
      { href: "/admin/festa-junina/garcom", title: "Garçom", icon: Users },
      { href: "/admin/festa-junina/atendimento/pedidos", title: "Pedidos", icon: ClipboardList },
      { href: "/admin/festa-junina/caixa", title: "Caixa", icon: CreditCard },
      { href: "/admin/festa-junina/preparo", title: "Preparo", icon: Utensils },
      { href: "/admin/festa-junina/retirada", title: "Retirada", icon: PackageCheck },
      { href: "/admin/festa-junina/entrega", title: "Entrega", icon: DoorOpen },
      { href: "/admin/festa-junina/atendimento/cancelados", title: "Cancelados", icon: X },
      { href: "/admin/festa-junina/voluntarios", title: "Voluntários/prestadores", icon: Users },
      { href: "/admin/festa-junina/operacao/configuracao", title: "Configuração operacional", icon: Settings },
    ],
  },
  {
    title: "Planejamento",
    description: "Compras, treinamento e prestação de contas.",
    defaultOpen: false,
    items: [
      { href: "/admin/festa-junina/planejamento", title: "Planejamento", icon: CalendarDays },
      { href: "/admin/festa-junina/compras", title: "Compras", icon: ShoppingCart },
      { href: "/admin/festa-junina/compras/insumos", title: "Insumos", icon: PackageCheck },
      { href: "/admin/festa-junina/compras/itens-finais", title: "Itens finais", icon: Gift },
      { href: "/admin/festa-junina/treinamento", title: "Treinamento", icon: BookOpen },
      { href: "/admin/festa-junina/treinamento/playlist", title: "Playlist YouTube", icon: BookOpen },
      { href: "/admin/festa-junina/prestacao-contas", title: "Prestação de contas", icon: ReceiptText },
      { href: "/admin/festa-junina/relatorios", title: "Relatórios", icon: BarChart3 },
      { href: "/admin/festa-junina/ocorrencias", title: "Ocorrências", icon: ClipboardList },
    ],
  },
  {
    title: "Bingo no Controle",
    description: "Produto standalone ou módulo do evento.",
    defaultOpen: false,
    items: [
      { href: "/admin/comercial/bingo", title: "Visão comercial", icon: Trophy },
      { href: "/admin/festa-junina/bingo", title: "Bingo do evento", icon: Trophy },
    ],
  },
  {
    title: "Plataforma",
    description: "Menus e configurações do Festa no Controle.",
    defaultOpen: false,
    items: [
      { href: "/admin/comercial/menu", title: "Menu da plataforma", icon: ListTree },
      { href: "/admin/comercial/configuracoes", title: "Configurações comerciais", icon: Settings },
      { href: "/admin/logout", title: "Sair da gestão", icon: LogOut },
    ],
  },
];

function isActive(pathname: string, href: string) {
  const cleanHref = href.split("?")[0] ?? href;
  if (cleanHref === "/admin/comercial") return pathname === cleanHref;
  if (cleanHref === "/admin/festa-junina") return pathname === cleanHref;
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}

function Section({ section, pathname, onNavigate }: { section: CommercialAdminNavSection; pathname: string; onNavigate?: () => void }) {
  const initiallyOpen = section.defaultOpen || section.items.some((item) => isActive(pathname, item.href));
  const [open, setOpen] = useState(Boolean(initiallyOpen));

  return (
    <section className="rounded-2xl bg-white/5 p-2">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-[0.68rem] font-black uppercase tracking-[0.15em] text-white/70 transition hover:bg-white/5 hover:text-white"
      >
        <span>{section.title}</span>
        <ChevronDown className={`h-3 w-3 transition ${open ? "rotate-0" : "-rotate-90"}`} />
      </button>
      {open ? (
        <div className="mt-1 grid gap-1">
          {section.items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={`${section.title}-${item.href}-${item.title}`}
                href={item.href}
                prefetch={false}
                onClick={onNavigate}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
                  active ? "bg-white text-green-950 shadow-sm" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{item.title}</span>
                {item.badge ? <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[0.62rem] font-black text-amber-800">{item.badge}</span> : null}
              </Link>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col bg-green-950 text-white">
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white font-black text-green-900">FNC</span>
          <div className="min-w-0">
            <p className="text-sm font-black leading-tight">Festa no Controle</p>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200">Gestão interna</p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-white/65">Comercial, clientes e módulos do evento em uma plataforma única multi-cliente.</p>
      </div>

      <nav className="flex-1 space-y-3 overflow-y-auto p-3" aria-label="Menu da Gestão do Festa no Controle">
        {commercialAdminNavSections.map((section) => (
          <Section key={section.title} section={section} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link href="/admin/logout" prefetch={false} className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-black text-white transition hover:bg-white/20">
          <LogOut className="h-4 w-4" />
          Sair da gestão
        </Link>
      </div>
    </div>
  );
}

export function CommercialAdminNav({ currentHref }: { currentHref?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const activeTitle = useMemo(() => {
    for (const section of commercialAdminNavSections) {
      const active = section.items.find((item) => isActive(pathname, item.href));
      if (active) return active.title;
    }
    return currentHref ? "Gestão" : "Menu gestão";
  }, [pathname, currentHref]);

  return (
    <>
      <aside className="fixed bottom-0 left-0 top-[4.7rem] z-40 hidden w-72 overflow-hidden border-r border-green-900/20 shadow-xl lg:block">
        <SidebarContent />
      </aside>

      <div className="sticky top-[4.7rem] z-30 rounded-[1.25rem] border border-amber-200 bg-white/95 p-2 shadow-sm backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-between rounded-2xl bg-green-950 px-4 py-3 text-left text-sm font-black text-white shadow-sm"
        >
          <span className="inline-flex items-center gap-2"><Menu className="h-4 w-4" /> {activeTitle}</span>
          <span className="text-xs text-white/70">abrir menu</span>
        </button>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-[90] bg-black/40 lg:hidden">
          <div className="h-full w-[88vw] max-w-xs shadow-2xl">
            <div className="absolute left-[calc(min(88vw,20rem)-3.25rem)] top-3">
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-full bg-white p-2 text-green-950 shadow" aria-label="Fechar menu gestão">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export function CommercialAdminHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-black leading-tight text-green-950 md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-700 md:text-base">{description}</p>
    </div>
  );
}
