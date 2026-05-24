param(
  [string]$Output = "festa-no-controle-ajustes-landing-bingo-gestao.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip para ajustes de landing, gestão, diagnóstico e Bingo..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-ajustes-" + [guid]::NewGuid().ToString())
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

  "src/components",
  "src/lib",

  "src/app/diagnostico",
  "src/app/admin/comercial",
  "src/app/festa-junina",
  "src/app/demo-festa-junina",
  "src/app/gestao",
  "src/app/login",

  "src/app/api",

  "supabase/migrations",
  "docs/comercial",
  "docs/produto",
  "docs/implantacao",
  "docs/roadmap",

  "public"
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

0. Remover espaço excessivo entre cabeçalho e conteúdo.
1. Corrigir quadro da direita da landing: o texto atual parece listar problemas que o Festa no Controle traz. Reescrever com Deep Dive, mostrando dores que ele resolve.
2. Incluir gestão completa do Bingo como possibilidade do Festa no Controle.
3. Criar posicionamento do sistema comercial de Bingo, nome recomendado: Bingo no Controle.
4. Reforçar CTA Diagnóstico gratuito em pontos estratégicos da landing.
5. Trocar CRM por Gestão no cabeçalho.
6. Link Gestão deve abrir página explicando que a área é exclusiva dos responsáveis e requer login/senha.
7. Página Gestão também deve oferecer CTA para diagnóstico gratuito.
8. Após diagnóstico, página de obrigado deve agradecer, sugerir Demo Festa Junina e indicar soluções recomendadas.
9. Preparar lógica para envio por e-mail com cópia para festanocontrole@gmail.com.
10. Preparar mensagem pronta de WhatsApp para follow-up em até 15 minutos.
11. Corrigir erro do link Demo Festa Junina.
12. Considerar vídeos curtos no YouTube na landing.
13. Preparar jornada completa: lead, funil, proposta, pagamento, acesso, pós-venda, retirada de acesso e reativação.

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