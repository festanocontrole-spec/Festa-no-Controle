import Link from "next/link";
import { commercialManagementItems } from "@/lib/commercialCatalog";

export function CommercialAdminNav({ currentHref }: { currentHref?: string }) {
  return (
    <nav className="rounded-[1.5rem] border border-amber-200 bg-white p-3 shadow-sm" aria-label="Menu da Gestão interna">
      <div className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0">
        {commercialManagementItems.map((item) => {
          const active = currentHref === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={`inline-flex min-w-max items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-black transition lg:min-w-0 ${
                active ? "bg-green-900 text-white shadow-sm" : "bg-amber-50 text-green-950 hover:bg-green-50"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function CommercialAdminHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-black leading-tight text-green-950 md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-700 md:text-base">{description}</p>
    </div>
  );
}
