# Passo a passo — diagnóstico com validação, obrigado, e-mail, WhatsApp e simulação

## Objetivo da atualização

Esta atualização fortalece o diagnóstico público do Festa no Controle para aumentar confiança, conversão e segurança operacional.

O diagnóstico passa a deixar claro que:

- é gratuito;
- não pede senha;
- não pede cartão;
- não pede dados bancários;
- não realiza pagamento;
- não instala nada;
- não oferece download;
- o objetivo é ouvir o lead e sugerir um caminho inicial para o evento.

## O que foi incluído

1. Validação no navegador antes do envio.
2. Validação duplicada no servidor.
3. Destaque visual do primeiro campo pendente.
4. Rolagem automática até a primeira pergunta pendente.
5. Mensagem clara informando o que falta responder.
6. Estado e cidade com sugestões por lista e possibilidade de digitação.
7. Campos livres com textos de apoio mais claros.
8. Página de obrigado com recomendação, simulação inicial e próximos passos.
9. E-mail imediato para o lead com cópia para festanocontrole@gmail.com.
10. Mensagens prontas de WhatsApp e follow-ups na área de Gestão.
11. Migration 033 para reforçar campos comerciais e follow-ups.

## Arquivos principais

- `src/app/diagnostico/page.tsx`
- `src/app/diagnostico/DiagnosticForm.tsx`
- `src/app/diagnostico/actions.ts`
- `src/app/diagnostico/obrigado/page.tsx`
- `src/app/admin/comercial/leads/page.tsx`
- `src/lib/diagnosticValidation.ts`
- `src/lib/eventSimulation.ts`
- `src/lib/commercialMessages.ts`
- `src/lib/mail.ts`
- `supabase/migrations/033_diagnostic_validation_followup_simulation.sql`

## Ordem recomendada para atualizar

1. Fazer backup dos arquivos atuais.
2. Extrair o zip por cima do projeto.
3. Rodar correção de encoding.
4. Aplicar a migration 033 no Supabase Web.
5. Rodar lint/build.
6. Testar diagnóstico localmente.
7. Configurar variáveis SMTP e BotConversa na Vercel.
8. Fazer commit e push.

## Teste funcional

1. Acesse `/diagnostico`.
2. Tente enviar vazio.
3. Confirme se aparece alerta, destaque visual e rolagem automática.
4. Preencha respostas curtas nos campos de texto livre.
5. Confirme bloqueio por resposta curta.
6. Preencha tudo corretamente.
7. Envie.
8. Confirme redirecionamento para `/diagnostico/obrigado`.
9. Verifique o lead em `/admin/comercial/leads`.
10. Verifique se aparecem mensagens de follow-up.

## Observação estratégica

A simulação inicial usa premissas simples. Ela não deve ser apresentada como dimensionamento definitivo, mas como uma primeira leitura consultiva para orientar a conversa comercial.
