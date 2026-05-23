import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, ClipboardList, HandCoins, HeartHandshake, QrCode, ShieldCheck, UsersRound } from "lucide-react";

const pains = [
  "Caixa redigitando pedido por pedido",
  "Fila grande no fechamento da conta",
  "Compra de comida feita no chute",
  "Voluntários sobrecarregados no dia",
  "Convites, Pix e comprovantes em controles separados",
  "Prestação de contas trabalhosa depois do evento",
];

const waves = [
  {
    title: "1. Operação do dia",
    description: "Garçom registra, ficha/código acompanha o pedido e o caixa confere sem redigitar tudo de novo.",
    icon: ClipboardList,
  },
  {
    title: "2. Receita antecipada",
    description: "Convites, combos, comprovantes Pix e campanhas simples por WhatsApp para entrar na festa com caixa previsto.",
    icon: HandCoins,
  },
  {
    title: "3. Planejamento",
    description: "Previsão de público, consumo, compras, preparo, estoque e necessidade de voluntários por função.",
    icon: UsersRound,
  },
  {
    title: "4. Prestação de contas",
    description: "Relatórios de vendas, horários de pico, sobras, faltas e aprendizados para a próxima edição.",
    icon: BarChart3,
  },
];

const segments = ["Festa Junina", "Quermesse", "Bingo", "Bazar", "Almoço beneficente", "Evento escolar", "Evento religioso", "Clube ou associação"];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fef3c7,transparent_32%),linear-gradient(180deg,#fffbeb_0%,#fff7ed_48%,#f7fee7_100%)]">
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:py-16">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-green-200 bg-white/80 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-green-800 shadow-sm">
            Digital onde ajuda. Papel onde ainda faz sentido.
          </p>
          <h1 className="text-4xl font-black leading-tight text-green-950 sm:text-5xl lg:text-6xl">
            Sua festa comunitária com menos correria, mais receita antecipada e caixa sem retrabalho.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
            O Festa no Controle é uma plataforma para vender, planejar, operar e prestar contas de festas beneficentes,
            escolares, religiosas e associativas — respeitando a realidade de voluntários, WhatsApp, Pix manual, fichas e plano B.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-green-900"
              prefetch={false}
            >
              Fazer diagnóstico gratuito <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/festa-junina"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300 bg-white px-6 py-3 text-sm font-black text-green-950 shadow-sm transition hover:bg-amber-50"
              prefetch={false}
            >
              Ver Demo Festa Junina
            </Link>
          </div>
        </div>

        <aside className="self-start rounded-[2rem] border border-amber-200 bg-white/90 p-6 shadow-xl lg:mt-0">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-2xl bg-green-100 p-3 text-green-900">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Promessa prática</p>
              <h2 className="text-2xl font-black text-green-950">Comece pequeno, pense grande.</h2>
            </div>
          </div>
          <p className="leading-7 text-stone-700">
            A primeira implantação pode resolver só o fluxo mais dolorido: garçom registra, caixa encontra o pedido e fecha sem reconstruir tudo. Depois, a festa evolui por ondas.
          </p>
          <div className="mt-6 grid gap-3">
            {pains.map((pain) => (
              <div key={pain} className="flex items-start gap-3 rounded-2xl bg-amber-50 p-3 text-sm font-bold text-stone-800">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-800" />
                {pain}
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Produto por ondas</p>
          <h2 className="mt-2 text-3xl font-black text-green-950">Não é só ingresso online. É operação de festa ponta a ponta.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {waves.map((wave) => {
            const Icon = wave.icon;
            return (
              <article key={wave.title} className="rounded-[1.5rem] border border-amber-200 bg-white p-5 shadow-sm">
                <span className="mb-4 inline-flex rounded-2xl bg-amber-100 p-3 text-amber-800">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-black text-green-950">{wave.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-700">{wave.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-[2rem] bg-green-950 p-6 text-white shadow-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-200">Para quem foi pensado</p>
              <h2 className="mt-2 text-3xl font-black">Festas feitas por gente que cuida de tudo no voluntariado.</h2>
              <p className="mt-4 leading-7 text-amber-50">
                O sistema assume que nem todo evento nasce digital, que WhatsApp é canal principal e que a operação precisa ter plano B.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {segments.map((segment) => (
                <span key={segment} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/15">
                  {segment}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-6 rounded-[2rem] border border-green-900/10 bg-white p-6 shadow-xl md:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Programa Cliente Fundador</p>
            <h2 className="mt-2 text-3xl font-black text-green-950">Módulo essencial sem custo para os primeiros cases estratégicos.</h2>
            <p className="mt-4 leading-7 text-stone-700">
              A primeira oferta comercial pode validar o fluxo de maior impacto: garçom registra, caixa encontra o pedido e a coordenação acompanha a operação sem redigitar tudo no fechamento.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-amber-50 p-4">
              <p className="text-sm font-black text-green-950">Inclui</p>
              <p className="mt-2 text-sm leading-6 text-stone-700">Pedidos, garçom, caixa, ficha/código e relatório simples.</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4">
              <p className="text-sm font-black text-green-950">Contrapartida</p>
              <p className="mt-2 text-sm leading-6 text-stone-700">Feedback, autorização de case e compromisso com teste real.</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4">
              <p className="text-sm font-black text-green-950">Evolução</p>
              <p className="mt-2 text-sm leading-6 text-stone-700">Convites, combos, planejamento e prestação entram como próxima proposta.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-amber-200 bg-white p-5 shadow-sm">
            <QrCode className="mb-3 h-7 w-7 text-green-800" />
            <h3 className="font-black text-green-950">Diagnóstico gratuito</h3>
            <p className="mt-2 text-sm leading-6 text-stone-700">Capture dores reais da entidade e gere uma próxima ação comercial clara.</p>
          </div>
          <div className="rounded-[1.5rem] border border-amber-200 bg-white p-5 shadow-sm">
            <HeartHandshake className="mb-3 h-7 w-7 text-green-800" />
            <h3 className="font-black text-green-950">Oferta consultiva</h3>
            <p className="mt-2 text-sm leading-6 text-stone-700">Venda implantação por ondas, sem assustar a coordenação nem forçar mudança cultural no dia da festa.</p>
          </div>
          <div className="rounded-[1.5rem] border border-amber-200 bg-white p-5 shadow-sm">
            <BarChart3 className="mb-3 h-7 w-7 text-green-800" />
            <h3 className="font-black text-green-950">CRM comercial</h3>
            <p className="mt-2 text-sm leading-6 text-stone-700">Cada lead entra com status, prioridade, perfil dominante e próxima ação para follow-up.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
