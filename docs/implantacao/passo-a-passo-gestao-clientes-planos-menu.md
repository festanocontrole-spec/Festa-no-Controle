# Festa no Controle — Ajustes de Gestão, clientes, planos e menu

## Objetivo

Esta atualização transforma a área de Gestão em uma estrutura comercial mais completa, sem perder a lógica que já funcionava no Tucxa.

## Estratégia adotada

A recomendação é manter o Festa no Controle como plataforma única multi-cliente:

- cada cliente vira uma organização/cliente dentro da plataforma;
- cada cliente pode ter um ou mais eventos;
- os módulos contratados ficam vinculados ao cliente/contrato;
- o Bingo no Controle entra como produto/módulo comercial próprio, podendo ser vendido sozinho ou junto ao Festa no Controle;
- a opção Menu continua existindo para organizar a experiência de gestão por cliente, evento e módulo.

Instalação separada só deve ser exceção para cliente grande, contrato específico, domínio próprio ou exigência de isolamento.

## Arquivos alterados

- `src/app/diagnostico/actions.ts`
- `src/app/diagnostico/obrigado/page.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/comercial/page.tsx`
- `src/app/admin/comercial/leads/page.tsx`
- `src/components/CommercialAdminNav.tsx`
- `src/lib/commercialCatalog.ts`
- novas páginas em `src/app/admin/comercial/*`
- `supabase/migrations/036_commercial_clients_plans_modules_menu.sql`

## Passo a passo

1. Fazer backup dos arquivos atuais.
2. Copiar os arquivos do zip para a raiz do projeto, preservando a estrutura de pastas.
3. Executar:

```powershell
npm run fix:encoding
npm run check:encoding
npm run typecheck
npm run build
```

4. No Supabase SQL Editor, executar:

```text
supabase/migrations/036_commercial_clients_plans_modules_menu.sql
```

5. Subir localmente:

```powershell
npm run dev
```

6. Testar:

- `/diagnostico/obrigado`
- `/admin`
- `/admin/comercial`
- `/admin/comercial/leads`
- `/admin/comercial/clientes`
- `/admin/comercial/planos`
- `/admin/comercial/menu`
- `/admin/festa-junina/menu`

## Validações importantes

- A página de obrigado não deve exibir bastidores internos de e-mail, WhatsApp e régua de contato.
- Follow-up de 7 dias antes do evento não deve aparecer se a data cair no passado.
- A Gestão deve mostrar a navegação completa: Painel, Leads, Clientes, Planos, Propostas, Pagamentos, Acessos, Pós-venda, Bingo, Menu e Configurações.
- O menu do Tucxa continua preservado em `/admin/festa-junina/menu`.
