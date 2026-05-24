"use server";

import { redirect } from "next/navigation";
import { buildLeadEmailHtml, buildLeadWhatsAppMessage, notifyBotConversaLead } from "@/lib/commercialMessages";
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

  if (mainPain.includes("volunt") || mainPain.includes("escala")) {
    return {
      maturityScore,
      dominantProfile: "Coordenação voluntária sobrecarregada",
      recommendedOffer: "Checklist de operação e escala de voluntários",
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
  const contactName = text(formData, "contact_name");
  const contactWhatsapp = text(formData, "contact_whatsapp");
  const organizationName = text(formData, "organization_name");
  const mainPain = text(formData, "main_pain");
  const contactEmail = optionalText(formData, "contact_email");

  if (!contactName || !contactWhatsapp || !organizationName || !mainPain) {
    redirect("/diagnostico?erro=campos-obrigatorios");
  }

  const expectedAudience = intValue(formData, "expected_audience");
  const eventType = optionalText(formData, "event_type");
  const sellsTicketsBefore = boolValue(formData, "sells_tickets_before");
  const usesPaperTickets = boolValue(formData, "uses_paper_tickets");
  const cashierRetypesOrders = boolValue(formData, "cashier_retypes_orders");
  const hadCashierLines = boolValue(formData, "had_cashier_lines");
  const hadFoodShortageOrLeftovers = boolValue(formData, "had_food_shortage_or_leftovers");

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

  const supabase = createSupabaseAdminClient();
  const nextActionAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const whatsappMessage = buildLeadWhatsAppMessage({
    contactName,
    organizationName,
    dominantProfile: classification.dominantProfile,
    recommendedOffer: classification.recommendedOffer,
  });

  const leadPayload = {
    organization_name: organizationName,
    contact_name: contactName,
    contact_email: contactEmail,
    contact_whatsapp: contactWhatsapp,
    city: optionalText(formData, "city"),
    state: optionalText(formData, "state"),
    event_type: eventType,
    expected_audience: expectedAudience,
    next_event_date: optionalText(formData, "next_event_date"),
    main_pain: mainPain,
    lead_source: "diagnostico-publico",
    status: "new",
    priority: classification.priority,
    next_action_at: nextActionAt,
    next_action_note: classification.nextActionNote,
    internal_notes: [
      `Perfil: ${classification.dominantProfile}.`,
      `Oferta sugerida: ${classification.recommendedOffer}.`,
      `Resumo de solução: ${classification.solutionSummary}`,
      `Mensagem WhatsApp sugerida: ${whatsappMessage}`,
    ].join("\n"),
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
    next_event_date: optionalText(formData, "next_event_date"),
    maturity_score: classification.maturityScore,
    dominant_profile: classification.dominantProfile,
    recommended_offer: classification.recommendedOffer,
    raw_answers: rawAnswers,
  });

  if (diagnosticError) {
    console.error("Erro ao criar diagnóstico comercial", diagnosticError);
  }

  const html = buildLeadEmailHtml({
    contactName,
    organizationName,
    dominantProfile: classification.dominantProfile,
    recommendedOffer: classification.recommendedOffer,
    solutionSummary: classification.solutionSummary,
    appUrl,
  });

  const recipients = [contactEmail, "festanocontrole@gmail.com"];
  await sendMail({
    to: recipients,
    subject: `Diagnóstico Festa no Controle - ${organizationName}`,
    html,
  }).catch((error) => {
    console.error("Erro ao enviar e-mail de diagnóstico", error);
  });

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

  redirect(
    `/diagnostico/obrigado?perfil=${encodeURIComponent(classification.dominantProfile)}&oferta=${encodeURIComponent(
      classification.recommendedOffer,
    )}&resumo=${encodeURIComponent(classification.solutionSummary)}`,
  );
}
