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
  "Caixa com menos retrabalho: o pedido chega estruturado para conferência e fechamento.",
  "Fila menor no fechamento: a equipe não precisa reconstruir o consumo do zero.",
  "Convites, Pix, comprovantes e combos com histórico mais organizado.",
  "Compras e preparo com mais previsibilidade, reduzindo falta e sobra de itens.",
  "Voluntários com fluxos simples e plano B para o dia do evento.",
  "Prestação de contas mais clara para diretoria, presidência e comunidade.",
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
    description: "Veja como reduzir a dor do caixa redigitando pedidos e transformar o fechamento em conferência.",
    env: "NEXT_PUBLIC_YOUTUBE_FESTA_SEM_CORRERIA_ID",
  },
  {
    title: "Bingo sem dúvida nas pedras sorteadas",
    description: "Entenda como o público acompanha pelo celular ou TV enquanto a coordenação confere chamadas com mais segurança.",
    env: "NEXT_PUBLIC_YOUTUBE_BINGO_SEM_DUVIDA_ID",
  },
  {
    title: "Programa Cliente Fundador",
    description: "Saiba como eventos selecionados podem testar o módulo essencial sem custo na primeira implantação.",
    env: "NEXT_PUBLIC_YOUTUBE_CLIENTE_FUNDADOR_ID",
  },
  {
    title: "Como funciona em 1 minuto",
    description: "Uma visão rápida da jornada: diagnóstico, implantação por ondas, operação e prestação de contas.",
    env: "NEXT_PUBLIC_YOUTUBE_COMO_FUNCIONA_ID",
  },
] as const;

const segments = ["Festa Junina", "Quermesse", "Bingo", "Bazar", "Almoço beneficente", "Evento escolar", "Evento religioso", "Clube ou associação"];

function getYoutubeId(envName: string) {
  return process.env[envName] || "";
}

