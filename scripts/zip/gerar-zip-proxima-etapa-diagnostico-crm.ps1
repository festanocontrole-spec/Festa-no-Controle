param(
  [string]$Output = "festa-no-controle-diagnostico-crm.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-diagnostico-crm-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null

$files = @(
  "package.json",
  "package-lock.json",
  ".env.example",
  "next.config.ts",
  "postcss.config.mjs",
  "eslint.config.mjs",
  "tsconfig.json",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/diagnostico/actions.ts",
  "src/app/diagnostico/page.tsx",
  "src/app/diagnostico/obrigado/page.tsx",
  "src/app/admin/comercial/leads/page.tsx",
  "src/lib/supabaseServer.ts",
  "supabase/migrations/031_festa_no_controle_commercial_base.sql",
  "scripts/dev/fix-encoding.ps1",
  "scripts/dev/check-encoding.ps1",
  "scripts/db/check-commercial-base.ps1",
  "scripts/zip/gerar-zip-proxima-etapa-diagnostico-crm.ps1",
  "docs/implantacao/proxima-etapa-diagnostico-crm.md"
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

Write-Host "Zip gerado em: $outPath" -ForegroundColor Green
