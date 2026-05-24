import Link from "next/link";

export function LogoFestaNoControle() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Festa no Controle" prefetch={false}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-700 to-green-950 text-[0.72rem] font-black tracking-tight text-white shadow-md ring-2 ring-amber-200/80 transition group-hover:scale-105">
        FNC
      </span>
      <span className="leading-none">
        <span className="block text-xl font-black tracking-tight text-green-950 sm:text-2xl">Festa no Controle</span>
        <span className="mt-1 block text-[0.63rem] font-black uppercase tracking-[0.2em] text-amber-700">
          Eventos comunitários
        </span>
      </span>
    </Link>
  );
}
