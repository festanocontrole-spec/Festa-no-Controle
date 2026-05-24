import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, HandCoins, PlayCircle, Trophy, UsersRound } from "lucide-react";

const demoBlocks = [
  {
    title: "Garçom registra o pedido",
    description: "O pedido nasce estruturado. O caixa não precisa reconstruir tudo no fechamento.",
    icon: ClipboardList,
  },
  {
    title: "Convites e combos antecipam receita",
    description: "A coordenação enxerga público provável e consumo antes do dia da festa.",
    icon: HandCoins,
  },
  {
    title: "Voluntários e compras com mais previsão",
    description: "Dados de público e consumo ajudam a orientar escala, preparo e insumos.",
    icon: UsersRound,
  },
  {
    title: "Bingo no Controle como módulo opcional",
    description: "Venda cartelas, organize rodadas, prendas, chamadas e conferências de bingo.",
    icon: Trophy,
  },
];

export default function DemoFestaJuninaPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_55%,#f7fee7_100%)]">
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-14">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-green-900">
              Demo Festa Junina
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-green-950 md:text-6xl">
              Veja como uma festa pode começar simples e evoluir sem assustar voluntários.
            </h1>
            <p className="mt-5 leading-8 text-stone-700">
              A demonstração comercial mostra a lógica do Festa no Controle: resolver primeiro o ponto mais dolorido e depois evoluir para convites, combos, planejamento, bingo e prestação de contas.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/diagnostico" className="inline-flex items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-black text-white hover:bg-green-900" prefetch={false}>
                Fazer diagnóstico gratuito <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/gestao" className="inline-flex items-center justify-center rounded-full border border-amber-300 bg-white px-6 py-3 text-sm font-black text-green-950 hover:bg-amber-50" prefetch={false}>
                Entender a área de Gestão
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-xl">
            <div className="flex items-start gap-3">
              <span className="rounded-2xl bg-amber-100 p-3 text-amber-800">
                <PlayCircle className="h-7 w-7" />
              </span>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">Vídeo recomendado</p>
                <h2 className="text-2xl font-black text-green-950">Festa Junina sem correria</h2>
              </div>
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-dashed border-amber-300 bg-amber-50 p-6 text-center">
              <p className="font-black text-green-950">Cole aqui o vídeo curto do YouTube.</p>
              <p className="mt-2 text-sm leading-6 text-stone-700">
                Enquanto o vídeo não estiver publicado, esta página já comunica a proposta e evita erro no link do menu.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {demoBlocks.map((block) => {
            const Icon = block.icon;
            return (
              <article key={block.title} className="rounded-[1.5rem] border border-amber-200 bg-white p-5 shadow-sm">
                <Icon className="mb-3 h-7 w-7 text-green-800" />
                <h2 className="font-black text-green-950">{block.title}</h2>
                <p className="mt-2 text-sm leading-6 text-stone-700">{block.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-[2rem] bg-green-950 p-6 text-white shadow-xl md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-center">
            <div>
              <h2 className="text-3xl font-black">O objetivo da demo não é mostrar todas as telas.</h2>
              <p className="mt-3 leading-7 text-amber-50">
                O objetivo é fazer o responsável perceber que a festa dele pode ter menos fila, menos retrabalho e mais previsibilidade sem mudar tudo de uma vez.
              </p>
            </div>
            <div className="grid gap-3 text-sm font-bold">
              <p className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-amber-200" /> Diagnóstico primeiro.</p>
              <p className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-amber-200" /> Demo curta depois.</p>
              <p className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-amber-200" /> Vídeos tutoriais só após virar cliente.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
