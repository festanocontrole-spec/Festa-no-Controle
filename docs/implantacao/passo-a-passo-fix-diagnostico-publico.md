# Ajuste do envio do diagnóstico público

## Problema

O diagnóstico validava na tela, mas falhava na gravação do lead, mostrando mensagem genérica sobre tabelas comerciais.

## Ajustes aplicados

1. `src/app/diagnostico/actions.ts`
   - gera o UUID do lead antes do INSERT;
   - faz INSERT sem `.select()`, evitando erro quando a chave anon/RLS não permite SELECT público;
   - mantém follow-ups, diagnóstico e e-mail sem bloquear a gravação principal;
   - exibe detalhe técnico do Supabase quando o INSERT principal falhar.

2. `src/app/diagnostico/DiagnosticForm.tsx`
   - ajusta a mensagem de erro para diferenciar validação de campo pendente e falha de gravação.

3. `supabase/migrations/035_diagnostic_public_submit_rls_fix.sql`
   - garante tabelas e colunas;
   - cria/libera `admin_profiles`;
   - cria políticas RLS para permitir o INSERT do diagnóstico público;
   - mantém leitura/gestão restrita a admin autenticado.

## Passo a passo

1. Copiar os arquivos para o projeto.
2. Executar o SQL `035_diagnostic_public_submit_rls_fix.sql` no Supabase SQL Editor.
3. Conferir as variáveis na Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL`
4. Rodar:

```powershell
npm run fix:encoding
npm run check:encoding
npm run typecheck
npm run build
```

5. Commit/push:

```powershell
git add -A
git commit -m "fix: corrigir gravacao do diagnostico publico"
git push origin main
```

6. Redeploy na Vercel sem cache.

## Observação importante

Mesmo com as políticas RLS, o ideal em produção é configurar `SUPABASE_SERVICE_ROLE_KEY` na Vercel. A política pública existe para o diagnóstico não falhar se a action estiver usando anon key como fallback.
