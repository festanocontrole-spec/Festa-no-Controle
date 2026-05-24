param(
  [string]$Output = "festa-no-controle-ajustes-mobile-landing-anchors.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip para ajustes de mobile, landing, anchors e copy..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-mobile-" + [guid]::NewGuid().ToString())
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
  "src/app/page.tsx",
  "src/app/globals.css",

  "src/components/AppHeader.tsx",
  "src/components/LogoFestaNoControle.tsx",
  "src/components",

  "src/lib",
  "src/app/diagnostico",
  "src/app/demo-festa-junina",
  "src/app/festa-junina",
  "src/app/gestao",
  "src/app/admin/comercial",
  "src/app/api",
  "src/app/login",

  "public",
  "docs/comercial",
  "docs/produto",
  "supabase/migrations"
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

1. Tornar a landing mobile first e corrigir header no celular.
2. Melhorar o header responsivo com CTA principal em destaque.
3. Criar barra sticky de âncoras para os principais tópicos da landing.
4. Reavaliar ordem da página: não abrir com vídeos, mas com promessa, CTA e dor resolvida.
5. Reescrever texto da seção de vídeos para linguagem orientada ao lead.
6. Ajustar texto do bloco Cliente Fundador para linguagem comercial adequada.
7. Melhorar recorrência do CTA Diagnóstico gratuito.
8. Rever disposição dos vídeos curtos na landing.
9. Preparar a landing para vídeos públicos curtos e futuros vídeos de onboarding.
10. Considerar sempre diferenciais de mercado, evitar mar vermelho e buscar oceano azul.

Não incluir:
- .env.local
- node_modules
- .next
- .git
"@ | Set-Content $infoPath -Encoding UTF8

Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $outPath -Force
Remove-Item $temp -Recurse -Force

Write-Host ""
Write-Host "Zip gerado com sucesso:" -ForegroundColor Green
Write-Host $outPath