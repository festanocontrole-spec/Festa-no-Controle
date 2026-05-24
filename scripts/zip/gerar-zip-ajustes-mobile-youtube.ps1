param(
  [string]$Output = "festa-no-controle-ajustes-mobile-youtube.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip dos ajustes mobile-first e YouTube..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-youtube-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null

$items = @(
  "package.json",
  "package-lock.json",
  ".env.example",
  "next.config.ts",
  "tsconfig.json",
  "postcss.config.mjs",
  "eslint.config.mjs",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/globals.css",
  "src/components/AppHeader.tsx",
  "src/components/LogoFestaNoControle.tsx",
  "src/app/diagnostico",
  "src/app/demo-festa-junina",
  "src/app/gestao",
  "src/lib/commercialMessages.ts",
  "docs/comercial/landing-mobile-first-textos.md",
  "docs/comercial/roteiros-videos-youtube.md",
  "docs/implantacao/passo-a-passo-mobile-youtube.md",
  "scripts/dev/fix-encoding.ps1",
  "scripts/dev/check-encoding.ps1",
  "scripts/zip/gerar-zip-ajustes-mobile-youtube.ps1"
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

Write-Host "Zip gerado com sucesso: $outPath" -ForegroundColor Green
