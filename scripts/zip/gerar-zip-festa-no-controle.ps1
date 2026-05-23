param(
  [string]$Output = "festa-no-controle-base-comercial.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$include = @(
  "package.json",
  "package-lock.json",
  ".env.example",
  "next.config.ts",
  "tsconfig.json",
  "eslint.config.mjs",
  "postcss.config.mjs",
  "src",
  "supabase",
  "scripts",
  "docs"
)

$temp = Join-Path $env:TEMP ("festa-no-controle-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null

foreach ($item in $include) {
  $path = Join-Path $root $item
  if (Test-Path $path) {
    Copy-Item $path -Destination $temp -Recurse -Force
  }
}

Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $outPath -Force
Remove-Item $temp -Recurse -Force

Write-Host "Zip gerado em: $outPath" -ForegroundColor Green