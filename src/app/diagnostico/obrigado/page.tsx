import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function DiagnosticThanksPage({
  searchParams,
}: {
  searchParams?: Promise<{ perfil?: string; oferta?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const perfil = params.perfil ?? "Organização em evolução";
  const oferta = params.oferta ?? "Diagnóstico gratuito da operação da festa";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#f7fee7_100%)] px-5 py-12">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-amber-200 bg-white p-8 text-center shadow-xl">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h1 className="mt-5 text-3xl font-black text-green-950">Diagnóstico registrado com sucesso.</h1>
        <p className="mt-4 leading-7 text-stone-700">
          O lead já foi criado no CRM comercial do Festa no Controle com perfil dominante e próxima ação sugerida.
        </p>
        <div className="mt-6 grid gap-3 rounded-2xl bg-amber-50 p-5 text-left">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">Resultado inicial</p>
          <p className="text-lg font-black text-green-950">Perfil: {perfil}</p>
          <p className="text-stone-700">Oferta sugerida: {oferta}</p>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/admin/comercial/leads" className="rounded-full bg-green-800 px-6 py-3 text-sm font-black text-white hover:bg-green-900" prefetch={false}>
            Abrir CRM comercial
          </Link>
          <Link href="/diagnostico" className="rounded-full border border-amber-300 bg-white px-6 py-3 text-sm font-black text-green-950 hover:bg-amber-50" prefetch={false}>
            Novo diagnóstico
          </Link>
        </div>
      </section>
    </main>
  );
}
