param(
  [string]$Output = "festa-no-controle-ajustes-diagnostico-validacao-funil.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip para ajustes do diagnóstico, validação, funil e simulação..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-diagnostico-" + [guid]::NewGuid().ToString())
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
  "src/app/globals.css",
  "src/app/page.tsx",

  "src/components/AppHeader.tsx",
  "src/components/LogoFestaNoControle.tsx",
  "src/components",

  "src/app/diagnostico",
  "src/app/gestao",
  "src/app/admin/comercial",
  "src/app/api",

  "src/lib",

  "supabase/migrations",
  "docs/comercial",
  "docs/produto",
  "docs/implantacao",
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

IMPORTANTE:
A. Considerar principais requisitos, diferenciais e práticas de mercado para evitar Mar Vermelho e buscar Oceano Azul.
B. Manter sistema mobile friendly.
C. Considerar técnicas de Deep Dive do Marcelo Bragion.

1. Inserir aviso claro na página de diagnóstico:
   - É um diagnóstico para entender dores do lead e sugerir solução.
   - Preenchimento não é obrigatório.
   - Não solicita senha.
   - Não solicita cartão.
   - Não solicita dados bancários.
   - Não realiza pagamento.
   - Não instala nada.
   - Não oferece download.
   - Objetivo é ouvir o lead sobre dificuldades para realizar seu evento.

2. Implementar validações antes do envio:
   a. Bloquear envio se qualquer pergunta estiver sem resposta.
   b. Bloquear envio se resposta de texto livre estiver vazia ou muito curta.
   c. Destacar visualmente o bloco da pergunta pendente.
   d. Rolar automaticamente até a primeira pergunta pendente.
   e. Mostrar mensagem clara do que falta responder.
   f. Duplicar validação no servidor/API/server action do submit.

3. Corrigir fluxo pós-envio:
   - Campos não devem apenas limpar.
   - Deve redirecionar para /diagnostico/obrigado.
   - Página de obrigado deve mostrar recomendações conforme diagnóstico.
   - Deve preparar próximas etapas:
     - e-mail imediato para lead com cópia para festanocontrole@gmail.com;
     - WhatsApp entre 5 e 15 minutos, se houver consentimento;
     - segundo follow-up 24h depois;
     - terceiro follow-up 3 dias depois;
     - último follow-up 7 dias antes do evento, se houver data.
   - As mensagens devem ficar prontas para envio na área de Gestão.

4. Criar ou preparar uma simulação inicial do evento com premissas a partir das respostas do diagnóstico.

5. Alterar Cidade e Estado:
   - Ideal escolher primeiro Estado e depois cidades baseadas no Estado.
   - Ambos os campos devem permitir digitar informações.

6. Alterar label:
   De:
   Principal dor hoje
   Para:
   Principal dor hoje (Ex: fila no caixa, voluntários ou prestadores de serviços, falta/sobra de comida, controle de pagamentos, bingo, cartelas, prestação de contas, etc)

7. Alterar pergunta:
   De:
   Como vocês organizam voluntários hoje?
   Para:
   Como vocês organizam voluntários e/ou prestadores de serviços atualmente?

8. Incluir sugestões/placeholders úteis nas três áreas de texto:
   - organização de voluntários/prestadores;
   - prestação de contas;
   - maior medo para o dia do evento.

9. Manter layout responsivo e mobile friendly.

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