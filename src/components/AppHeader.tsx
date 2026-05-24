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
      "rounded-full px-4 py-2 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2",
      active ? "bg-green-900 text-white shadow-sm" : "bg-green-800 text-white shadow-sm hover:bg-green-900",
    ].join(" ");
  }

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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2">
        <div className="flex min-w-0 items-center gap-4">
          <LogoFestaNoControle />
          <div className="hidden min-w-0 border-l border-amber-300/80 pl-4 lg:block">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-amber-700">{context.eyebrow}</p>
            <p className="truncate text-sm font-black text-green-950">{context.title}</p>
            <p className="truncate text-xs font-medium text-stone-600">{context.description}</p>
          </div>
        </div>

        <nav className="flex shrink-0 items-center gap-1 overflow-x-auto text-sm" aria-label="Navegação principal">
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
      </div>
    </header>
  );
}
