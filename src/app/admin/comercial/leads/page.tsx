import Link from "next/link";
import { CalendarClock, CheckCircle2, MessageCircle, RefreshCw } from "lucide-react";
import { buildPreEventFollowupMessage, buildSecondFollowupMessage, buildThirdFollowupMessage, buildWhatsAppUrl } from "@/lib/commercialMessages";
import { CommercialAdminHero, CommercialAdminNav } from "@/components/CommercialAdminNav";
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
  desired_solution?: string | null;
  consent_whatsapp?: boolean | null;
};

type CommercialFollowup = {
  id: string;
  lead_id: string;
  followup_type: string;
  subject: string | null;
  notes: string | null;
  due_at: string | null;
  completed_at: string | null;
};

type FollowupViewItem = {
  id?: string;
  lead_id?: string;
  followup_type?: string;
  subject: string | null;
  notes: string | null;
  due_at: string | null;
  completed_at: string | null;
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
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sem data";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: value.includes("T") ? "short" : undefined }).format(date);
}

function isPastDate(value: string | null) {
  if (!value) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.getTime() <= Date.now();
}

function shouldShowFollowup(followup: FollowupViewItem) {
  const subject = (followup.subject ?? "").toLowerCase();
  if (subject.includes("7 dias") && isPastDate(followup.due_at)) return false;
  return true;
}

function sevenDaysBeforeIfFuture(dateValue: string | null) {
  if (!dateValue) return null;
  const eventDate = new Date(`${dateValue}T09:00:00`);
  if (Number.isNaN(eventDate.getTime()) || eventDate.getTime() <= Date.now()) return null;
  const dueDate = new Date(eventDate);
  dueDate.setDate(dueDate.getDate() - 7);
  if (dueDate.getTime() <= Date.now()) return null;
  return dueDate.toISOString();
}

function buildWhatsAppHref(phone: string | null, message: string) {
  if (!phone) return null;
  return buildWhatsAppUrl(phone, message);
}

function fallbackFirstMessage(lead: CommercialLead) {
  return [
    `Olá, ${lead.contact_name}! Aqui é do Festa no Controle. Obrigado por preencher o diagnóstico ${lead.organization_name ? `da ${lead.organization_name}` : "da sua festa"}.`,
    "",
    `Pelo que você informou, acredito que podemos ajudar começando por: ${lead.next_action_note ?? lead.desired_solution ?? "uma implantação simples por ondas"}.`,
    "",
    "Você consegue me dizer a data do evento e qual ponto mais preocupa a coordenação hoje?",
  ].join("\n");
}

function getFallbackFollowups(lead: CommercialLead): FollowupViewItem[] {
  const items: FollowupViewItem[] = [
    {
      subject: "Retorno em até 15 minutos",
      notes: fallbackFirstMessage(lead),
      due_at: lead.next_action_at,
      completed_at: null,
    },
    {
      subject: "Follow-up 24 horas",
      notes: buildSecondFollowupMessage({ contactName: lead.contact_name, recommendedOffer: lead.desired_solution ?? lead.next_action_note ?? "primeira onda de implantação" }),
      due_at: null,
      completed_at: null,
    },
    {
      subject: "Follow-up 3 dias",
      notes: buildThirdFollowupMessage({ contactName: lead.contact_name }),
      due_at: null,
      completed_at: null,
    },
  ];

  const preEventDueAt = sevenDaysBeforeIfFuture(lead.next_event_date);
  if (preEventDueAt) {
    items.push({
      subject: "7 dias antes do evento",
      notes: buildPreEventFollowupMessage({ contactName: lead.contact_name }),
      due_at: preEventDueAt,
      completed_at: null,
    });
  }

  return items;
}

