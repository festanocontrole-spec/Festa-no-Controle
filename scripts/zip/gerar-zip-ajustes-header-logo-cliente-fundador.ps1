param(
  [string]$Output = "festa-no-controle-ajustes-header-logo-cliente-fundador.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip dos ajustes de header, logo e Cliente Fundador..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-cliente-fundador-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null

$items = @(
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/diagnostico/page.tsx",
  "src/app/admin/comercial/leads/page.tsx",
  "src/components/AppHeader.tsx",
  "src/components/LogoFestaNoControle.tsx",
  "docs/comercial/oferta-cliente-fundador.md",
  "docs/comercial/regulamento-cliente-fundador.md",
  "docs/comercial/checklist-gratuidade.md",
  "scripts/zip/gerar-zip-ajustes-header-logo-cliente-fundador.ps1"
)

foreach ($item in $items) {
  $source = Join-Path $root $item

  if (Test-Path $source) {
    $dest = Join-Path $temp $item
    $destDir = Split-Path $dest -Parent

    if (!(Test-Path $destDir)) {
      New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    Copy-Item $source $dest -Force
    Write-Host "Incluído: $item" -ForegroundColor Green
  } else {
    Write-Host "Não encontrado: $item" -ForegroundColor Yellow
  }
}

$infoPath = Join-Path $temp "README_AJUSTES_HEADER_LOGO_CLIENTE_FUNDADOR.md"

@"
# Ajustes incluídos

1. Novo componente `LogoFestaNoControle`.
2. Novo componente `AppHeader` fixo/sticky para todas as páginas.
3. Header com linha azul imediatamente abaixo da navegação.
4. Contexto do cabeçalho muda conforme a página.
5. Texto corrigido para `Demo Festa Junina`.
6. Home sem header duplicado.
7. Card branco da direita alinhado ao topo do bloco da esquerda.
8. Seção `Programa Cliente Fundador` adicionada à landing page.
9. Documentos comerciais incluídos:
   - oferta pronta;
   - regulamento simples;
   - checklist de decisão de gratuidade.

## Validação recomendada

npm run fix:encoding
npm run check:encoding
npm run lint
npm run typecheck
npm run build
"@ | Set-Content $infoPath -Encoding UTF8

Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $outPath -Force
Remove-Item $temp -Recurse -Force

Write-Host ""
Write-Host "Zip gerado com sucesso:" -ForegroundColor Green
Write-Host $outPath
