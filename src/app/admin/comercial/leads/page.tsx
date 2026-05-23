import Link from "next/link";
import { CalendarClock, MessageCircle, RefreshCw } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

type CommercialLead = {
  id: string;
  organization_name: string | null;
  contact_name: string;
  contact_email: string | null;
  contact_whatsapp: string | null;
  city: string | null;
  state: string | null;
  event_type: string | null;
  expected_audience: number | null;
  next_event_date: string | null;
  main_pain: string | null;
  status: string;
  priority: string;
  next_action_at: string | null;
  next_action_note: string | null;
  internal_notes: string | null;
  created_at: string;
};

const statusLabels: Record<string, string> = {
  new: "Novo",
  contacted: "Contato feito",
  diagnostic_sent: "Diagnóstico enviado",
  demo_scheduled: "Demo agendada",
  proposal_sent: "Proposta enviada",
  won: "Ganho",
  lost: "Perdido",
  archived: "Arquivado",
};

const priorityLabels: Record<string, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
};

function formatDate(value: string | null) {
  if (!value) return "Sem data";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: value.includes("T") ? "short" : undefined }).format(new Date(value));
}

function buildWhatsAppHref(phone: string | null, name: string, organizationName: string | null, nextActionNote: string | null) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("55") ? digits : `55${digits}`;
  const message = `Olá, ${name}! Aqui é do Festa no Controle. Vi o diagnóstico ${organizationName ? `da ${organizationName}` : "da sua festa"} e acredito que podemos ajudar com: ${nextActionNote ?? "uma implantação simples por ondas"}. Podemos conversar?`;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export default async function CommercialLeadsPage() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("commercial_leads")
    .select("id, organization_name, contact_name, contact_email, contact_whatsapp, city, state, event_type, expected_audience, next_event_date, main_pain, status, priority, next_action_at, next_action_note, internal_notes, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  const leads = (data ?? []) as CommercialLead[];

  const total = leads.length;
  const pending = leads.filter((lead) => !["won", "lost", "archived"].includes(lead.status)).length;
  const highPriority = leads.filter((lead) => ["high", "urgent"].includes(lead.priority)).length;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_55%,#f7fee7_100%)]">
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-stone-600">Leads listados</p>
            <p className="mt-2 text-3xl font-black text-green-950">{total}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-stone-600">Em andamento</p>
            <p className="mt-2 text-3xl font-black text-green-950">{pending}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-stone-600">Prioridade alta/urgente</p>
            <p className="mt-2 text-3xl font-black text-green-950">{highPriority}</p>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-800">
            Não foi possível carregar os leads. Verifique se a migration 031 foi aplicada. Detalhe: {error.message}
          </div>
        ) : null}

        {leads.length === 0 && !error ? (
          <div className="rounded-[2rem] border border-amber-200 bg-white p-8 text-center shadow-sm">
            <RefreshCw className="mx-auto h-10 w-10 text-amber-700" />
            <h1 className="mt-4 text-2xl font-black text-green-950">Nenhum lead comercial ainda.</h1>
            <p className="mt-2 text-stone-700">Abra o diagnóstico público, envie uma resposta de teste e volte para conferir o CRM.</p>
            <Link href="/diagnostico" className="mt-5 inline-flex rounded-full bg-green-800 px-5 py-3 text-sm font-black text-white hover:bg-green-900" prefetch={false}>
              Criar primeiro lead
            </Link>
          </div>
        ) : null}

        <div className="grid gap-4">
          {leads.map((lead) => {
            const whatsappHref = buildWhatsAppHref(lead.contact_whatsapp, lead.contact_name, lead.organization_name, lead.next_action_note);

            return (
              <article key={lead.id} className="rounded-[1.5rem] border border-amber-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-green-900">
                        {statusLabels[lead.status] ?? lead.status}
                      </span>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-amber-800">
                        Prioridade {priorityLabels[lead.priority] ?? lead.priority}
                      </span>
                    </div>
                    <h2 className="mt-3 text-xl font-black text-green-950">
                      {lead.organization_name ?? "Organização não informada"}
                    </h2>
                    <p className="mt-1 text-sm font-bold text-stone-700">
                      {lead.contact_name} {lead.contact_whatsapp ? `• ${lead.contact_whatsapp}` : ""} {lead.contact_email ? `• ${lead.contact_email}` : ""}
                    </p>
                    <p className="mt-2 text-sm text-stone-600">
                      {lead.event_type ?? "Evento não informado"} {lead.expected_audience ? `• ${lead.expected_audience} pessoas` : ""} {lead.city ? `• ${lead.city}${lead.state ? `/${lead.state}` : ""}` : ""}
                    </p>
                    {lead.main_pain ? <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-stone-700">Dor principal: {lead.main_pain}</p> : null}
                    {lead.internal_notes ? <p className="mt-3 text-sm leading-6 text-stone-700">{lead.internal_notes}</p> : null}
                  </div>

                  <aside className="rounded-2xl border border-amber-100 bg-amber-50 p-4 lg:w-80">
                    <div className="flex items-start gap-2 text-sm font-bold text-green-950">
                      <CalendarClock className="mt-0.5 h-4 w-4" />
                      <div>
                        <p>Próxima ação</p>
                        <p className="mt-1 font-normal text-stone-700">{lead.next_action_note ?? "Definir próximo contato."}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-amber-700">{formatDate(lead.next_action_at)}</p>
                      </div>
                    </div>
                    {whatsappHref ? (
                      <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-800 px-4 py-2 text-sm font-black text-white hover:bg-green-900">
                        <MessageCircle className="h-4 w-4" /> Abrir WhatsApp
                      </a>
                    ) : null}
                  </aside>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
