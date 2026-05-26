param(
  [string]$Output = "festa-no-controle-ajustes-sidebar-gestao-evento.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip para ajustes de sidebar da Gestão e módulos de evento..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-sidebar-gestao-" + [guid]::NewGuid().ToString())
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

  "src/components",
  "src/lib",

  "src/app/admin",
  "src/app/gestao",
  "src/app/festa-junina",
  "src/app/demo-festa-junina",
  "src/app/diagnostico",
  "src/app/api",

  "src/middleware.ts",

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

IMPORTANTE:
A. Considerar sempre requisitos, diferenciais e práticas de mercado para evitar Mar Vermelho e atingir Oceano Azul.
B. Manter sempre mobile friendly.
C. Considerar sempre técnicas de Deep Dive do Marcelo Bragion.

1. Área de Gestão do Festa no Controle:
   - Não deve aparecer apenas como botões horizontais.
   - Deve ter menu lateral semelhante ao tucxa-festa-junina.
   - Manter visual profissional, responsivo e mobile friendly.

2. Menu lateral da Gestão:
   - Incluir seções:
     - Comercial;
     - Evento selecionado;
     - Vendas;
     - Operação;
     - Bingo no Controle;
     - Relatórios;
     - Configurações;
     - Conta.

3. Opções mínimas do menu:
   Comercial:
   - Painel;
   - Leads e diagnósticos;
   - Clientes;
   - Planos e ofertas;
   - Propostas;
   - Pagamentos;
   - Acessos;
   - Pós-venda.

   Evento selecionado:
   - Painel do evento;
   - Eventos;
   - Menu;
   - Manuais e Ajuda;
   - Simulações.

   Vendas:
   - Convites;
   - Individuais;
   - Combos;
   - Campanhas;
   - Upsell;
   - Pagamento;
   - Aprovações.

   Operação:
   - Cardápio;
   - Pedidos;
   - Caixa;
   - Cozinha/retirada;
   - Voluntários/prestadores.

   Bingo no Controle:
   - Rodadas;
   - Prendas;
   - Cartelas;
   - Chamadas;
   - Painel ao vivo.

   Relatórios:
   - Vendas;
   - Consumo;
   - Prestação de contas;
   - Aprendizados.

   Conta:
   - Sair da gestão.

4. Preservar a opção Menu:
   - Manter /admin/comercial/menu.
   - Permitir futuramente cadastro e gestão de menus por cliente/evento, como já existe no tucxa-festa-junina.

5. Logout:
   - Criar botão/link "Sair da gestão" como existe no tucxa-festa-junina.
   - Garantir que encerre sessão Supabase Auth e redirecione para a página pública ou login.

6. Multi-cliente/multi-evento:
   - Estruturar o menu para comportar clientes, eventos e módulos contratados.
   - Cada cliente poderá ter eventos e módulos liberados conforme contrato.
   - Não criar instalação separada para cada cliente como regra geral.

7. Usar o zip tucxa-festa-junina como referência visual e funcional para a navegação lateral, mas adaptar a linguagem para Festa no Controle.

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