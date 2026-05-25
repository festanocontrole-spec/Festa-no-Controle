# Ajuste do diagnóstico

Arquivos corrigidos:

- `src/app/diagnostico/DiagnosticForm.tsx`
- `src/app/diagnostico/actions.ts`

Correções principais:

1. O formulário usa `formAction` retornado pelo `useActionState`.
2. O submit do diagnóstico grava o lead usando apenas colunas da base comercial inicial.
3. Campos comerciais mais novos (`consent_whatsapp`, `consent_email`, `desired_solution`) passam a ser atualizados depois, sem bloquear o envio caso a migration mais recente ainda não tenha sido aplicada.
4. Em desenvolvimento, o erro técnico do Supabase aparece na mensagem da tela para facilitar correção.
