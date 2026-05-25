import type { EventSimulation } from "@/lib/eventSimulation";

export type DiagnosticClassification = {
  maturityScore: number;
  dominantProfile: string;
  recommendedOffer: string;
  priority: "low" | "medium" | "high" | "urgent";
  nextActionNote: string;
  solutionSummary: string;
};

export function buildWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function buildLeadWhatsAppMessage(input: {
  contactName: string;
  organizationName: string;
  dominantProfile: string;
  recommendedOffer: string;
}) {
  return [
    `Olá, ${input.contactName}! Aqui é do Festa no Controle. Obrigado por preencher o diagnóstico gratuito da ${input.organizationName}.`,
    "",
    `Pelo que você informou, a primeira leitura aponta para: ${input.dominantProfile}.`,
    `O caminho mais seguro parece ser: ${input.recommendedOffer}.`,
    "",
    "A ideia é começar pelo ponto que mais reduz correria, erro e retrabalho no seu evento — sem pedir senha, cartão ou instalação.",
    "",
    "Você consegue me confirmar a data do evento e qual ponto mais preocupa a coordenação hoje?",
  ].join("\n");
}

export function buildSecondFollowupMessage(input: { contactName: string; recommendedOffer: string }) {
  return [
    `Olá, ${input.contactName}! Passando para saber se você conseguiu ver o retorno do diagnóstico gratuito do Festa no Controle.`,
    "",
    `Pelo cenário informado, o primeiro caminho sugerido foi: ${input.recommendedOffer}.`,
    "",
    "Posso te mandar um resumo simples de como seria a primeira onda de implantação no seu evento?",
  ].join("\n");
}

export function buildThirdFollowupMessage(input: { contactName: string }) {
  return [
    `Olá, ${input.contactName}! Só retomando o diagnóstico da sua festa.`,
    "",
    "Quando a coordenação organiza pedidos, caixa, voluntários/prestadores, bingo e prestação de contas antes do evento, o dia tende a ficar bem menos improvisado.",
    "",
    "Faz sentido marcarmos uma conversa rápida para entender se o módulo essencial já resolveria a dor principal?",
  ].join("\n");
}

export function buildPreEventFollowupMessage(input: { contactName: string }) {
  return [
    `Olá, ${input.contactName}! Como o evento está se aproximando, vale revisar os principais riscos: caixa, pedidos, filas, voluntários/prestadores, pagamentos, bingo e prestação de contas.`,
    "",
    "Quer que eu te envie um checklist rápido para reduzir correria no dia?",
  ].join("\n");
}

export function buildLeadEmailHtml(input: {
  contactName: string;
  organizationName: string;
  dominantProfile: string;
  recommendedOffer: string;
  solutionSummary: string;
  appUrl: string;
  simulation?: EventSimulation;
}) {
  const diagnosticUrl = `${input.appUrl}/diagnostico`;
  const demoUrl = `${input.appUrl}/demo-festa-junina`;

  const simulationHtml = input.simulation
    ? `
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:16px;padding:16px;margin:16px 0;">
        <p style="margin:0 0 8px 0;"><strong>Simulação inicial com premissas:</strong></p>
        <ul style="margin:0;padding-left:20px;">
          <li>Público considerado: ${input.simulation.audienceLabel}.</li>
          <li>${input.simulation.cashierSuggestion}</li>
          <li>${input.simulation.waiterSuggestion}</li>
          <li>${input.simulation.planningSuggestion}</li>
          ${input.simulation.bingoSuggestion ? `<li>${input.simulation.bingoSuggestion}</li>` : ""}
        </ul>
      </div>
    `
    : "";

  return `
    <div style="font-family: Arial, sans-serif; color: #1c1917; line-height: 1.6;">
      <h1 style="color:#052e16;">Obrigado pelo diagnóstico gratuito</h1>
      <p>Olá, ${input.contactName}.</p>
      <p>Recebemos as informações sobre <strong>${input.organizationName}</strong> e já temos uma primeira leitura para orientar os próximos passos.</p>
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:16px;padding:16px;margin:16px 0;">
        <p style="margin:0 0 8px 0;"><strong>Perfil inicial:</strong> ${input.dominantProfile}</p>
        <p style="margin:0 0 8px 0;"><strong>Caminho sugerido:</strong> ${input.recommendedOffer}</p>
        <p style="margin:0;"><strong>Como isso ajuda:</strong> ${input.solutionSummary}</p>
      </div>
      ${simulationHtml}
      <p>Se ainda não viu, recomendamos assistir à Demo Festa Junina para visualizar como a operação pode começar simples e evoluir por ondas.</p>
      <p><a href="${demoUrl}" style="display:inline-block;background:#166534;color:white;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:bold;">Ver Demo Festa Junina</a></p>
      <p>Também é possível refazer ou complementar o diagnóstico gratuito quando quiser:</p>
      <p><a href="${diagnosticUrl}">${diagnosticUrl}</a></p>
      <p>Em breve entraremos em contato para entender melhor seu evento e indicar a opção mais segura.</p>
      <p>Abraço,<br/>Equipe Festa no Controle</p>
    </div>
  `;
}

export async function notifyBotConversaLead(input: {
  contactName: string;
  contactWhatsapp: string;
  organizationName: string;
  contactEmail: string | null;
  dominantProfile: string;
  recommendedOffer: string;
  nextActionNote: string;
  whatsappMessage: string;
}) {
  const webhookUrl = process.env.BOTCONVERSA_NEW_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { sent: false, reason: "webhook_not_configured" };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "festa-no-controle-diagnostico",
      name: input.contactName,
      phone: input.contactWhatsapp,
      email: input.contactEmail,
      organization_name: input.organizationName,
      dominant_profile: input.dominantProfile,
      recommended_offer: input.recommendedOffer,
      next_action_note: input.nextActionNote,
      suggested_whatsapp_message: input.whatsappMessage,
    }),
  });

  if (!response.ok) {
    return { sent: false, reason: `http_${response.status}` };
  }

  return { sent: true };
}
