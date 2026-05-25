param(
  [string]$Output = "festa-no-controle-diagnostico-validacao-funil-atualizados.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip dos ajustes do diagnóstico, validação e funil..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-diagnostico-atualizado-" + [guid]::NewGuid().ToString())
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
  "src/app/diagnostico",
  "src/app/gestao",
  "src/app/admin/comercial",

  "src/components/AppHeader.tsx",
  "src/components/LogoFestaNoControle.tsx",

  "src/lib/commercialMessages.ts",
  "src/lib/diagnosticValidation.ts",
  "src/lib/eventSimulation.ts",
  "src/lib/mail.ts",
  "src/lib/supabaseServer.ts",

  "supabase/migrations/031_festa_no_controle_commercial_base.sql",
  "supabase/migrations/032_commercial_journey_bingo_botconversa.sql",
  "supabase/migrations/033_diagnostic_validation_followup_simulation.sql",

  "docs/implantacao/passo-a-passo-diagnostico-validacao-funil.md",
  "scripts/dev/fix-encoding.ps1",
  "scripts/dev/check-encoding.ps1",
  "README_AJUSTES_DIAGNOSTICO_VALIDACAO_FUNIL.md"
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

Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $outPath -Force
Remove-Item $temp -Recurse -Force

Write-Host ""
Write-Host "Zip gerado com sucesso:" -ForegroundColor Green
Write-Host $outPath
