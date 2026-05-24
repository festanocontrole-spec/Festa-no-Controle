import type { Metadata } from "next";
import { AppHeader } from "@/components/AppHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Festa no Controle",
    template: "%s | Festa no Controle",
  },
  description:
    "Plataforma para vender, planejar, operar e prestar contas de festas comunitárias e beneficentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full bg-amber-50 text-stone-900">
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
