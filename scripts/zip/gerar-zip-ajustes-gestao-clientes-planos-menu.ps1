param(
  [string]$Output = "festa-no-controle-ajustes-gestao-clientes-planos-menu.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip dos ajustes de Gestão, clientes, planos e menu..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-gestao-menu-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null

$items = @(
  "src/app/diagnostico/actions.ts",
  "src/app/diagnostico/obrigado/page.tsx",
  "src/app/admin/page.tsx",
  "src/app/admin/comercial",
  "src/components/CommercialAdminNav.tsx",
  "src/lib/commercialCatalog.ts",
  "supabase/migrations/036_commercial_clients_plans_modules_menu.sql",
  "docs/implantacao/passo-a-passo-gestao-clientes-planos-menu.md"
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

Write-Host "Zip gerado em: $outPath" -ForegroundColor Green
