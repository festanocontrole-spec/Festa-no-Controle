param(
  [string]$Output = "festa-no-controle-ajustes-landing-bingo-gestao-completo.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip de revisão: landing, gestão, diagnóstico, BotConversa e Bingo no Controle..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-ajustes-completo-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null

$items = @(
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/diagnostico/page.tsx",
  "src/app/diagnostico/actions.ts",
  "src/app/diagnostico/obrigado/page.tsx",
  "src/app/gestao/page.tsx",
  "src/app/demo-festa-junina/page.tsx",
  "src/app/festa-junina/page.tsx",
  "src/app/admin/comercial/leads/page.tsx",
  "src/components/AppHeader.tsx",
  "src/components/LogoFestaNoControle.tsx",
  "src/lib/commercialMessages.ts",
  "supabase/migrations/032_commercial_journey_bingo_botconversa.sql",
  "docs/produto/bingo-no-controle.md",
  "docs/comercial/roteiros-videos-youtube.md",
  "docs/comercial/botconversa-funil.md",
  "docs/implantacao/passo-a-passo-ajustes-landing-bingo-gestao.md"
)

foreach ($item in $items) {
  $source = Join-Path $root $item
  if (Test-Path $source) {
    $dest = Join-Path $temp $item
    $destDir = Split-Path $dest -Parent
    if (!(Test-Path $destDir)) {
      New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }
    Copy-Item $source $dest -Force
    Write-Host "Incluído: $item" -ForegroundColor Green
  } else {
    Write-Host "Não encontrado: $item" -ForegroundColor Yellow
  }
}

$infoPath = Join-Path $temp "README_AJUSTES.md"
@"
Ajustes incluídos:

1. Remoção do espaço excessivo entre cabeçalho e conteúdo.
2. Cabeçalho com CTA de Diagnóstico gratuito sempre visível.
3. Troca de CRM por Gestão na comunicação pública.
4. Nova página /gestao explicando acesso exclusivo.
5. Nova página /demo-festa-junina para evitar erro ao clicar no menu.
6. /festa-junina redireciona para /demo-festa-junina.
7. Landing reescrita com Deep Dive: dores que o sistema resolve, e não problemas que ele traz.
8. Inclusão do Bingo no Controle como produto independente e módulo do Festa no Controle.
9. Diagnóstico passa a reconhecer leads com interesse em Bingo.
10. Página de obrigado mais persuasiva, com demo e próximo contato.
11. Preparação de e-mail de agradecimento com cópia para festanocontrole@gmail.com.
12. Preparação de webhook para BotConversa via BOTCONVERSA_NEW_LEAD_WEBHOOK_URL.
13. Migration 032 para jornada comercial, pagamentos, acesso, pós-venda e pacotes Bingo no Controle.
"@ | Set-Content $infoPath -Encoding UTF8

Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $outPath -Force
Remove-Item $temp -Recurse -Force

Write-Host ""
Write-Host "Zip gerado com sucesso:" -ForegroundColor Green
Write-Host $outPath
