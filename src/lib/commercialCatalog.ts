import {
  BadgeDollarSign,
  CalendarClock,
  ClipboardList,
  CreditCard,
  FileText,
  KeyRound,
  LayoutDashboard,
  ListTree,
  MessageCircle,
  PackageCheck,
  Settings,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CommercialManagementItem = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  emphasis?: string;
};

export const commercialManagementItems: CommercialManagementItem[] = [
  {
    href: "/admin/comercial",
    title: "Painel",
    description: "Visão geral da operação comercial: diagnósticos, prioridades, clientes, propostas, pagamentos e acessos.",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/comercial/leads",
    title: "Leads e diagnósticos",
    description: "Acompanhe respostas recebidas, dores dominantes, WhatsApp sugerido e próximos contatos.",
    icon: MessageCircle,
    emphasis: "entrada do funil",
  },
  {
    href: "/admin/comercial/clientes",
    title: "Clientes",
    description: "Organizações atendidas, eventos, usuários, módulos contratados e histórico de relacionamento.",
    icon: Users,
  },
  {
    href: "/admin/comercial/planos",
    title: "Planos e ofertas",
    description: "Catálogo comercial: Essencial, Organização, Completo, Social, Bingo no Controle e Cliente Fundador.",
    icon: PackageCheck,
    emphasis: "precificação",
  },
  {
    href: "/admin/comercial/propostas",
    title: "Propostas",
    description: "Transforme diagnóstico em proposta com plano, oferta, módulos, valor fixo e taxa sobre vendas digitais.",
    icon: FileText,
  },
  {
    href: "/admin/comercial/pagamentos",
    title: "Pagamentos",
    description: "Controle status de implantação, taxa por evento, percentual digital, cortesia e comprovantes.",
    icon: CreditCard,
  },
  {
    href: "/admin/comercial/acessos",
    title: "Acessos",
    description: "Libere ou retire acessos por cliente, evento, usuário, perfil e período contratado.",
    icon: KeyRound,
  },
  {
    href: "/admin/comercial/pos-venda",
    title: "Pós-venda",
    description: "Checklist pós-evento, depoimento, case, próxima edição e indicações para novas entidades.",
    icon: CalendarClock,
  },
  {
    href: "/admin/comercial/bingo",
    title: "Bingo no Controle",
    description: "Produto/módulo para rodadas, quinas, cartela cheia, prendas, TVs, som e conferência de chamadas.",
    icon: Trophy,
    emphasis: "módulo comercial",
  },
  {
    href: "/admin/comercial/menu",
    title: "Menu",
    description: "Gestão dos menus da plataforma e dos módulos de cada cliente, mantendo a mesma lógica do Tucxa.",
    icon: ListTree,
  },
  {
    href: "/admin/comercial/configuracoes",
    title: "Configurações",
    description: "Parâmetros comerciais, mensagens, BotConversa, e-mails, permissões e premissas de implantação.",
    icon: Settings,
  },
];

export type CommercialPlan = {
  name: string;
  price: string;
  audience: string;
  includes: string[];
  bestFor: string;
};

export const commercialPlans: CommercialPlan[] = [
  {
    name: "Essencial / Dia da Festa",
    price: "R$ 497 a R$ 997 por evento",
    audience: "Cliente que quer começar resolvendo pedido, garçom e caixa sem redigitação.",
    includes: ["cardápio", "garçom", "caixa", "pedidos", "cancelamentos", "relatório simples", "treinamento remoto"],
    bestFor: "Primeira oferta do Cliente Fundador e entrada de baixo risco.",
  },
  {
    name: "Organização / Antes + Durante",
    price: "R$ 997 a R$ 1.997 por evento",
    audience: "Evento que precisa vender antes, confirmar Pix e reduzir improviso no dia.",
    includes: ["tudo do Essencial", "convites", "Pix/comprovante", "combos", "WhatsApp manual", "check-in", "relatório financeiro"],
    bestFor: "Festas com pré-venda, famílias, grupos e necessidade de receita antecipada.",
  },
  {
    name: "Completo / Festa 360",
    price: "R$ 1.997 a R$ 4.997 por evento",
    audience: "Coordenação que precisa organizar antes, durante e depois do evento.",
    includes: ["pré-venda", "combos", "compras", "voluntários", "operação", "prestação de contas", "treinamento", "plantão remoto"],
    bestFor: "Eventos maiores ou recorrentes que precisam de previsibilidade e prestação de contas.",
  },
  {
    name: "Plano Social",
    price: "valor reduzido, cortesia estratégica ou patrocínio",
    audience: "Entidades pequenas, comunitárias ou cases de alto valor social.",
    includes: ["limites por evento", "implantação em grupo", "suporte comunitário", "possibilidade de case"],
    bestFor: "Manter propósito beneficente sem desvalorizar a solução.",
  },
  {
    name: "Bingo no Controle",
    price: "módulo standalone ou combinado ao plano do evento",
    audience: "Eventos com bingo, quinas, cartela cheia, prendas e necessidade de clareza das pedras sorteadas.",
    includes: ["rodadas", "várias quinas", "cartela cheia opcional", "prendas com fotos", "chamada de bingo", "painel público", "opção com globo, TVs e som"],
    bestFor: "Lead que entra pelo bingo e pode conhecer o Festa no Controle completo.",
  },
];

export type CommercialOffer = {
  code: string;
  title: string;
  whenToUse: string;
  conditions: string[];
};

export const commercialOffers: CommercialOffer[] = [
  {
    code: "A",
    title: "Piloto completo sem custo com contrapartida",
    whenToUse: "Cliente estratégico, com alto potencial de case, depoimento e indicação.",
    conditions: ["autorização para uso como case", "depoimento", "reuniões de feedback", "permissão para medir resultados"],
  },
  {
    code: "B",
    title: "Módulo essencial gratuito para Cliente Fundador",
    whenToUse: "Oferta padrão para reduzir risco, provar valor e evitar desvalorizar módulos avançados.",
    conditions: ["pedidos por garçom", "caixa", "fechamento sem redigitação", "módulos extras pagos depois"],
  },
  {
    code: "C",
    title: "Taxa simbólica",
    whenToUse: "Lead interessado, mas que precisa demonstrar compromisso para reservar implantação.",
    conditions: ["R$ 197, R$ 297 ou R$ 497", "escopo fechado", "agenda de implantação definida"],
  },
  {
    code: "D",
    title: "Primeira edição piloto, próxima edição comercial",
    whenToUse: "Evento sazonal em que o cliente quer validar sem decidir contrato agora.",
    conditions: ["uso piloto na primeira edição", "proposta comercial para próxima edição", "pós-evento obrigatório"],
  },
];
