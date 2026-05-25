# Correção typecheck - Gestão de Leads

## Ajuste realizado

O erro ocorria porque a lista de follow-ups podia vir de duas origens:

1. `commercial_followups`, com `id`;
2. fallback local, sem `id`.

O TypeScript corretamente apontou que `followup.id` não existe em todos os casos.

A correção cria o tipo `FollowupViewItem` com `id?: string` e tipa a lista renderizada como `FollowupViewItem[]`.

## Arquivo atualizado

- `src/app/admin/comercial/leads/page.tsx`
