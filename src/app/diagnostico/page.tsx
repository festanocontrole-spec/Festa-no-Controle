import { ClipboardCheck, Send } from "lucide-react";
import { submitCommercialDiagnostic } from "./actions";

const booleanOptions = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
  { value: "nao-sei", label: "Não sei / depende" },
];

function BooleanQuestion({ name, label }: { name: string; label: string }) {
  return (
    <fieldset className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
      <legend className="mb-3 text-sm font-black text-green-950">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {booleanOptions.map((option) => (
          <label key={option.value} className="flex cursor-pointer items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-sm font-bold text-stone-700">
            <input type="radio" name={name} value={option.value} className="accent-green-800" />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function DiagnosticPage({ searchParams }: { searchParams?: Promise<{ erro?: string }> }) {
  void searchParams;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_52%,#f7fee7_100%)]">
      <section className="mx-auto max-w-5xl px-5 py-10">
        <div className="mb-8 rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm md:p-8">
          <p className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-green-900">
            Diagnóstico gratuito
          </p>
          <h1 className="mt-4 text-3xl font-black text-green-950 md:text-5xl">
            Sua festa está preparada para vender mais e ter menos correria?
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-stone-700">
            Responda algumas perguntas rápidas. O sistema vai registrar o lead no CRM comercial e sugerir a oferta mais adequada: caixa sem retrabalho, receita antecipada, planejamento ou prestação de contas.
          </p>
        </div>

        <form action={submitCommercialDiagnostic} className="grid gap-5">
          <section className="grid gap-4 rounded-[2rem] border border-amber-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-6">
            <div className="md:col-span-2">
              <h2 className="flex items-center gap-2 text-xl font-black text-green-950">
                <ClipboardCheck className="h-5 w-5" /> Dados para contato
              </h2>
              <p className="mt-1 text-sm text-stone-600">Esses dados ficam no CRM para follow-up consultivo.</p>
            </div>

            <label className="grid gap-2 text-sm font-bold text-stone-700">
              Nome da entidade/organização *
              <input required name="organization_name" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700" placeholder="Ex.: Comunidade São João" />
            </label>

            <label className="grid gap-2 text-sm font-bold text-stone-700">
              Nome do responsável *
              <input required name="contact_name" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700" placeholder="Nome de quem organiza" />
            </label>

            <label className="grid gap-2 text-sm font-bold text-stone-700">
              WhatsApp *
              <input required name="contact_whatsapp" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700" placeholder="(19) 99999-9999" />
            </label>

            <label className="grid gap-2 text-sm font-bold text-stone-700">
              E-mail
              <input type="email" name="contact_email" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700" placeholder="email@exemplo.com" />
            </label>

            <label className="grid gap-2 text-sm font-bold text-stone-700">
              Cidade
              <input name="city" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700" placeholder="Campinas" />
            </label>

            <label className="grid gap-2 text-sm font-bold text-stone-700">
              Estado
              <input name="state" maxLength={2} className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 uppercase outline-none focus:border-green-700" placeholder="SP" />
            </label>
          </section>

          <section className="grid gap-4 rounded-[2rem] border border-amber-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-black text-green-950">Sobre o próximo evento</h2>
            </div>

            <label className="grid gap-2 text-sm font-bold text-stone-700">
              Tipo de evento
              <select name="event_type" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700">
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
            </label>

            <label className="grid gap-2 text-sm font-bold text-stone-700">
              Público esperado
              <input type="number" min="1" name="expected_audience" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700" placeholder="Ex.: 500" />
            </label>

            <label className="grid gap-2 text-sm font-bold text-stone-700">
              Data aproximada do próximo evento
              <input type="date" name="next_event_date" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700" />
            </label>

            <label className="grid gap-2 text-sm font-bold text-stone-700 md:col-span-2">
              Principal dor hoje *
              <textarea required name="main_pain" rows={4} className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700" placeholder="Ex.: fila no caixa, voluntários, falta/sobra de comida, controle de Pix, prestação de contas..." />
            </label>
          </section>

          <BooleanQuestion name="sells_tickets_before" label="Vocês vendem convites ou reservas antes do evento?" />
          <BooleanQuestion name="uses_paper_tickets" label="Vocês ainda dependem de fichas ou convites em papel?" />
          <BooleanQuestion name="cashier_retypes_orders" label="O caixa precisa redigitar ou reconstruir pedidos no fechamento?" />
          <BooleanQuestion name="had_cashier_lines" label="Já houve fila grande no caixa ou no fechamento da conta?" />
          <BooleanQuestion name="had_food_shortage_or_leftovers" label="Já faltou ou sobrou muita comida/bebida por falta de previsão?" />

          <section className="grid gap-4 rounded-[2rem] border border-amber-200 bg-white p-5 shadow-sm md:p-6">
            <label className="grid gap-2 text-sm font-bold text-stone-700">
              Como vocês organizam voluntários hoje?
              <textarea name="volunteer_management" rows={3} className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-stone-700">
              Como fazem prestação de contas depois do evento?
              <textarea name="accountability_process" rows={3} className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-stone-700">
              Qual é o maior medo para o dia do evento?
              <textarea name="biggest_fear" rows={3} className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-green-700" />
            </label>
          </section>

          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:bg-green-900">
            Enviar diagnóstico e gerar lead <Send className="h-4 w-4" />
          </button>
        </form>
      </section>
    </main>
  );
}
