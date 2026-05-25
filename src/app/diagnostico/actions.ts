"use server";

import { redirect } from "next/navigation";
import { buildEventSimulation } from "@/lib/eventSimulation";
import { buildLeadEmailHtml, buildLeadWhatsAppMessage, notifyBotConversaLead } from "@/lib/commercialMessages";
import { formDataToDiagnosticValues, validateDiagnosticValues } from "@/lib/diagnosticValidation";
import { sendMail } from "@/lib/mail";
import { createSupabaseAdminClient } from "@/lib/supabaseServer";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalText(formData: FormData, key: string) {
  const value = text(formData, key);
  return value.length > 0 ? value : null;
}

function intValue(formData: FormData, key: string) {
  const value = Number.parseInt(text(formData, key), 10);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function boolValue(formData: FormData, key: string) {
  const value = text(formData, key);
  if (value === "sim") return true;
  if (value === "nao") return false;
  return null;
}

function addScore(condition: boolean, points: number) {
  return condition ? points : 0;
}

function addMinutes(minutes: number) {
  return new Date(Date.now() + minutes * 60 * 1000).toISOString();
}

function addDays(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

function sevenDaysBefore(dateValue: string | null) {
  if (!dateValue) return null;
  const date = new Date(`${dateValue}T09:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  date.setDate(date.getDate() - 7);
  return date.toISOString();
}

function classifyDiagnostic(input: {
  expectedAudience: number | null;
  eventType: string | null;
  sellsTicketsBefore: boolean | null;
  usesPaperTickets: boolean | null;
  cashierRetypesOrders: boolean | null;
  hadCashierLines: boolean | null;
  hadFoodShortageOrLeftovers: boolean | null;
  mainPain: string;
}) {
  const mainPain = input.mainPain.toLowerCase();
  const eventType = (input.eventType ?? "").toLowerCase();

  const maturityScore =
    addScore(Boolean(input.sellsTicketsBefore), 15) +
    addScore(!input.cashierRetypesOrders, 20) +
    addScore(!input.hadCashierLines, 15) +
    addScore(!input.hadFoodShortageOrLeftovers, 15) +
    addScore(!input.usesPaperTickets, 10) +
    addScore((input.expectedAudience ?? 0) > 0, 5);

  if (eventType.includes("bingo") || mainPain.includes("bingo") || mainPain.includes("cartela") || mainPain.includes("quina")) {
    return {
      maturityScore,
      dominantProfile: "Evento com Bingo",
      recommendedOffer: "Bingo no Controle integrado ao Festa no Controle",
      priority: "high" as const,
      nextActionNote: "Mostrar fluxo de rodadas, prendas, pedras sorteadas, chamada de bingo e venda de cartelas.",
      solutionSummary:
        "Organizar rodadas, prendas e chamadas de bingo, além de permitir venda de cartelas junto com convites e consumo do evento.",
    };
  }

  if (input.cashierRetypesOrders || input.hadCashierLines || mainPain.includes("fila") || mainPain.includes("caixa")) {
    return {
      maturityScore,
      dominantProfile: "Caixa sobrecarregado",
      recommendedOffer: "Implantação Expressa: Caixa sem Retrabalho",
      priority: "high" as const,
      nextActionNote: "Agendar demonstração do fluxo garçom -> ficha/código -> caixa.",
      solutionSummary:
        "Começar pelo ponto mais dolorido: o garçom registra o pedido e o caixa fecha sem reconstruir tudo no fim da noite.",
    };
  }

  if (input.hadFoodShortageOrLeftovers || mainPain.includes("sobra") || mainPain.includes("falta") || mainPain.includes("compra")) {
    return {
      maturityScore,
      dominantProfile: "Festa sem previsibilidade",
      recommendedOffer: "Diagnóstico de compras, preparo e consumo previsto",
      priority: "high" as const,
      nextActionNote: "Oferecer simulação de consumo, compras e preparo com base no público esperado.",
      solutionSummary:
        "Usar dados de convites, combos e consumo para reduzir compras no chute, sobras, faltas e improvisos.",
    };
  }

  if (!input.sellsTicketsBefore || mainPain.includes("receita") || mainPain.includes("convite")) {
    return {
      maturityScore,
      dominantProfile: "Receita antecipada baixa",
      recommendedOffer: "Plano de convites, combos e campanhas por WhatsApp",
      priority: "medium" as const,
      nextActionNote: "Mostrar como antecipar receita com convites, combos e confirmação Pix.",
      solutionSummary:
        "Criar pré-venda organizada para melhorar caixa antes do evento e dar sinais de demanda para compras e preparo.",
    };
  }

  if (mainPain.includes("volunt") || mainPain.includes("prestador") || mainPain.includes("escala")) {
    return {
      maturityScore,
      dominantProfile: "Coordenação sobrecarregada",
      recommendedOffer: "Checklist de operação, voluntários e prestadores",
      priority: "medium" as const,
      nextActionNote: "Enviar checklist de funções, treinamento e plano B para o dia do evento.",
      solutionSummary:
        "Organizar funções, orientações e pontos críticos para reduzir dependência de improviso e memória da coordenação.",
    };
  }

  return {
    maturityScore,
    dominantProfile: "Organização em evolução",
    recommendedOffer: "Diagnóstico gratuito da operação da festa",
    priority: "medium" as const,
    nextActionNote: "Entender a próxima festa e sugerir implantação por ondas.",
    solutionSummary:
      "Mapear as principais dores e escolher uma primeira onda de implantação simples, segura e com plano B.",
  };
}

export async function submitCommercialDiagnostic(formData: FormData) {
  const values = formDataToDiagnosticValues(formData);
  const validationErrors = validateDiagnosticValues(values);

  if (validationErrors.length > 0) {
    const params = new URLSearchParams({
      erro: "validacao",
      campo: validationErrors[0]?.field ?? "formulario",
      mensagem: validationErrors[0]?.message ?? "Revise o diagnóstico antes de enviar.",
    });
    redirect(`/diagnostico?${params.toString()}`);
  }

  const contactName = text(formData, "contact_name");
  const contactWhatsapp = text(formData, "contact_whatsapp");
  const organizationName = text(formData, "organization_name");
  const mainPain = text(formData, "main_pain");
  const contactEmail = text(formData, "contact_email");
  const nextEventDate = optionalText(formData, "next_event_date");

  const expectedAudience = intValue(formData, "expected_audience");
  const eventType = optionalText(formData, "event_type");
  const sellsTicketsBefore = boolValue(formData, "sells_tickets_before");
  const usesPaperTickets = boolValue(formData, "uses_paper_tickets");
  const cashierRetypesOrders = boolValue(formData, "cashier_retypes_orders");
  const hadCashierLines = boolValue(formData, "had_cashier_lines");
  const hadFoodShortageOrLeftovers = boolValue(formData, "had_food_shortage_or_leftovers");
  const consentWhatsapp = text(formData, "consent_whatsapp") === "sim";
  const consentEmail = text(formData, "consent_email") === "sim";

  const classification = classifyDiagnostic({
    expectedAudience,
    eventType,
    sellsTicketsBefore,
    usesPaperTickets,
    cashierRetypesOrders,
    hadCashierLines,
    hadFoodShortageOrLeftovers,
    mainPain,
  });

  const simulation = buildEventSimulation({
    expectedAudience,
    eventType,
    dominantProfile: classification.dominantProfile,
    nextEventDate,
  });

  const supabase = createSupabaseAdminClient();
  const nextActionAt = addMinutes(15);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const whatsappMessage = buildLeadWhatsAppMessage({
    contactName,
    organizationName,
    dominantProfile: classification.dominantProfile,
    recommendedOffer: classification.recommendedOffer,
  });

  const internalNotes = [
    `Perfil: ${classification.dominantProfile}.`,
    `Oferta sugerida: ${classification.recommendedOffer}.`,
    `Resumo de solução: ${classification.solutionSummary}`,
    `Simulação inicial: ${simulation.cashierSuggestion} ${simulation.waiterSuggestion} ${simulation.bingoSuggestion ?? ""}`,
    `Mensagem WhatsApp sugerida: ${whatsappMessage}`,
  ].join("\n");

  const leadPayload = {
    organization_name: organizationName,
    contact_name: contactName,
    contact_email: contactEmail,
    contact_whatsapp: contactWhatsapp,
    city: optionalText(formData, "city"),
    state: optionalText(formData, "state"),
    event_type: eventType,
    expected_audience: expectedAudience,
    next_event_date: nextEventDate,
    main_pain: mainPain,
    lead_source: "diagnostico-publico",
    status: "new",
    priority: classification.priority,
    next_action_at: nextActionAt,
    next_action_note: classification.nextActionNote,
    internal_notes: internalNotes,
    consent_whatsapp: consentWhatsapp,
    consent_email: consentEmail,
    desired_solution: classification.recommendedOffer,
  };

  const { data: lead, error: leadError } = await supabase.from("commercial_leads").insert(leadPayload).select("id").single();

  if (leadError || !lead) {
    console.error("Erro ao criar lead comercial", leadError);
    redirect("/diagnostico?erro=banco");
  }

  const rawAnswers = {
    volunteer_management: optionalText(formData, "volunteer_management"),
    accountability_process: optionalText(formData, "accountability_process"),
    biggest_fear: optionalText(formData, "biggest_fear"),
    solution_summary: classification.solutionSummary,
    whatsapp_message: whatsappMessage,
    simulation,
  };

  const { error: diagnosticError } = await supabase.from("commercial_diagnostic_responses").insert({
    lead_id: lead.id,
    organization_name: organizationName,
    contact_name: contactName,
    contact_email: contactEmail,
    contact_whatsapp: contactWhatsapp,
    event_type: eventType,
    expected_audience: expectedAudience,
    sells_tickets_before: sellsTicketsBefore,
    uses_paper_tickets: usesPaperTickets,
    cashier_retypes_orders: cashierRetypesOrders,
    had_cashier_lines: hadCashierLines,
    had_food_shortage_or_leftovers: hadFoodShortageOrLeftovers,
    volunteer_management: optionalText(formData, "volunteer_management"),
    accountability_process: optionalText(formData, "accountability_process"),
    biggest_fear: optionalText(formData, "biggest_fear"),
    next_event_date: nextEventDate,
    maturity_score: classification.maturityScore,
    dominant_profile: classification.dominantProfile,
    recommended_offer: classification.recommendedOffer,
    raw_answers: rawAnswers,
  });

  if (diagnosticError) {
    console.error("Erro ao criar diagnóstico comercial", diagnosticError);
  }

  const followups = [
    {
      lead_id: lead.id,
      followup_type: "whatsapp",
      subject: "Retorno rápido do diagnóstico",
      notes: whatsappMessage,
      due_at: addMinutes(15),
    },
    {
      lead_id: lead.id,
      followup_type: "whatsapp",
      subject: "Segundo contato após 24 horas",
      notes: "Retomar o diagnóstico, reforçar a recomendação inicial e convidar para ver a Demo Festa Junina ou Bingo no Controle.",
      due_at: addDays(1),
    },
    {
      lead_id: lead.id,
      followup_type: "whatsapp",
      subject: "Terceiro contato após 3 dias",
      notes: "Perguntar se a coordenação quer reservar uma conversa rápida para planejar a primeira onda de implantação.",
      due_at: addDays(3),
    },
  ];

  const beforeEvent = sevenDaysBefore(nextEventDate);
  if (beforeEvent) {
    followups.push({
      lead_id: lead.id,
      followup_type: "whatsapp",
      subject: "Contato 7 dias antes do evento",
      notes: "Reativar o lead próximo ao evento com checklist de risco, plano B e oferta do módulo essencial.",
      due_at: beforeEvent,
    });
  }

  const { error: followupError } = await supabase.from("commercial_followups").insert(followups);
  if (followupError) {
    console.error("Erro ao criar follow-ups comerciais", followupError);
  }

  const html = buildLeadEmailHtml({
    contactName,
    organizationName,
    dominantProfile: classification.dominantProfile,
    recommendedOffer: classification.recommendedOffer,
    solutionSummary: classification.solutionSummary,
    appUrl,
    simulation,
  });

  if (consentEmail) {
    await sendMail({
      to: [contactEmail],
      cc: ["festanocontrole@gmail.com"],
      subject: `Diagnóstico Festa no Controle - ${organizationName}`,
      html,
    }).catch((error) => {
      console.error("Erro ao enviar e-mail de diagnóstico", error);
    });
  }

  if (consentWhatsapp) {
    await notifyBotConversaLead({
      contactName,
      contactWhatsapp,
      organizationName,
      contactEmail,
      dominantProfile: classification.dominantProfile,
      recommendedOffer: classification.recommendedOffer,
      nextActionNote: classification.nextActionNote,
      whatsappMessage,
    }).catch((error) => {
      console.error("Erro ao notificar BotConversa", error);
    });
  }

  const params = new URLSearchParams({
    lead: lead.id,
    perfil: classification.dominantProfile,
    oferta: classification.recommendedOffer,
    resumo: classification.solutionSummary,
    publico: simulation.audienceLabel,
    caixa: simulation.cashierSuggestion,
    equipe: simulation.waiterSuggestion,
    planejamento: simulation.planningSuggestion,
    followup: simulation.followupSuggestion,
  });

  if (simulation.bingoSuggestion) params.set("bingo", simulation.bingoSuggestion);

  redirect(`/diagnostico/obrigado?${params.toString()}`);
}
