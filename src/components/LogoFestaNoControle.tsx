import Link from "next/link";

export function LogoFestaNoControle() {
  return (
    <Link
      href="/"
      className="group flex min-w-0 items-center gap-2 sm:gap-3"
      aria-label="Festa no Controle"
      prefetch={false}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-700 to-green-950 text-[0.62rem] font-black tracking-tight text-white shadow-md ring-2 ring-amber-200/80 transition group-hover:scale-105 sm:h-11 sm:w-11 sm:text-[0.72rem]">
        FNC
      </span>
      <span className="min-w-0 leading-none">
        <span className="block max-w-[7rem] text-lg font-black leading-[1.05] tracking-tight text-green-950 sm:max-w-none sm:text-2xl">
          Festa no Controle
        </span>
        <span className="mt-1 hidden text-[0.6rem] font-black uppercase tracking-[0.18em] text-amber-700 sm:block sm:text-[0.63rem] sm:tracking-[0.2em]">
          Eventos comunitários
        </span>
      </span>
    </Link>
  );
}
