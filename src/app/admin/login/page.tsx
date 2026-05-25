import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "./admin-login-form";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const nextParam = params?.next;
  const next = Array.isArray(nextParam) ? nextParam[0] ?? "/admin/comercial/leads" : nextParam ?? "/admin/comercial/leads";
  const erroParam = params?.erro;
  const erro = Array.isArray(erroParam) ? erroParam[0] : erroParam;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_52%,#f7fee7_100%)] px-4 py-10 text-stone-900 sm:px-5">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full rounded-[2rem] border border-amber-200 bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-7">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-900 text-sm font-black text-white shadow-lg ring-4 ring-green-100">
              FNC
            </div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-amber-700">
              <ShieldCheck className="h-4 w-4" /> Gestão exclusiva
            </p>
            <h1 className="mt-2 text-3xl font-black text-green-950">Acesso ao Festa no Controle</h1>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Área reservada para responsáveis autorizados acompanharem diagnósticos, leads, follow-ups e implantações.
            </p>
          </div>

          {erro ? (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              {erro}
            </div>
          ) : null}

          <AdminLoginForm next={next} />

          <div className="mt-6 grid gap-3 text-center text-sm">
            <Link href="/diagnostico" className="inline-flex items-center justify-center gap-2 rounded-full bg-green-50 px-4 py-3 font-black text-green-950 ring-1 ring-green-100" prefetch={false}>
              <LockKeyhole className="h-4 w-4" /> Não sou da gestão: fazer diagnóstico gratuito
            </Link>
            <Link href="/" className="font-bold text-green-900 underline decoration-green-300 underline-offset-4" prefetch={false}>
              Voltar para a página pública
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
