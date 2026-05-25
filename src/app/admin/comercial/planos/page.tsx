import { CommercialAdminHero, CommercialAdminNav } from "@/components/CommercialAdminNav";
import { commercialOffers, commercialPlans } from "@/lib/commercialCatalog";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_55%,#f7fee7_100%)]">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-5 md:py-8">
        <CommercialAdminHero eyebrow="Gestão interna" title="Planos e ofertas" description="Catálogo de planos, módulos, valores e estratégias de primeira oferta." />
        <CommercialAdminNav currentHref="/admin/comercial/planos" />
        <section className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Direção recomendada</p>
          <h2 className="mt-2 text-2xl font-black text-green-950">Planos e ofertas</h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-700">Use esta área para consultar e evoluir os planos Essencial, Organização, Completo, Social, Bingo no Controle e as ofertas A, B, C e D.</p>
        </section>
        <section className="grid gap-4 lg:grid-cols-2">
          {commercialPlans.map((plan) => (
            <article key={plan.name} className="rounded-3xl border border-amber-200 bg-white p-5 shadow-sm">
              <p className="text-xl font-black text-green-950">{plan.name}</p>
              <p className="mt-1 font-black text-amber-800">{plan.price}</p>
              <p className="mt-3 text-sm leading-6 text-stone-700">{plan.audience}</p>
              <div className="mt-4 rounded-2xl bg-green-50 p-4 text-sm leading-6 text-stone-700">
                <strong className="text-green-950">Melhor uso:</strong> {plan.bestFor}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Estratégias de primeira oferta</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {commercialOffers.map((offer) => (
              <article key={offer.code} className="rounded-2xl bg-amber-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Opção {offer.code}</p>
                <h2 className="mt-1 font-black text-green-950">{offer.title}</h2>
                <p className="mt-2 text-sm leading-6 text-stone-700">{offer.whenToUse}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
