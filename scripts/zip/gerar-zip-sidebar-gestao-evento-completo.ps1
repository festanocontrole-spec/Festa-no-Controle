param(
  [string]$Output = "festa-no-controle-sidebar-gestao-evento-completo.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-sidebar-completo-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null

$items = @(
  "src/components/CommercialAdminNav.tsx",
  "src/app/admin/comercial",
  "docs/implantacao/passo-a-passo-sidebar-gestao-evento-completo.md",
  "scripts/zip/gerar-zip-sidebar-gestao-evento-completo.ps1"
)

foreach ($item in $items) {
  $source = Join-Path $root $item
  if (Test-Path $source) {
    $dest = Join-Path $temp $item
    $destDir = Split-Path $dest -Parent
    if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    if ((Get-Item $source).PSIsContainer) { Copy-Item $source $dest -Recurse -Force } else { Copy-Item $source $dest -Force }
    Write-Host "Incluído: $item" -ForegroundColor Green
  } else {
    Write-Host "Não encontrado: $item" -ForegroundColor Yellow
  }
}

Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $outPath -Force
Remove-Item $temp -Recurse -Force
Write-Host "Zip gerado em: $outPath" -ForegroundColor Green
