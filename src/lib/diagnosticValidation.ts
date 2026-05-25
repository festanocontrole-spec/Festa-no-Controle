export type DiagnosticFieldKey =
  | "organization_name"
  | "contact_name"
  | "contact_whatsapp"
  | "contact_email"
  | "city"
  | "state"
  | "event_type"
  | "expected_audience"
  | "next_event_date"
  | "main_pain"
  | "sells_tickets_before"
  | "uses_paper_tickets"
  | "cashier_retypes_orders"
  | "had_cashier_lines"
  | "had_food_shortage_or_leftovers"
  | "volunteer_management"
  | "accountability_process"
  | "biggest_fear"
  | "consent_whatsapp";

export type DiagnosticValidationError = {
  field: DiagnosticFieldKey;
  message: string;
};

export type DiagnosticFormValues = Record<string, string | null | undefined>;

export const MIN_FREE_TEXT_LENGTH = 12;

const requiredFields: Array<{ field: DiagnosticFieldKey; message: string }> = [
  { field: "organization_name", message: "Informe o nome da entidade ou organização." },
  { field: "contact_name", message: "Informe o nome do responsável." },
  { field: "contact_whatsapp", message: "Informe um WhatsApp para retorno do diagnóstico." },
  { field: "contact_email", message: "Informe um e-mail para receber o retorno do diagnóstico." },
  { field: "state", message: "Informe o estado." },
  { field: "city", message: "Informe a cidade." },
  { field: "event_type", message: "Selecione o tipo de evento." },
  { field: "expected_audience", message: "Informe o público esperado, mesmo que seja uma estimativa." },
  { field: "next_event_date", message: "Informe a data aproximada do próximo evento." },
  { field: "main_pain", message: "Descreva a principal dor ou preocupação do evento." },
  { field: "sells_tickets_before", message: "Responda se vocês vendem convites, reservas ou cartelas antes do evento." },
  { field: "uses_paper_tickets", message: "Responda se vocês ainda dependem de fichas, convites ou controles em papel." },
  { field: "cashier_retypes_orders", message: "Responda se o caixa precisa redigitar ou reconstruir pedidos." },
  { field: "had_cashier_lines", message: "Responda se já houve fila grande no caixa ou fechamento." },
  { field: "had_food_shortage_or_leftovers", message: "Responda se já faltou ou sobrou comida/bebida." },
  { field: "volunteer_management", message: "Explique como organizam voluntários e/ou prestadores atualmente." },
  { field: "accountability_process", message: "Explique como fazem a prestação de contas depois do evento." },
  { field: "biggest_fear", message: "Informe o maior medo ou risco percebido para o dia do evento." },
  { field: "consent_whatsapp", message: "Confirme se podemos enviar o retorno do diagnóstico por WhatsApp." },
];

const freeTextFields: Array<{ field: DiagnosticFieldKey; label: string }> = [
  { field: "main_pain", label: "principal dor hoje" },
  { field: "volunteer_management", label: "organização de voluntários/prestadores" },
  { field: "accountability_process", label: "prestação de contas" },
  { field: "biggest_fear", label: "maior medo para o dia do evento" },
];

function normalize(value: string | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function hasValue(values: DiagnosticFormValues, field: DiagnosticFieldKey) {
  return normalize(values[field]).length > 0;
}

export function formDataToDiagnosticValues(formData: FormData): DiagnosticFormValues {
  const values: DiagnosticFormValues = {};

  for (const { field } of requiredFields) {
    const value = formData.get(field);
    values[field] = typeof value === "string" ? value.trim() : "";
  }

  values.contact_email = normalize(formData.get("contact_email") as string | null);
  values.consent_email = normalize(formData.get("consent_email") as string | null);

  return values;
}

export function validateDiagnosticValues(values: DiagnosticFormValues): DiagnosticValidationError[] {
  const errors: DiagnosticValidationError[] = [];

  for (const item of requiredFields) {
    if (!hasValue(values, item.field)) {
      errors.push(item);
    }
  }

  const expectedAudience = Number.parseInt(normalize(values.expected_audience), 10);
  if (hasValue(values, "expected_audience") && (!Number.isFinite(expectedAudience) || expectedAudience <= 0)) {
    errors.push({ field: "expected_audience", message: "Informe um público esperado válido, maior que zero." });
  }

  for (const item of freeTextFields) {
    const value = normalize(values[item.field]);
    if (value.length > 0 && value.length < MIN_FREE_TEXT_LENGTH) {
      errors.push({
        field: item.field,
        message: `A resposta de ${item.label} está muito curta. Escreva pelo menos ${MIN_FREE_TEXT_LENGTH} caracteres para entendermos melhor o contexto.`,
      });
    }
  }

  const email = normalize(values.contact_email);
  if (email.length > 0 && !email.includes("@")) {
    errors.push({ field: "contact_email", message: "Informe um e-mail válido." });
  }

  const phoneDigits = normalize(values.contact_whatsapp).replace(/\D/g, "");
  if (phoneDigits.length > 0 && phoneDigits.length < 10) {
    errors.push({ field: "contact_whatsapp", message: "Informe um WhatsApp com DDD." });
  }

  return errors;
}

export function firstDiagnosticErrorMessage(errors: DiagnosticValidationError[]) {
  if (errors.length === 0) return null;
  if (errors.length === 1) return errors[0]?.message ?? "Revise o formulário antes de enviar.";
  return `${errors[0]?.message ?? "Revise o formulário."} Existem mais ${errors.length - 1} ponto(s) pendente(s).`;
}
