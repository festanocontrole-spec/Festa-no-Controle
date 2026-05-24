# Passo a passo - ajustes landing, Bingo no Controle, Gestão e BotConversa

## 1. Fazer backup

```powershell
cd C:\Users\lacos\Documents\GitHub\festa-no-controle
mkdir _backup_landing_bingo_gestao -Force
Copy-Item src\app\layout.tsx _backup_landing_bingo_gestao\layout.tsx -Force
Copy-Item src\app\page.tsx _backup_landing_bingo_gestao\page.tsx -Force
Copy-Item src\components\AppHeader.tsx _backup_landing_bingo_gestao\AppHeader.tsx -Force
Copy-Item src\app\diagnostico\actions.ts _backup_landing_bingo_gestao\diagnostico-actions.ts -Force
```

## 2. Extrair o zip

Extrair o zip por cima da pasta do projeto, mantendo a estrutura de pastas.

## 3. Configurar variáveis opcionais

No `.env.local` e depois na Vercel:

```env
EMAIL_NOTIFICATIONS_ENABLED=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
SMTP_FROM=Festa no Controle <seu-email@gmail.com>
BOTCONVERSA_NEW_LEAD_WEBHOOK_URL=https://SEU_WEBHOOK_DO_BOTCONVERSA
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 4. Aplicar SQL no Supabase Web

Executar a migration `032_commercial_journey_bingo_botconversa.sql` no SQL Editor do Supabase.

## 5. Validar local

```powershell
npm run fix:encoding
npm run check:encoding
npm run lint
npm run typecheck
npm run build
npm run dev
```

## 6. Testar páginas

- http://localhost:3000
- http://localhost:3000/diagnostico
- http://localhost:3000/diagnostico/obrigado
- http://localhost:3000/demo-festa-junina
- http://localhost:3000/gestao
- http://localhost:3000/admin/comercial/leads

## 7. Commit

```powershell
git status
git add .
git commit -m "feat: ajustar landing, gestao, diagnostico e Bingo no Controle"
git push
```
