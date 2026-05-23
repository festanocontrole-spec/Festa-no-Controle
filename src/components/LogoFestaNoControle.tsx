import Link from "next/link";

type LogoFestaNoControleProps = {
  className?: string;
};

export function LogoFestaNoControle({ className = "" }: LogoFestaNoControleProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 ${className}`}
      aria-label="Ir para a página inicial do Festa no Controle"
      prefetch={false}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-green-900/15 bg-gradient-to-br from-green-900 via-green-800 to-amber-600 text-sm font-black tracking-tight text-white shadow-sm transition group-hover:scale-[1.03]">
        FNC
      </span>
      <span className="leading-none">
        <span className="block text-[1.05rem] font-black tracking-[-0.04em] text-green-950 sm:text-xl">
          Festa no Controle
        </span>
        <span className="hidden text-[0.62rem] font-black uppercase tracking-[0.18em] text-amber-700 sm:block">
          Eventos comunitários
        </span>
      </span>
    </Link>
  );
}
