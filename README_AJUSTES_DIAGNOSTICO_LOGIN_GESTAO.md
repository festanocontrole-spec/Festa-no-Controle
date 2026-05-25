# Ajustes: diagnóstico, obrigado, login e gestão

Este pacote corrige:

1. Envio do diagnóstico: agora usa `useActionState`, mostra erro em tela quando o servidor falha e redireciona para `/diagnostico/obrigado` quando o lead é gravado.
2. Submit robusto: SMTP e BotConversa não bloqueiam a gravação do lead.
3. Login de Gestão: remove textos e imagem do Tucxa, ajusta comunicação para Festa no Controle.
4. Admin: inclui migration SQL para criar `public.admin_profiles` e liberar `festanocontrole@gmail.com` como admin.
5. Base comercial: a migration também garante as tabelas mínimas do diagnóstico, caso migrations anteriores não tenham sido aplicadas.

Execute a migration 034 no Supabase SQL Editor antes de testar o login e o diagnóstico em produção.
