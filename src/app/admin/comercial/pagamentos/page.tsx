import { CommercialAdminHero, CommercialAdminNav } from "@/components/CommercialAdminNav";
import { commercialManagementItems } from "@/lib/commercialCatalog";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_55%,#f7fee7_100%)] lg:pl-72">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-5 md:py-8">
        <CommercialAdminHero eyebrow="Gestão interna" title="Pagamentos" description="Acompanhamento financeiro por proposta, evento e cliente." />
        <CommercialAdminNav currentHref="/admin/comercial/pagamentos" />
        <section className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Direção recomendada</p>
          <h2 className="mt-2 text-2xl font-black text-green-950">Pagamentos</h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-700">Controle valor fixo, taxa simbólica, cortesia, percentual digital, comprovantes e status de pagamento sem misturar com a prestação de contas do cliente.</p>
        </section>
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {commercialManagementItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-3xl border border-amber-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <item.icon className="mb-3 h-6 w-6 text-green-800" />
              <p className="font-black text-green-950">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-stone-700">{item.description}</p>
            </a>
          ))}
        </section>
      </section>
    </main>
  );
}
