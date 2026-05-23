param(
  [string]$Output = "festa-no-controle-ajustes-header-logo.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip para ajustes de header, logo e landing..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-ajustes-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null

$items = @(
  "package.json",
  "next.config.ts",
  "tsconfig.json",
  "postcss.config.mjs",
  "eslint.config.mjs",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/globals.css",
  "src/app/diagnostico/page.tsx",
  "src/app/diagnostico/obrigado/page.tsx",
  "src/app/admin/comercial/leads/page.tsx",
  "src/components/Header.tsx",
  "src/components/Logo.tsx",
  "src/components/NavBar.tsx",
  "src/components/SiteHeader.tsx",
  "src/components/StickyHeader.tsx",
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
1. Criar um logo com o texto 'Festa no Controle' para substituir o texto simples.
2. Retirar o espaço entre o logo/texto e a linha azul.
3. Alinhar o quadro branco maior à direita com o bloco da esquerda.
4. Tornar o cabeçalho fixo acima da linha azul.
5. O cabeçalho deve mudar conforme o contexto da página.
6. Mudar 'Demo Tucxa' para 'Demoo Festa Junina'.

Observação:
Se 'Demoo Festa Junina' foi digitado com um 'o' extra por engano, informar na revisão se o correto é 'Demo Festa Junina'.
"@ | Set-Content $infoPath -Encoding UTF8

Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $outPath -Force

Remove-Item $temp -Recurse -Force

Write-Host ""
Write-Host "Zip gerado com sucesso:" -ForegroundColor Green
Write-Host $outPath