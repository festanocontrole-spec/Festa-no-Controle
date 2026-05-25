# Correção do build na Vercel

Erro corrigido: a página `src/app/admin/comercial/leads/page.tsx` importava `buildSecondFollowupMessage`, `buildThirdFollowupMessage` e `buildPreEventFollowupMessage`, mas a versão de `src/lib/commercialMessages.ts` enviada ao GitHub/Vercel não tinha esses exports.

Arquivos incluídos:
- `src/lib/commercialMessages.ts`
- `src/app/admin/comercial/leads/page.tsx`

Depois de copiar os arquivos, rode:

```powershell
npm run fix:encoding
npm run check:encoding
npm run typecheck
npm run build
git status
git add src/lib/commercialMessages.ts src/app/admin/comercial/leads/page.tsx
git commit -m "fix: alinhar mensagens comerciais com gestao de leads"
git push origin main
```
