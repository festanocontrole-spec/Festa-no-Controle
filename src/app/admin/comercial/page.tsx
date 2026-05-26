import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CommercialAdminHero, CommercialAdminNav } from "@/components/CommercialAdminNav";
import { commercialManagementItems, commercialPlans } from "@/lib/commercialCatalog";
import { createSupabaseAdminClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

async function getCommercialStats() {
  const supabase = createSupabaseAdminClient();
  const [leadsResult, clientsResult, proposalsResult] = await Promise.all([
    supabase.from("commercial_leads").select("id, status, priority", { count: "exact", head: false }).limit(200),
    supabase.from("commercial_clients").select("id", { count: "exact", head: true }),
    supabase.from("commercial_proposals").select("id", { count: "exact", head: true }),
  ]);

  const leads = leadsResult.data ?? [];
  return {
    leads: leadsResult.count ?? leads.length,
    highPriority: leads.filter((lead) => ["high", "urgent"].includes(String(lead.priority))).length,
    clients: clientsResult.count ?? 0,
    proposals: proposalsResult.count ?? 0,
  };
}

export default async function CommercialAdminPage() {
  const stats = await getCommercialStats().catch(() => ({ leads: 0, highPriority: 0, clients: 0, proposals: 0 }));

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_55%,#f7fee7_100%)] lg:pl-72">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-5 md:py-8">
        <CommercialAdminHero
          eyebrow="Gestão interna"
          title="Painel comercial do Festa no Controle"
          description="Acompanhe o caminho completo: diagnóstico, lead, proposta, plano contratado, pagamento, acesso, pós-venda e próxima edição. A plataforma deve comportar vários clientes e eventos sem criar uma instalação separada para cada um."
        />

        <CommercialAdminNav currentHref="/admin/comercial" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-stone-600">Diagnósticos recebidos</p>
            <p className="mt-2 text-3xl font-black text-green-950">{stats.leads}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-stone-600">Prioridade alta/urgente</p>
            <p className="mt-2 text-3xl font-black text-green-950">{stats.highPriority}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-stone-600">Clientes cadastrados</p>
            <p className="mt-2 text-3xl font-black text-green-950">{stats.clients}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-stone-600">Propostas</p>
            <p className="mt-2 text-3xl font-black text-green-950">{stats.proposals}</p>
          </div>
        </div>

        <section className="rounded-[2rem] border border-green-200 bg-green-950 p-6 text-white shadow-sm md:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-green-100">Decisão estratégica</p>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">Plataforma única multi-cliente, não uma instalação por cliente.</h2>
              <p className="mt-3 text-sm leading-6 text-green-50">
                A instalação separada só deve ser exceção para contrato grande, domínio próprio ou exigência de isolamento. O padrão recomendado é organização + evento + módulos contratados dentro do Festa no Controle.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 text-sm leading-6 text-green-50">
              <p className="font-black text-white">Isso evita recriar GitHub, Vercel, Supabase, e-mail, variáveis, suporte e deploy para cada cliente.</p>
              <p className="mt-2">Também permite vender o Bingo no Controle sozinho, mas mantendo o lead dentro do ecossistema da plataforma.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {commercialManagementItems.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} className="rounded-3xl border border-amber-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start gap-3">
                <span className="rounded-2xl bg-green-50 p-3 text-green-900"><item.icon className="h-5 w-5" /></span>
                <div>
                  <p className="text-lg font-black text-green-950">{item.title}</p>
                  {item.emphasis ? <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-amber-700">{item.emphasis}</p> : null}
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-700">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-green-900">Abrir <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </section>

        <section className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Planos-base</p>
          <h2 className="mt-2 text-2xl font-black text-green-950">Oferta comercial consolidada</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {commercialPlans.map((plan) => (
              <article key={plan.name} className="rounded-2xl bg-amber-50 p-4">
                <h3 className="text-lg font-black text-green-950">{plan.name}</h3>
                <p className="mt-1 font-black text-amber-800">{plan.price}</p>
                <p className="mt-2 text-sm leading-6 text-stone-700">{plan.audience}</p>
                <ul className="mt-3 grid gap-1 text-sm text-stone-700">
                  {plan.includes.slice(0, 5).map((item) => (
                    <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-800" /> {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
