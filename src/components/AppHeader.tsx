"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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

const landingAnchors = [
  { href: "#como-ajuda", label: "Como ajuda" },
  { href: "#diagnostico", label: "Diagnóstico" },
  { href: "#videos", label: "Vídeos" },
  { href: "#bingo", label: "Bingo" },
  { href: "#cliente-fundador", label: "Cliente Fundador" },
  { href: "#gestao", label: "Gestão" },
];

function getHeaderContext(pathname: string): HeaderContext {
  if (pathname.startsWith("/diagnostico/obrigado")) {
    return {
      eyebrow: "Diagnóstico gratuito",
      title: "Próximos passos",
      description: "Obrigado. Agora mostramos o caminho mais seguro para sua festa.",
    };
  }

  if (pathname.startsWith("/diagnostico")) {
    return {
      eyebrow: "Diagnóstico gratuito",
      title: "Descubra onde sua festa pode melhorar",
      description: "Receba uma leitura inicial das dores, riscos e oportunidades do seu evento.",
    };
  }

  if (pathname.startsWith("/gestao")) {
    return {
      eyebrow: "Área exclusiva",
      title: "Gestão do Festa no Controle",
      description: "Acesso restrito aos responsáveis pela operação e atendimento.",
    };
  }

  if (pathname.startsWith("/admin/comercial")) {
    return {
      eyebrow: "Gestão interna",
      title: "Atendimento e oportunidades",
      description: "Diagnósticos, prioridades, mensagens e próximos contatos.",
    };
  }

  if (pathname.startsWith("/demo-festa-junina") || pathname.startsWith("/festa-junina")) {
    return {
      eyebrow: "Demonstração",
      title: "Demo Festa Junina",
      description: "Veja como a operação por ondas reduz correria, fila e retrabalho.",
    };
  }

  return defaultContext;
}

function navClass(active: boolean, emphasis = false) {
  if (emphasis) {
    return [
      "inline-flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-xs font-black transition focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 sm:h-10 sm:px-5 sm:text-sm",
      active ? "bg-green-900 text-white shadow-sm" : "bg-green-800 text-white shadow-sm hover:bg-green-900",
    ].join(" ");
  }

  return [
    "inline-flex h-9 shrink-0 items-center justify-center rounded-full px-3 text-xs font-black transition focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 sm:h-10 sm:px-4 sm:text-sm",
    active ? "bg-green-900 text-white shadow-sm" : "text-stone-700 hover:bg-white hover:text-green-950",
  ].join(" ");
}

export function AppHeader() {
  const pathname = usePathname() || "/";
  const context = getHeaderContext(pathname);
  const showLandingAnchors = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b-4 border-blue-700 bg-amber-50/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-amber-50/85">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:px-5">
        <div className="min-w-0 flex-1 sm:flex-none">
          <LogoFestaNoControle />
        </div>

        <div className="hidden min-w-0 flex-1 border-l border-amber-300/80 pl-4 md:block">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-amber-700">{context.eyebrow}</p>
          <p className="truncate text-sm font-black text-green-950">{context.title}</p>
          <p className="truncate text-xs font-medium text-stone-600">{context.description}</p>
        </div>

        <nav className="hidden shrink-0 items-center gap-1 md:flex" aria-label="Navegação principal">
          <Link href="/diagnostico" className={navClass(pathname.startsWith("/diagnostico"), true)} prefetch={false}>
            Diagnóstico gratuito
          </Link>
          <Link href="/demo-festa-junina" className={navClass(pathname.startsWith("/demo-festa-junina") || pathname.startsWith("/festa-junina"))} prefetch={false}>
            Demo Festa Junina
          </Link>
          <Link href="/gestao" className={navClass(pathname.startsWith("/gestao") || pathname.startsWith("/admin/comercial"))} prefetch={false}>
            Gestão
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <Link href="/diagnostico" className={navClass(pathname.startsWith("/diagnostico"), true)} prefetch={false}>
            Diagnóstico gratuito
          </Link>
          <details className="group relative">
            <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full border border-amber-200 bg-white text-green-950 shadow-sm [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </summary>
            <div className="absolute right-0 mt-2 grid min-w-56 gap-2 rounded-2xl border border-amber-200 bg-white p-3 shadow-xl">
              <Link href="/demo-festa-junina" className="rounded-xl px-3 py-2 text-sm font-black text-stone-700 hover:bg-amber-50" prefetch={false}>
                Demo Festa Junina
              </Link>
              <Link href="/gestao" className="rounded-xl px-3 py-2 text-sm font-black text-stone-700 hover:bg-amber-50" prefetch={false}>
                Gestão
              </Link>
            </div>
          </details>
        </div>
      </div>

      {showLandingAnchors ? (
        <nav className="border-t border-amber-200/70 bg-white/80" aria-label="Tópicos da página">
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-3 py-2 sm:px-5">
            {landingAnchors.map((anchor) => (
              <a
                key={anchor.href}
                href={anchor.href}
                className="inline-flex shrink-0 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-black text-green-950 shadow-sm hover:bg-amber-100"
              >
                {anchor.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
