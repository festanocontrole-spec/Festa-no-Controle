import DiagnosticForm from "./DiagnosticForm";

export default function DiagnosticPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_52%,#f7fee7_100%)]">
      <section className="mx-auto max-w-5xl px-4 pt-6 pb-14 sm:px-5 md:pt-10">
        <div className="mb-6 rounded-[2rem] border border-amber-200 bg-white p-5 shadow-sm md:mb-8 md:p-8">
          <p className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-green-900">
            Diagnóstico gratuito
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight text-green-950 md:text-5xl">
            Sua festa está preparada para vender mais e ter menos correria?
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-stone-700">
            Responda algumas perguntas rápidas. A primeira leitura indica onde começar: caixa sem retrabalho, receita antecipada, planejamento, prestação de contas ou gestão de bingo.
          </p>
        </div>

        <DiagnosticForm />
      </section>
    </main>
  );
}
