# Passo a passo - Diagnóstico, Obrigado, Login e Gestão

## 1. Aplicar arquivos

Extraia o zip na raiz do projeto `festa-no-controle`, mantendo a estrutura de pastas.

## 2. Rodar validações locais

```powershell
cd C:\Users\lacos\Documents\GitHub\festa-no-controle
npm run fix:encoding
npm run check:encoding
npm run typecheck
npm run build
```

## 3. Executar SQL no Supabase Web

No Supabase:

```text
SQL Editor > New query
```

Execute o arquivo:

```text
supabase/migrations/034_festa_no_controle_admin_profiles_and_diagnostic_submit.sql
```

Esse script cria `public.admin_profiles`, libera o usuário `festanocontrole@gmail.com` e garante a base comercial mínima do diagnóstico.

## 4. Testar diagnóstico

Acesse:

```text
/diagnostico
```

Preencha e envie. O esperado é abrir:

```text
/diagnostico/obrigado?...
```

Se o Supabase não estiver configurado corretamente, o formulário mostrará uma mensagem de erro visível em tela.

## 5. Testar Gestão

Acesse:

```text
/admin/comercial/leads
```

Se não estiver logado, entre com o usuário criado no Supabase Auth e liberado pela migration 034.

## 6. Commit

```powershell
git add -A
git commit -m "fix: corrigir envio do diagnostico e acesso da gestao"
git push origin main
```

Na Vercel, faça Redeploy sem cache se necessário.
