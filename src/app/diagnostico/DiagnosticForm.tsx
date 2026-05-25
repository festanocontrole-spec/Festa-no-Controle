"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2, ClipboardCheck, Info, Send } from "lucide-react";
import { firstDiagnosticErrorMessage, validateDiagnosticValues, type DiagnosticFieldKey } from "@/lib/diagnosticValidation";
import { submitCommercialDiagnostic, type DiagnosticSubmitState } from "./actions";

const booleanOptions = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
  { value: "nao-sei", label: "Não sei / depende" },
];

const states = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

const citiesByState: Record<string, string[]> = {
  SP: ["Campinas", "São Paulo", "Valinhos", "Vinhedo", "Hortolândia", "Sumaré", "Paulínia", "Indaiatuba", "Americana", "Jundiaí", "Santos", "Ribeirão Preto"],
  RJ: ["Rio de Janeiro", "Niterói", "Duque de Caxias", "Nova Iguaçu", "Petrópolis", "Volta Redonda"],
  MG: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros"],
  PR: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel"],
  SC: ["Florianópolis", "Joinville", "Blumenau", "São José", "Chapecó"],
  RS: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria"],
};

type ErrorMap = Partial<Record<DiagnosticFieldKey, string>>;

function normalizeForm(form: HTMLFormElement) {
  const formData = new FormData(form);
  const values: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    values[key] = typeof value === "string" ? value.trim() : "";
  }

  return values;
}

function inputClass(hasError: boolean) {
  return [
    "rounded-2xl border bg-amber-50 px-4 py-3 outline-none transition focus:border-green-700",
    hasError ? "border-red-500 ring-2 ring-red-100" : "border-amber-200",
  ].join(" ");
}

function fieldShellClass(hasError: boolean) {
  return [
    "grid gap-2 text-sm font-bold text-stone-700 scroll-mt-32 rounded-2xl p-1",
    hasError ? "bg-red-50/80" : "",
  ].join(" ");
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-bold text-red-700">{message}</p>;
}

function BooleanQuestion({ name, label, error }: { name: DiagnosticFieldKey; label: string; error?: string }) {
  return (
    <fieldset data-field={name} className={`scroll-mt-32 rounded-2xl border p-4 shadow-sm ${error ? "border-red-500 bg-red-50 ring-2 ring-red-100" : "border-amber-200 bg-white"}`}>
      <legend className="mb-3 text-sm font-black text-green-950">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {booleanOptions.map((option) => (
          <label key={option.value} className="flex cursor-pointer items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-sm font-bold text-stone-700">
            <input type="radio" name={name} value={option.value} className="accent-green-800" />
            {option.label}
          </label>
        ))}
      </div>
      <FieldError message={error} />
    </fieldset>
  );
}

