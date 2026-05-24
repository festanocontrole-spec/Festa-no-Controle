# BotConversa no funil do Festa no Controle

## Recomendação

Usar o BotConversa como motor de resposta rápida no WhatsApp, não como substituto da Gestão interna.

## Fluxo recomendado

1. Lead preenche o diagnóstico gratuito no site.
2. O Festa no Controle salva o lead e envia e-mail de agradecimento.
3. O Festa no Controle envia um webhook para o BotConversa com nome, WhatsApp, perfil, oferta sugerida e mensagem pronta.
4. O BotConversa inicia ou direciona o fluxo de atendimento.
5. Em até 15 minutos, a equipe faz contato humano ou semi-automatizado.
6. Se o lead responder, o atendimento segue para agendamento de demo, proposta ou piloto.

## Variável de ambiente

Configurar no Vercel e no `.env.local`:

```env
BOTCONVERSA_NEW_LEAD_WEBHOOK_URL=https://SEU_WEBHOOK_DO_BOTCONVERSA
```

## Campos enviados

- name
- phone
- email
- organization_name
- dominant_profile
- recommended_offer
- next_action_note
- suggested_whatsapp_message

## Regra prática

Automação para velocidade. Humano para confiança. Gestão interna para histórico e decisão.