function VideoCard({ video }: { video: (typeof videoIdeas)[number] }) {
  const youtubeId = getYoutubeId(video.env);

  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-amber-200 bg-white shadow-sm">
      {youtubeId ? (
        <div className="aspect-video bg-stone-950">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-green-950 to-green-800 text-white">
          <div className="text-center">
            <PlayCircle className="mx-auto mb-2 h-10 w-10" />
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-100">Vídeo em preparação</p>
          </div>
        </div>
      )}
      <div className="p-5">
        <h3 className="font-black text-green-950">{video.title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-700">{video.description}</p>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fef3c7,transparent_32%),linear-gradient(180deg,#fffbeb_0%,#fff7ed_48%,#f7fee7_100%)]">
      <section id="topo" className="mx-auto grid max-w-6xl scroll-mt-32 gap-7 px-4 pt-6 pb-10 sm:px-5 md:pt-9 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-green-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-green-800 shadow-sm sm:text-sm sm:tracking-[0.2em]">
            Digital onde ajuda. Papel onde ainda faz sentido.
          </p>
          <h1 className="text-3xl font-black leading-tight text-green-950 sm:text-5xl lg:text-6xl">
            Sua festa com menos fila, menos improviso e mais controle antes, durante e depois.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-700 sm:text-lg sm:leading-8">
            O Festa no Controle ajuda eventos comunitários e beneficentes a vender, planejar, operar e prestar contas sem depender de planilhas soltas, fichas perdidas e caixa redigitando tudo no fim da noite.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-green-900"
              prefetch={false}
            >
              Fazer diagnóstico gratuito <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#videos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300 bg-white px-6 py-3 text-sm font-black text-green-950 shadow-sm transition hover:bg-amber-50"
            >
              Ver vídeos rápidos
            </a>
          </div>
        </div>

        <aside className="self-start rounded-[2rem] border border-amber-200 bg-white/90 p-5 shadow-xl sm:p-6">
          <div className="mb-5 flex items-start gap-3">
            <span className="rounded-2xl bg-green-100 p-3 text-green-900">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700 sm:text-sm">Promessa prática</p>
              <h2 className="text-xl font-black text-green-950 sm:text-2xl">Comece pelo que mais dói. Evolua por ondas.</h2>
            </div>
          </div>
          <p className="leading-7 text-stone-700">
            O diagnóstico gratuito mostra o melhor ponto de partida: caixa, pedidos, convites, combos, bingo, voluntários, compras ou prestação de contas.
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

      <section id="como-ajuda" className="mx-auto max-w-6xl scroll-mt-36 px-4 py-8 sm:px-5 sm:py-10">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Produto por ondas</p>
          <h2 className="mt-2 text-2xl font-black text-green-950 sm:text-3xl">Não é só ingresso online. É operação de festa ponta a ponta.</h2>
          <p className="mt-3 leading-7 text-stone-700">
            A diferença está em respeitar a realidade do evento comunitário: voluntários, WhatsApp, Pix manual, fichas, internet instável e necessidade de plano B.
          </p>
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

      <section id="diagnostico" className="mx-auto max-w-6xl scroll-mt-36 px-4 py-8 sm:px-5 sm:py-10">
        <div className="rounded-[1.5rem] border border-green-200 bg-white/90 p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-green-800">Diagnóstico gratuito</p>
              <h3 className="mt-1 text-2xl font-black text-green-950">Descubra o melhor caminho para organizar sua próxima festa.</h3>
              <p className="mt-2 leading-7 text-stone-700">
                Em poucos minutos, você informa o tipo de evento, principais dores e data prevista. A resposta indica quais soluções fazem mais sentido agora.
              </p>
            </div>
            <Link href="/diagnostico" className="inline-flex items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-black text-white hover:bg-green-900" prefetch={false}>
              Fazer diagnóstico gratuito <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="videos" className="mx-auto max-w-6xl scroll-mt-36 px-4 py-8 sm:px-5 sm:py-10">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Vídeos rápidos</p>
          <h2 className="mt-2 text-2xl font-black text-green-950 sm:text-3xl">Veja em poucos segundos como reduzir correria, dúvida e retrabalho.</h2>
          <p className="mt-3 leading-7 text-stone-700">
            Os vídeos mostram situações comuns em festas comunitárias e bingos beneficentes — e como a organização por ondas ajuda a equipe a agir com mais segurança.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {videoIdeas.map((video) => (
            <VideoCard key={video.title} video={video} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-10">
        <div className="rounded-[2rem] bg-green-950 p-6 text-white shadow-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-200">Para quem foi pensado</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">Festas feitas por gente que cuida de tudo no voluntariado.</h2>
              <p className="mt-4 leading-7 text-amber-50">
                A plataforma foi criada para eventos que precisam vender, atender, conferir, prestar contas e ainda lidar com mudanças no dia da festa.
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

      <section id="bingo" className="mx-auto max-w-6xl scroll-mt-36 px-4 py-8 sm:px-5 sm:py-10">
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

      <section id="cliente-fundador" className="mx-auto max-w-6xl scroll-mt-36 px-4 py-8 sm:px-5 sm:py-10">
        <div className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Programa Cliente Fundador</p>
              <h2 className="mt-2 text-2xl font-black text-green-950 sm:text-3xl">Primeira implantação do módulo essencial sem custo para eventos selecionados.</h2>
              <p className="mt-4 leading-7 text-stone-700">
                Eventos selecionados podem testar o fluxo essencial em uso real: pedidos, garçom, caixa e fechamento com menos retrabalho. Em troca, buscamos feedback prático e autorização para transformar os aprendizados em case.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-amber-50 p-5">
              <HeartHandshake className="mb-3 h-8 w-8 text-green-800" />
              <p className="font-black text-green-950">Uma oportunidade para organizar seu evento com baixo risco.</p>
              <p className="mt-2 text-sm leading-6 text-stone-700">
                Se o seu evento tem data prevista, equipe comprometida e dor clara no caixa, pedidos ou bingo, ele pode ser candidato ao piloto essencial sem custo.
              </p>
              <Link href="/diagnostico" className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-800 px-5 py-3 text-sm font-black text-white hover:bg-green-900" prefetch={false}>
                Candidatar meu evento <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="gestao" className="mx-auto max-w-6xl scroll-mt-36 px-4 py-8 pb-16 sm:px-5 sm:py-10 sm:pb-20">
        <div className="rounded-[2rem] border border-green-200 bg-white/90 p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-green-800">Gestão e atendimento</p>
              <h2 className="mt-2 text-2xl font-black text-green-950 sm:text-3xl">Depois do diagnóstico, o próximo contato já nasce com contexto.</h2>
              <p className="mt-3 leading-7 text-stone-700">
                A área de Gestão acompanha o histórico do lead, solução indicada, mensagens, proposta, acesso ao evento, pós-venda e oportunidades de indicação para próximos eventos.
              </p>
            </div>
            <Link href="/gestao" className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-6 py-3 text-sm font-black text-green-950 hover:bg-amber-100" prefetch={false}>
              Entender a área de Gestão <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
