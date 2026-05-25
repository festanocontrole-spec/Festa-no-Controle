param(
  [string]$Output = "festa-no-controle-ajustes-diagnostico-login-gestao.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip para ajustes de diagnóstico, obrigado, login e gestão..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-diagnostico-login-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null

$items = @(
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "tsconfig.json",
  "postcss.config.mjs",
  "eslint.config.mjs",
  ".env.example",

  "src/app/layout.tsx",
  "src/app/globals.css",
  "src/app/page.tsx",

  "src/components/AppHeader.tsx",
  "src/components/LogoFestaNoControle.tsx",
  "src/components",

  "src/app/diagnostico",
  "src/app/admin",
  "src/app/api",
  "src/app/gestao",
  "src/app/login",

  "src/lib",

  "src/middleware.ts",

  "supabase/migrations",
  "docs/comercial",
  "docs/produto",
  "docs/implantacao",
  "public"
)

foreach ($item in $items) {
  $source = Join-Path $root $item

  if (Test-Path $source) {
    $dest = Join-Path $temp $item
    $destDir = Split-Path $dest -Parent

    if (!(Test-Path $destDir)) {
      New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    if ((Get-Item $source).PSIsContainer) {
      Copy-Item $source $dest -Recurse -Force
    } else {
      Copy-Item $source $dest -Force
    }

    Write-Host "Incluído: $item" -ForegroundColor Green
  } else {
    Write-Host "Não encontrado: $item" -ForegroundColor Yellow
  }
}

$infoPath = Join-Path $temp "AJUSTES_SOLICITADOS.txt"

@"
Ajustes solicitados:

IMPORTANTE:
A. Considerar principais requisitos, diferenciais e práticas de mercado para evitar Mar Vermelho e buscar Oceano Azul.
B. Manter sistema mobile friendly.
C. Considerar técnicas de Deep Dive do Marcelo Bragion.

Problemas atuais:

1. Ao enviar o diagnóstico:
   - os campos limpam;
   - não abre /diagnostico/obrigado;
   - não aparece erro no console;
   - não há confirmação visível do envio.

Ajustar:
   - submit do diagnóstico;
   - retorno de erro para usuário;
   - redirect para /diagnostico/obrigado;
   - persistência do lead no Supabase;
   - criação dos follow-ups;
   - mensagem de sucesso/erro;
   - logs seguros no servidor, sem expor dados sensíveis.

2. Página de login/gestão:
   - remover informações do Tucxa;
   - trocar textos para Festa no Controle;
   - explicar que a área é exclusiva dos responsáveis pelo Festa no Controle;
   - manter CTA para diagnóstico gratuito.

3. Permissão administrativa:
   - usuário existe no Supabase Auth;
   - mas aparece erro "usuário autenticado, mas sem permissão administrativa";
   - revisar uso da tabela admin_profiles;
   - criar SQL/migration para permitir o e-mail festanocontrole@gmail.com como admin.

4. Gestão de leads:
   - permitir acessar /admin/comercial/leads;
   - verificar se lead aparece;
   - verificar follow-ups e mensagens de WhatsApp.

5. Envio de e-mail:
   - e-mail imediato para lead;
   - cópia para festanocontrole@gmail.com;
   - caso SMTP não esteja configurado, não pode quebrar o submit do diagnóstico;
   - deve salvar lead mesmo que o e-mail falhe.

Não incluir:
- .env.local
- node_modules
- .next
- .git
"@ | Set-Content $infoPath -Encoding UTF8

Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $outPath -Force
Remove-Item $temp -Recurse -Force

Write-Host ""
Write-Host "Zip gerado com sucesso:" -ForegroundColor Green
Write-Host $outPath