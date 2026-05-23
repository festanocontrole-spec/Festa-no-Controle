"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoFestaNoControle } from "./LogoFestaNoControle";

type HeaderContext = {
  eyebrow: string;
  title: string;
  description: string;
};

const defaultContext: HeaderContext = {
  eyebrow: "Plataforma comercial",
  title: "Festa no Controle",
  description: "Venda, operação e prestação de contas para festas comunitárias.",
};

function getHeaderContext(pathname: string): HeaderContext {
  if (pathname.startsWith("/diagnostico/obrigado")) {
    return {
      eyebrow: "Diagnóstico enviado",
      title: "Próxima ação comercial",
      description: "Lead registrado no CRM para follow-up consultivo.",
    };
  }

  if (pathname.startsWith("/diagnostico")) {
    return {
      eyebrow: "Captação consultiva",
      title: "Diagnóstico gratuito",
      description: "Pesquisa de maturidade da festa e geração de lead.",
    };
  }

  if (pathname.startsWith("/admin/comercial")) {
    return {
      eyebrow: "Gestão comercial",
      title: "CRM de leads",
      description: "Diagnósticos, prioridades e próximos contatos.",
    };
  }

  if (pathname.startsWith("/festa-junina")) {
    return {
      eyebrow: "Ambiente demonstrativo",
      title: "Demo Festa Junina",
      description: "Fluxo de cardápio, pedidos, garçom e caixa.",
    };
  }

  return defaultContext;
}

function navClass(active: boolean) {
  return [
    "rounded-full px-4 py-2 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2",
    active ? "bg-green-900 text-white shadow-sm" : "text-stone-700 hover:bg-white hover:text-green-950",
  ].join(" ");
}

export function AppHeader() {
  const pathname = usePathname() || "/";
  const context = getHeaderContext(pathname);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-blue-700 bg-amber-50/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-amber-50/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5">
        <div className="flex min-w-0 items-center gap-4">
          <LogoFestaNoControle />
          <div className="hidden min-w-0 border-l border-amber-300/80 pl-4 lg:block">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-amber-700">
              {context.eyebrow}
            </p>
            <p className="truncate text-sm font-black text-green-950">{context.title}</p>
            <p className="truncate text-xs font-medium text-stone-600">{context.description}</p>
          </div>
        </div>

        <nav className="flex shrink-0 items-center gap-1 overflow-x-auto text-sm" aria-label="Navegação principal">
          <Link href="/diagnostico" className={navClass(pathname.startsWith("/diagnostico"))} prefetch={false}>
            Diagnóstico gratuito
          </Link>
          <Link href="/festa-junina" className={navClass(pathname.startsWith("/festa-junina"))} prefetch={false}>
            Demo Festa Junina
          </Link>
          <Link href="/admin/comercial/leads" className={navClass(pathname.startsWith("/admin/comercial"))} prefetch={false}>
            CRM
          </Link>
        </nav>
      </div>
    </header>
  );
}
