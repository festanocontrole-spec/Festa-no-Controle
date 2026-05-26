import { CommercialAdminHero, CommercialAdminNav } from "@/components/CommercialAdminNav";


export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_55%,#f7fee7_100%)] lg:pl-72">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-5 md:py-8">
        <CommercialAdminHero eyebrow="Gestão interna" title="Menu" description="Cadastro e gestão dos menus da plataforma, dos clientes e dos eventos, mantendo a lógica já validada no Tucxa." />
        <CommercialAdminNav currentHref="/admin/comercial/menu" />
        <section className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Direção recomendada</p>
          <h2 className="mt-2 text-2xl font-black text-green-950">Menu</h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-700">Mantém a lógica já validada no Tucxa: cada módulo pode ter menu, hierarquia, ordem, página vinculada, status de uso e liberação por cliente/evento. Essa camada permite reaproveitar convites, combos, campanhas, cardápio, pedidos, caixa, relatórios e Bingo no Controle sem criar uma instalação separada para cada cliente.</p>
        </section>
        <section className="grid gap-4 lg:grid-cols-3">
          {["Menu da gestão interna", "Menu por cliente", "Menu por evento/módulo"].map((item) => (
            <article key={item} className="rounded-3xl border border-amber-200 bg-white p-5 shadow-sm">
              <p className="font-black text-green-950">{item}</p>
              <p className="mt-2 text-sm leading-6 text-stone-700">Permite organizar hierarquia, ordem, página vinculada, status e módulos liberados conforme o contrato.</p>
            </article>
          ))}
        </section>
        <div className="rounded-[2rem] border border-green-200 bg-green-50 p-5 text-sm leading-6 text-stone-700">
          <strong className="text-green-950">Recomendação:</strong> manter a opção “Menu” dentro da Gestão, pois ela permite configurar o que cada cliente enxerga e evita criar uma instalação separada para cada evento.
        </div>
      </section>
    </main>
  );
}
