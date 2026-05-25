import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  perfil?: string;
  oferta?: string;
  resumo?: string;
  publico?: string;
  caixa?: string;
  equipe?: string;
  planejamento?: string;
  bingo?: string;
  followup?: string;
}>;

function value(value: string | undefined, fallback: string) {
  return value && value.trim().length > 0 ? value : fallback;
}

export default async function DiagnosticThanksPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  const perfil = value(params.perfil, "Organização em evolução");
  const oferta = value(params.oferta, "Diagnóstico gratuito da operação da festa");
  const resumo = value(
    params.resumo,
    "Mapear as principais dores e escolher uma primeira onda de implantação simples, segura e com plano B.",
  );

  const simulationItems = [
    value(params.publico, "Público ainda não estimado."),
    value(params.caixa, "Dimensionar caixa e conferência para reduzir fila no pico."),
    value(params.equipe, "Organizar voluntários/prestadores por função, horário e ponto de atendimento."),
    value(params.planejamento, "Usar dados para reduzir compra no chute, falta/sobra de comida e pressão no dia."),
    params.bingo,
  ].filter(Boolean) as string[];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_55%,#f7fee7_100%)]">
      <section className="mx-auto max-w-5xl px-4 pt-8 pb-14 sm:px-5 md:pt-12">
        <div className="rounded-[2rem] border border-green-200 bg-white p-6 shadow-sm md:p-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-green-900">
            <CheckCircle2 className="h-4 w-4" /> Diagnóstico recebido
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight text-green-950 md:text-5xl">
            Obrigado. Já temos uma primeira leitura para orientar sua festa.
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-stone-700">
            O diagnóstico não é uma proposta fechada. Ele aponta onde parece haver mais ganho de controle, menos correria e melhor uso do Festa no Controle ou do Bingo no Controle.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Leitura inicial</p>
            <h2 className="mt-3 text-2xl font-black text-green-950">{perfil}</h2>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">Caminho sugerido</p>
                <p className="mt-1 font-black text-green-950">{oferta}</p>
              </div>
              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-green-800">Por que isso ajuda</p>
                <p className="mt-1 text-sm leading-6 text-stone-700">{resumo}</p>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-amber-700">
              <ClipboardList className="h-4 w-4" /> Simulação inicial
            </p>
            <h2 className="mt-3 text-2xl font-black text-green-950">Premissas para começar a conversa</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-stone-700">
              {simulationItems.map((item) => (
                <li key={item} className="rounded-2xl bg-amber-50 p-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 rounded-[2rem] border border-green-200 bg-green-50 p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-green-800">O que acontece agora</p>
          <h2 className="mt-2 text-2xl font-black text-green-950">Em breve alguém do Festa no Controle entrará em contato.</h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-700">
            Vamos analisar suas respostas e sugerir o caminho mais simples para reduzir correria, fila, retrabalho, dúvidas no bingo ou dificuldades de prestação de contas. Enquanto isso, o próximo passo recomendado é ver a Demo Festa Junina.
          </p>
        </div>

        <div className="mt-6 rounded-[2rem] border border-green-200 bg-green-950 p-6 text-white shadow-sm md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-green-100">
                <Sparkles className="h-4 w-4" /> Próximo passo recomendado
              </p>
              <h2 className="mt-3 text-2xl font-black">Veja a Demo Festa Junina e compare com a realidade do seu evento.</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-green-50">
                A demonstração mostra como começar pelo fluxo mais simples e evoluir para convites, combos, planejamento, Bingo no Controle e prestação de contas.
              </p>
            </div>
            <Link href="/demo-festa-junina" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-green-950 hover:bg-green-50" prefetch={false}>
              Ver demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
