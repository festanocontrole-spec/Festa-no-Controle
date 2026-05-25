export type EventSimulationInput = {
  expectedAudience: number | null;
  eventType: string | null;
  dominantProfile: string;
  hasBingo?: boolean;
  nextEventDate?: string | null;
};

export type EventSimulation = {
  audienceLabel: string;
  cashierSuggestion: string;
  waiterSuggestion: string;
  planningSuggestion: string;
  bingoSuggestion: string | null;
  followupSuggestion: string;
};

export function buildEventSimulation(input: EventSimulationInput): EventSimulation {
  const audience = input.expectedAudience && input.expectedAudience > 0 ? input.expectedAudience : null;
  const cashierCount = audience ? Math.max(1, Math.ceil(audience / 180)) : 1;
  const waiterCount = audience ? Math.max(2, Math.ceil(audience / 90)) : 2;
  const hasBingo = input.hasBingo || (input.eventType ?? "").toLowerCase().includes("bingo") || input.dominantProfile.toLowerCase().includes("bingo");

  return {
    audienceLabel: audience ? `${audience.toLocaleString("pt-BR")} pessoas` : "público ainda não estimado",
    cashierSuggestion: audience
      ? `Premissa inicial: pelo menos ${cashierCount} ponto(s) de caixa/conferência para reduzir fila no pico.`
      : "Premissa inicial: estimar público esperado para dimensionar caixa e conferência.",
    waiterSuggestion: audience
      ? `Premissa inicial: ${waiterCount} garçom(ns)/apoios para pedidos, podendo ajustar conforme mesas, barracas e horário de pico.`
      : "Premissa inicial: começar com um fluxo simples de garçom/apoio, ficha ou código e caixa.",
    planningSuggestion: "Usar pré-venda, combos e histórico para reduzir compra no chute, falta/sobra de comida e pressão no dia.",
    bingoSuggestion: hasBingo
      ? "Como há sinal de bingo, considerar o Bingo no Controle para rodadas, prendas, quinas, cartela cheia e acompanhamento das pedras pelo público."
      : null,
    followupSuggestion: input.nextEventDate
      ? "Como já existe data informada, vale priorizar um retorno rápido para definir a primeira onda de implantação."
      : "Sem data definida, o próximo passo é entender o prazo provável e sugerir um piloto simples.",
  };
}