export default async function CommercialLeadsPage() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("commercial_leads")
    .select("id, organization_name, contact_name, contact_email, contact_whatsapp, city, state, event_type, expected_audience, next_event_date, main_pain, status, priority, next_action_at, next_action_note, internal_notes, created_at, desired_solution, consent_whatsapp")
    .order("created_at", { ascending: false })
    .limit(50);

  const leads = (data ?? []) as CommercialLead[];
  const leadIds = leads.map((lead) => lead.id);

  const { data: followupsData } = leadIds.length > 0
    ? await supabase
        .from("commercial_followups")
        .select("id, lead_id, followup_type, subject, notes, due_at, completed_at")
        .in("lead_id", leadIds)
        .order("due_at", { ascending: true })
    : { data: [] as CommercialFollowup[] };

  const followupsByLead = new Map<string, CommercialFollowup[]>();
  for (const followup of (followupsData ?? []) as CommercialFollowup[]) {
    const list = followupsByLead.get(followup.lead_id) ?? [];
    list.push(followup);
    followupsByLead.set(followup.lead_id, list);
  }

  const total = leads.length;
  const pending = leads.filter((lead) => !["won", "lost", "archived"].includes(lead.status)).length;
  const highPriority = leads.filter((lead) => ["high", "urgent"].includes(lead.priority)).length;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_55%,#f7fee7_100%)] lg:pl-72">
      <section className="mx-auto max-w-6xl px-4 pt-6 pb-14 sm:px-5 md:pt-8">
        <CommercialAdminHero
          eyebrow="Gestão interna"
          title="Leads e diagnósticos"
          description="Área para acompanhar diagnósticos recebidos, priorizar retornos, abrir WhatsApp e conduzir o lead até cliente, pagamento, acesso, pós-venda e próxima edição."
        />

        <CommercialAdminNav currentHref="/admin/comercial/leads" />

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-stone-600">Diagnósticos listados</p>
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
            Não foi possível carregar os diagnósticos. Verifique se as migrations comerciais foram aplicadas. Detalhe: {error.message}
          </div>
        ) : null}

        {leads.length === 0 && !error ? (
          <div className="rounded-[2rem] border border-amber-200 bg-white p-8 text-center shadow-sm">
            <RefreshCw className="mx-auto h-10 w-10 text-amber-700" />
            <h1 className="mt-4 text-2xl font-black text-green-950">Nenhum diagnóstico recebido ainda.</h1>
            <p className="mt-2 text-stone-700">Abra o diagnóstico público, envie uma resposta de teste e volte para conferir a Gestão.</p>
            <Link href="/diagnostico" className="mt-5 inline-flex rounded-full bg-green-800 px-5 py-3 text-sm font-black text-white hover:bg-green-900" prefetch={false}>
              Criar primeiro diagnóstico
            </Link>
          </div>
        ) : null}

        <div className="grid gap-4">
          {leads.map((lead) => {
            const followups: FollowupViewItem[] = (followupsByLead.get(lead.id) ?? getFallbackFollowups(lead)).filter(shouldShowFollowup);
            const firstMessage = followups[0]?.notes ?? fallbackFirstMessage(lead);
            const whatsappHref = buildWhatsAppHref(lead.contact_whatsapp, firstMessage);

            return (
              <article key={lead.id} className="rounded-[1.5rem] border border-amber-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-green-900">
                        {statusLabels[lead.status] ?? lead.status}
                      </span>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-amber-800">
                        Prioridade {priorityLabels[lead.priority] ?? lead.priority}
                      </span>
                      {lead.consent_whatsapp === false ? (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-red-800">
                          Sem consentimento WhatsApp
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-3 text-xl font-black text-green-950">{lead.organization_name ?? "Organização não informada"}</h2>
                    <p className="mt-1 text-sm font-bold text-stone-700">
                      {lead.contact_name} {lead.contact_whatsapp ? `• ${lead.contact_whatsapp}` : ""} {lead.contact_email ? `• ${lead.contact_email}` : ""}
                    </p>
                    <p className="mt-2 text-sm text-stone-600">
                      {lead.event_type ?? "Evento não informado"} {lead.expected_audience ? `• ${lead.expected_audience} pessoas` : ""} {lead.city ? `• ${lead.city}${lead.state ? `/${lead.state}` : ""}` : ""}
                    </p>
                    {lead.main_pain ? <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-stone-700">Dor principal: {lead.main_pain}</p> : null}
                    {lead.internal_notes ? <p className="mt-3 whitespace-pre-line text-sm leading-6 text-stone-700">{lead.internal_notes}</p> : null}

                    <div className="mt-4 rounded-2xl border border-green-100 bg-green-50 p-4">
                      <h3 className="flex items-center gap-2 text-sm font-black text-green-950">
                        <CheckCircle2 className="h-4 w-4" /> Régua de próximos contatos
                      </h3>
                      <div className="mt-3 grid gap-2">
                        {followups.map((followup, index) => {
                          const href = buildWhatsAppHref(lead.contact_whatsapp, followup.notes ?? "");
                          return (
                            <div key={followup.id ?? `${lead.id}-${index}`} className="rounded-xl bg-white p-3 text-sm shadow-sm">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <p className="font-black text-green-950">{followup.subject ?? `Contato ${index + 1}`}</p>
                                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-amber-700">{formatDate(followup.due_at)}</p>
                                </div>
                                {href ? (
                                  <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-green-200 px-3 py-2 text-xs font-black text-green-950 hover:bg-green-50">
                                    <MessageCircle className="h-3.5 w-3.5" /> Abrir mensagem
                                  </a>
                                ) : null}
                              </div>
                              {followup.notes ? <p className="mt-2 line-clamp-3 text-xs leading-5 text-stone-600">{followup.notes}</p> : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
