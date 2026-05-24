import Link from "next/link";
import { ArrowRight, LockKeyhole, MessageCircle, ShieldCheck } from "lucide-react";

export default function GestaoPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_55%,#f7fee7_100%)]">
      <section className="mx-auto max-w-5xl px-5 pt-10 pb-14">
        <div className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-xl md:p-8">
          <p className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-green-900">
            Área exclusiva
          </p>
          <h1 className="mt-4 text-3xl font-black text-green-950 md:text-5xl">Gestão do Festa no Controle</h1>
          <p className="mt-4 max-w-3xl leading-7 text-stone-700">
            Esta área é reservada para os responsáveis pela operação do Festa no Controle. Aqui ficam os diagnósticos recebidos, próximos contatos, propostas, acessos dos clientes, pagamentos, pós-venda e reativação para novos eventos.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <LockKeyhole className="mb-3 h-7 w-7 text-green-800" />
              <h2 className="font-black text-green-950">Acesso restrito</h2>
              <p className="mt-2 text-sm leading-6 text-stone-700">Requer login e senha dos responsáveis autorizados.</p>
            </article>
            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <MessageCircle className="mb-3 h-7 w-7 text-green-800" />
              <h2 className="font-black text-green-950">Retorno rápido</h2>
              <p className="mt-2 text-sm leading-6 text-stone-700">Cada diagnóstico gera próxima ação e mensagem sugerida para WhatsApp.</p>
            </article>
            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <ShieldCheck className="mb-3 h-7 w-7 text-green-800" />
              <h2 className="font-black text-green-950">Jornada completa</h2>
              <p className="mt-2 text-sm leading-6 text-stone-700">Do primeiro acesso ao pós-evento, com reativação para próxima edição.</p>
            </article>
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-green-950 p-6 text-white">
            <h2 className="text-2xl font-black">Ainda não preencheu o diagnóstico gratuito?</h2>
            <p className="mt-3 leading-7 text-amber-50">
              O diagnóstico é o caminho certo para entendermos sua festa antes de falar de sistema, preço ou implantação.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/diagnostico" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-green-950 hover:bg-amber-50" prefetch={false}>
                Fazer diagnóstico gratuito <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/admin/comercial/leads" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black text-white hover:bg-white/10" prefetch={false}>
                Entrar na Gestão
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