export default function DiagnosticForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [serverState, formAction, isPending] = useActionState(submitCommercialDiagnostic, { ok: false } satisfies DiagnosticSubmitState);
  const [errors, setErrors] = useState<ErrorMap>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [state, setState] = useState("SP");

  const cityOptions = useMemo(() => citiesByState[state.toUpperCase()] ?? [], [state]);

  useEffect(() => {
    if (serverState.ok && serverState.redirectTo) {
      router.push(serverState.redirectTo);
      return;
    }

    if (!serverState.ok && serverState.message) {
      const nextErrors = serverState.fieldErrors ?? {};
      setErrors(nextErrors);
      setGlobalError(serverState.message);
      if (Object.keys(nextErrors).length > 0) {
        window.setTimeout(() => focusFirstError(nextErrors), 100);
      }
    }
  }, [router, serverState]);

  function focusFirstError(nextErrors: ErrorMap) {
    const firstField = Object.keys(nextErrors)[0];
    if (!firstField) return;

    const target = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstField}"]`);
    target?.scrollIntoView({ behavior: "smooth", block: "center" });

    const control = target?.querySelector<HTMLElement>("input, textarea, select, button");
    window.setTimeout(() => control?.focus(), 350);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const values = normalizeForm(event.currentTarget);
    const validationErrors = validateDiagnosticValues(values);

    if (validationErrors.length === 0) {
      setErrors({});
      setGlobalError(null);
      return;
    }

    event.preventDefault();

    const nextErrors: ErrorMap = {};
    for (const error of validationErrors) {
      if (!nextErrors[error.field]) nextErrors[error.field] = error.message;
    }

    setErrors(nextErrors);
    setGlobalError(firstDiagnosticErrorMessage(validationErrors));
    focusFirstError(nextErrors);
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} className="grid gap-5" noValidate>
      {globalError ? (
        <div className="sticky top-28 z-20 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-800 shadow-lg" role="alert">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p>{globalError}</p>
            {Object.keys(errors).length > 0 ? (
              <p className="mt-1 font-medium text-red-700">O campo pendente foi destacado. Complete a informação e envie novamente.</p>
            ) : (
              <p className="mt-1 font-medium text-red-700">O formulário foi validado, mas houve uma falha ao gravar. Verifique a configuração do Supabase e tente novamente.</p>
            )}
          </div>
        </div>
      ) : null}

      <section className="rounded-[2rem] border border-green-200 bg-green-50 p-5 shadow-sm md:p-6">
        <div className="flex items-start gap-3">
          <Info className="mt-1 h-5 w-5 shrink-0 text-green-800" />
          <div>
            <h2 className="text-lg font-black text-green-950">Antes de começar: é apenas um diagnóstico gratuito.</h2>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              O objetivo é ouvir sobre as dificuldades do seu evento para sugerir uma solução inicial. O preenchimento é gratuito, não solicita senha, cartão, dados bancários, pagamento, instalação ou download.
            </p>
            <div className="mt-4 grid gap-2 text-sm font-bold text-green-950 sm:grid-cols-2 lg:grid-cols-4">
              {["Sem senha", "Sem cartão", "Sem pagamento", "Sem instalação"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-800" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-[2rem] border border-amber-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-6">
        <div className="md:col-span-2">
          <h2 className="flex items-center gap-2 text-xl font-black text-green-950">
            <ClipboardCheck className="h-5 w-5" /> Dados para contato
          </h2>
          <p className="mt-1 text-sm text-stone-600">Usaremos esses dados para enviar o retorno do diagnóstico e sugerir o próximo passo.</p>
        </div>

        <label data-field="organization_name" className={fieldShellClass(Boolean(errors.organization_name))}>
          Nome da entidade/organização *
          <input name="organization_name" className={inputClass(Boolean(errors.organization_name))} placeholder="Ex.: Comunidade São João" />
          <FieldError message={errors.organization_name} />
        </label>

        <label data-field="contact_name" className={fieldShellClass(Boolean(errors.contact_name))}>
          Nome do responsável *
          <input name="contact_name" className={inputClass(Boolean(errors.contact_name))} placeholder="Nome de quem organiza" />
          <FieldError message={errors.contact_name} />
        </label>

        <label data-field="contact_whatsapp" className={fieldShellClass(Boolean(errors.contact_whatsapp))}>
          WhatsApp *
          <input name="contact_whatsapp" inputMode="tel" className={inputClass(Boolean(errors.contact_whatsapp))} placeholder="(19) 99999-9999" />
          <FieldError message={errors.contact_whatsapp} />
        </label>

        <label data-field="contact_email" className={fieldShellClass(Boolean(errors.contact_email))}>
          E-mail *
          <input type="email" name="contact_email" className={inputClass(Boolean(errors.contact_email))} placeholder="email@exemplo.com" />
          <FieldError message={errors.contact_email} />
        </label>

        <label data-field="state" className={fieldShellClass(Boolean(errors.state))}>
          Estado *
          <input name="state" list="state-options" maxLength={2} value={state} onChange={(event) => setState(event.target.value.toUpperCase())} className={`${inputClass(Boolean(errors.state))} uppercase`} placeholder="SP" />
          <datalist id="state-options">
            {states.map((option) => <option key={option} value={option} />)}
          </datalist>
          <FieldError message={errors.state} />
        </label>

        <label data-field="city" className={fieldShellClass(Boolean(errors.city))}>
          Cidade *
          <input name="city" list="city-options" className={inputClass(Boolean(errors.city))} placeholder="Campinas" />
          <datalist id="city-options">
            {cityOptions.map((option) => <option key={option} value={option} />)}
          </datalist>
          <FieldError message={errors.city} />
        </label>
      </section>

      <section className="grid gap-4 rounded-[2rem] border border-amber-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-black text-green-950">Sobre o próximo evento</h2>
        </div>

        <label data-field="event_type" className={fieldShellClass(Boolean(errors.event_type))}>
          Tipo de evento *
          <select name="event_type" className={inputClass(Boolean(errors.event_type))}>
            <option value="">Selecione</option>
            <option>Festa Junina</option>
            <option>Quermesse</option>
            <option>Bingo</option>
            <option>Bazar</option>
            <option>Almoço beneficente</option>
            <option>Evento escolar</option>
            <option>Evento religioso</option>
            <option>Outro</option>
          </select>
          <FieldError message={errors.event_type} />
        </label>

        <label data-field="expected_audience" className={fieldShellClass(Boolean(errors.expected_audience))}>
          Público esperado *
          <input type="number" min="1" name="expected_audience" className={inputClass(Boolean(errors.expected_audience))} placeholder="Ex.: 500" />
          <FieldError message={errors.expected_audience} />
        </label>

        <label data-field="next_event_date" className={fieldShellClass(Boolean(errors.next_event_date))}>
          Data aproximada do próximo evento *
          <input type="date" name="next_event_date" className={inputClass(Boolean(errors.next_event_date))} />
          <FieldError message={errors.next_event_date} />
        </label>

        <label data-field="main_pain" className={fieldShellClass(Boolean(errors.main_pain)) + " md:col-span-2"}>
          Principal dor hoje (Ex: fila no caixa, voluntários ou prestadores de serviços, falta/sobra de comida, controle de pagamentos, bingo, cartelas, prestação de contas, etc) *
          <textarea name="main_pain" rows={4} className={inputClass(Boolean(errors.main_pain))} placeholder="Ex.: temos fila no caixa no fim do evento, dificuldade para controlar Pix e dúvidas nas cartelas do bingo." />
          <FieldError message={errors.main_pain} />
        </label>
      </section>

      <BooleanQuestion name="sells_tickets_before" label="Vocês vendem convites, reservas ou cartelas antes do evento?" error={errors.sells_tickets_before} />
      <BooleanQuestion name="uses_paper_tickets" label="Vocês ainda dependem de fichas, convites ou controles em papel?" error={errors.uses_paper_tickets} />
      <BooleanQuestion name="cashier_retypes_orders" label="O caixa precisa redigitar ou reconstruir pedidos no fechamento?" error={errors.cashier_retypes_orders} />
      <BooleanQuestion name="had_cashier_lines" label="Já houve fila grande no caixa ou no fechamento da conta?" error={errors.had_cashier_lines} />
      <BooleanQuestion name="had_food_shortage_or_leftovers" label="Já faltou ou sobrou muita comida/bebida por falta de previsão?" error={errors.had_food_shortage_or_leftovers} />

      <section className="grid gap-4 rounded-[2rem] border border-amber-200 bg-white p-5 shadow-sm md:p-6">
        <label data-field="volunteer_management" className={fieldShellClass(Boolean(errors.volunteer_management))}>
          Como vocês organizam voluntários e/ou prestadores de serviços atualmente? *
          <textarea name="volunteer_management" rows={3} className={inputClass(Boolean(errors.volunteer_management))} placeholder="Ex.: escala em planilha, grupo de WhatsApp, responsáveis por barraca, cozinha, caixa, bingo, limpeza e apoio." />
          <FieldError message={errors.volunteer_management} />
        </label>
        <label data-field="accountability_process" className={fieldShellClass(Boolean(errors.accountability_process))}>
          Como fazem prestação de contas depois do evento? *
          <textarea name="accountability_process" rows={3} className={inputClass(Boolean(errors.accountability_process))} placeholder="Ex.: conferência manual de Pix, dinheiro e comprovantes; planilha com receitas, despesas, sobras, pagamentos e doações." />
          <FieldError message={errors.accountability_process} />
        </label>
        <label data-field="biggest_fear" className={fieldShellClass(Boolean(errors.biggest_fear))}>
          Qual é o maior medo para o dia do evento? *
          <textarea name="biggest_fear" rows={3} className={inputClass(Boolean(errors.biggest_fear))} placeholder="Ex.: fila grande, faltar comida, voluntário faltar, caixa não bater, bingo gerar dúvida ou prestação de contas ficar trabalhosa." />
          <FieldError message={errors.biggest_fear} />
        </label>
      </section>

      <section className="grid gap-3 rounded-[2rem] border border-amber-200 bg-white p-5 shadow-sm md:p-6">
        <label data-field="consent_whatsapp" className={`flex items-start gap-3 rounded-2xl border p-4 text-sm font-bold ${errors.consent_whatsapp ? "border-red-500 bg-red-50 text-red-800" : "border-green-200 bg-green-50 text-green-950"}`}>
          <input type="checkbox" name="consent_whatsapp" value="sim" className="mt-1 accent-green-800" />
          <span>Autorizo o Festa no Controle a enviar o retorno deste diagnóstico gratuito por WhatsApp.</span>
        </label>
        <FieldError message={errors.consent_whatsapp} />
        <label className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-bold text-stone-700">
          <input type="checkbox" name="consent_email" value="sim" defaultChecked className="mt-1 accent-green-800" />
          <span>Também aceito receber o retorno por e-mail e materiais sobre organização de eventos comunitários.</span>
        </label>
      </section>

      <button type="submit" disabled={isPending} className="inline-flex items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-70">
        {isPending ? "Enviando diagnóstico..." : "Enviar diagnóstico gratuito"} <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
