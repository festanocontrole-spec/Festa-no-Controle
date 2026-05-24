import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  HandCoins,
  HeartHandshake,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  TicketCheck,
  Trophy,
  UsersRound,
} from "lucide-react";

const solvedPains = [
  "O caixa deixa de reconstruir pedido por pedido no fim da noite.",
  "A fila diminui porque o fechamento vira conferência, não redigitação.",
  "Convites, Pix, comprovantes e combos passam a ter histórico organizado.",
  "Compras e preparo deixam de depender apenas do chute da coordenação.",
  "Voluntários recebem fluxos simples, com plano B para o dia do evento.",
  "A prestação de contas fica mais clara para diretoria, presidência e comunidade.",
];

const waves = [
  {
    title: "1. Operação do dia",
    description: "Garçom registra, ficha/código acompanha o pedido e o caixa confere sem digitar tudo de novo.",
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

const videoIdeas = [
  {
    title: "Festa Junina sem correria",
    description: "Mostra a dor do caixa redigitando pedidos e a virada para garçom, ficha/código e caixa sem retrabalho.",
  },
  {
    title: "Bingo sem dúvida nas pedras sorteadas",
    description: "Mostra como participantes acompanham pelo celular ou TV, enquanto a coordenação confere chamadas com segurança.",
  },
  {
    title: "Cliente Fundador",
    description: "Explica a primeira implantação do módulo essencial sem custo para eventos selecionados.",
  },
];

const segments = ["Festa Junina", "Quermesse", "Bingo", "Bazar", "Almoço beneficente", "Evento escolar", "Evento religioso", "Clube ou associação"];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fef3c7,transparent_32%),linear-gradient(180deg,#fffbeb_0%,#fff7ed_48%,#f7fee7_100%)]">
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-12 pb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:pt-14">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-green-200 bg-white/80 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-green-800 shadow-sm">
            Digital onde ajuda. Papel onde ainda faz sentido.
          </p>
          <h1 className="text-4xl font-black leading-tight text-green-950 sm:text-5xl lg:text-6xl">
            Sua festa comunitária com menos correria, mais receita antecipada e caixa sem retrabalho.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
            O Festa no Controle ajuda a coordenação a vender, planejar, operar e prestar contas de eventos beneficentes,
            escolares, religiosos e associativos — respeitando a realidade de voluntários, WhatsApp, Pix manual, fichas e plano B.
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
              href="/demo-festa-junina"
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
              <h2 className="text-2xl font-black text-green-950">Comece pequeno, resolva o que mais dói.</h2>
            </div>
          </div>
          <p className="leading-7 text-stone-700">
            O diagnóstico mostra quais dores merecem prioridade. A primeira implantação pode começar pelo fluxo mais crítico e evoluir por ondas.
          </p>
          <div className="mt-6 grid gap-3">
            {solvedPains.map((pain) => (
              <div key={pain} className="flex items-start gap-3 rounded-2xl bg-amber-50 p-3 text-sm font-bold text-stone-800">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-800" />
                {pain}
              </div>
            ))}
          </div>
          <Link
            href="/diagnostico"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-800 px-5 py-3 text-sm font-black text-white hover:bg-green-900"
            prefetch={false}
          >
            Quero meu diagnóstico gratuito <ArrowRight className="h-4 w-4" />
          </Link>
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
        <div className="mt-8 rounded-[1.5rem] border border-green-200 bg-white/90 p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-green-800">Diagnóstico gratuito</p>
              <h3 className="mt-1 text-2xl font-black text-green-950">Descubra qual onda faz mais sentido para sua próxima festa.</h3>
            </div>
            <Link href="/diagnostico" className="inline-flex items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-black text-white hover:bg-green-900" prefetch={false}>
              Fazer diagnóstico gratuito <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
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
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Módulo adicional ou produto independente</p>
            <h2 className="mt-2 text-3xl font-black text-green-950">Bingo no Controle</h2>
            <p className="mt-4 leading-7 text-stone-700">
              Para eventos com bingo, a plataforma pode vender cartelas, organizar rodadas, cadastrar prendas com fotos e permitir que o público acompanhe as pedras pelo celular ou pela TV.
            </p>
            <div className="mt-6 grid gap-3 text-sm font-bold text-stone-800">
              <p className="flex gap-2"><Trophy className="h-5 w-5 text-amber-700" /> Rodadas com várias quinas e opção de cartela cheia.</p>
              <p className="flex gap-2"><TicketCheck className="h-5 w-5 text-amber-700" /> Cartelas vendidas junto com convites e combos do evento.</p>
              <p className="flex gap-2"><MessageCircle className="h-5 w-5 text-amber-700" /> Participante chama bingo pelo celular e a coordenação confere com mais clareza.</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-green-200 bg-green-50 p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-green-800">Dois formatos comerciais</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <article className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                <h3 className="font-black text-green-950">Somente sistema</h3>
                <p className="mt-2 text-sm leading-6 text-stone-700">
                  A coordenação usa o Bingo no Controle para registrar rodadas, prendas, pedras sorteadas, chamadas e conferências.
                </p>
              </article>
              <article className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                <h3 className="font-black text-green-950">Sistema + estrutura</h3>
                <p className="mt-2 text-sm leading-6 text-stone-700">
                  Além do sistema, o evento pode contratar globo de pedras, TVs para acompanhamento e sistema de som.
                </p>
              </article>
            </div>
            <Link href="/diagnostico" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-black text-white hover:bg-green-900" prefetch={false}>
              Quero avaliar meu evento com bingo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Vídeos curtos</p>
          <h2 className="mt-2 text-3xl font-black text-green-950">Mostre a dor antes de mostrar a tela.</h2>
          <p className="mt-3 leading-7 text-stone-700">
            Para convencer sem cair no mar vermelho de “mais um sistema”, os primeiros vídeos devem mostrar situações reais de coordenação, caixa, voluntários e bingo.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {videoIdeas.map((video) => (
            <article key={video.title} className="rounded-[1.5rem] border border-amber-200 bg-white p-5 shadow-sm">
              <PlayCircle className="mb-3 h-7 w-7 text-green-800" />
              <h3 className="font-black text-green-950">{video.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-700">{video.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 pb-16">
        <div className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Programa Cliente Fundador</p>
              <h2 className="mt-2 text-3xl font-black text-green-950">Primeira implantação do módulo essencial sem custo para eventos selecionados.</h2>
              <p className="mt-4 leading-7 text-stone-700">
                A proposta é validar o fluxo essencial em evento real: pedidos, garçom, caixa e fechamento com menos retrabalho. Em troca, o cliente fundador participa da evolução do produto com feedback e autorização de uso como case.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-amber-50 p-5">
              <HeartHandshake className="mb-3 h-8 w-8 text-green-800" />
              <p className="font-black text-green-950">Gratuito não é desvalorizado quando existe contrapartida.</p>
              <p className="mt-2 text-sm leading-6 text-stone-700">O piloto compra aprendizado, prova social e relacionamento com entidades que podem indicar o Festa no Controle.</p>
              <Link href="/diagnostico" className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-800 px-5 py-3 text-sm font-black text-white hover:bg-green-900" prefetch={false}>
                Candidatar meu evento <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
