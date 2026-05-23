param(
  [string]$Output = "festa-no-controle-erro-build-package-json.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip para análise do erro de build..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-build-error-" + [guid]::NewGuid().ToString())
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
  "scripts/dev/setup-local.ps1",
  "scripts/setup-produto-festa-no-controle.ps1"
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

# Inclui informações úteis sem expor .env.local
$infoPath = Join-Path $temp "BUILD_ERROR_INFO.txt"

@"
Projeto: Festa no Controle
Erro: package.json com caractere BOM no início
Comando executado: npm run build

Arquivos principais para análise:
- package.json
- package-lock.json
- src/app/globals.css
- src/app/layout.tsx
- next.config.ts
- postcss.config.mjs
- eslint.config.mjs
- tsconfig.json

Observação:
Não incluir .env.local no zip.
"@ | Set-Content $infoPath -Encoding UTF8

Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $outPath -Force

Remove-Item $temp -Recurse -Force

Write-Host ""
Write-Host "Zip gerado com sucesso:" -ForegroundColor Green
Write-Host $outPath