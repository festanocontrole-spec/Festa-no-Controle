param(
  [string]$Output = "festa-no-controle-ajuste-encoding-build.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Corrigindo encoding antes de gerar o zip..." -ForegroundColor Cyan
powershell -ExecutionPolicy Bypass -File scripts/dev/fix-encoding.ps1

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-ajuste-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null

$files = @(
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "postcss.config.mjs",
  "eslint.config.mjs",
  "tsconfig.json",
  ".env.example",
  "src/app/globals.css",
  "src/app/layout.tsx",
  "supabase/migrations/031_festa_no_controle_commercial_base.sql",
  "scripts/dev/fix-encoding.ps1",
  "scripts/dev/check-encoding.ps1",
  "scripts/dev/setup-local.ps1",
  "scripts/setup-produto-festa-no-controle.ps1",
  "scripts/db/check-commercial-base.ps1",
  "scripts/zip/gerar-zip-ajuste-encoding-build.ps1"
)

foreach ($file in $files) {
  $source = Join-Path $root $file

  if (Test-Path $source) {
    $dest = Join-Path $temp $file
    $destDir = Split-Path $dest -Parent

    if (!(Test-Path $destDir)) {
      New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    Copy-Item $source $dest -Force
    Write-Host "Incluído: $file" -ForegroundColor Green
  } else {
    Write-Host "Não encontrado: $file" -ForegroundColor Yellow
  }
}

Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $outPath -Force
Remove-Item $temp -Recurse -Force

Write-Host ""
Write-Host "Zip gerado com sucesso:" -ForegroundColor Green
Write-Host $outPath
