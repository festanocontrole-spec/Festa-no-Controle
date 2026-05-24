import Link from "next/link";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";

export default async function DiagnosticThanksPage({
  searchParams,
}: {
  searchParams?: Promise<{ perfil?: string; oferta?: string; resumo?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const perfil = params.perfil ?? "Organização em evolução";
  const oferta = params.oferta ?? "Diagnóstico gratuito da operação da festa";
  const resumo = params.resumo ?? "Vamos entender seu evento e sugerir uma primeira onda simples, segura e com plano B.";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#f7fee7_100%)] px-5 pt-10 pb-14">
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-amber-200 bg-white p-8 text-center shadow-xl">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h1 className="mt-5 text-3xl font-black text-green-950">Obrigado. Seu diagnóstico gratuito foi enviado.</h1>
        <p className="mt-4 leading-7 text-stone-700">
          Recebemos suas respostas e já organizamos uma primeira leitura para indicar o caminho mais seguro para sua festa.
        </p>
        <div className="mt-6 grid gap-3 rounded-2xl bg-amber-50 p-5 text-left">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">Resultado inicial</p>
          <p className="text-lg font-black text-green-950">Perfil: {perfil}</p>
          <p className="text-stone-700">Caminho sugerido: {oferta}</p>
          <p className="text-stone-700">{resumo}</p>
        </div>

        <div className="mt-8 grid gap-4 text-left md:grid-cols-2">
          <article className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <PlayCircle className="mb-3 h-7 w-7 text-green-800" />
            <h2 className="font-black text-green-950">Veja a Demo Festa Junina</h2>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              A demonstração mostra como começar pelo fluxo mais simples e evoluir para convites, combos, planejamento e prestação de contas.
            </p>
            <Link href="/demo-festa-junina" className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-800 px-5 py-3 text-sm font-black text-white hover:bg-green-900" prefetch={false}>
              Ver demo <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
          <article className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
            <h2 className="font-black text-green-950">Próximo contato</h2>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              A recomendação é que nossa equipe faça o primeiro contato em até 15 minutos, enquanto a dor e o contexto do evento ainda estão frescos.
            </p>
            <Link href="/diagnostico" className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-3 text-sm font-black text-green-950 hover:bg-green-50" prefetch={false}>
              Complementar diagnóstico
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
