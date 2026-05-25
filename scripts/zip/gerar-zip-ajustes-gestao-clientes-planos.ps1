param(
  [string]$Output = "festa-no-controle-ajustes-gestao-clientes-planos.zip"
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$outPath = Join-Path $root $Output

Write-Host "==> Gerando zip para ajustes de obrigado, gestão, clientes, planos e funil..." -ForegroundColor Cyan

if (Test-Path $outPath) {
  Remove-Item $outPath -Force
}

$temp = Join-Path $env:TEMP ("festa-no-controle-gestao-clientes-" + [guid]::NewGuid().ToString())
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

  "src/app/diagnostico",
  "src/app/gestao",
  "src/app/admin",
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

1. Página /diagnostico/obrigado:
   - Remover blocos de bastidor interno:
     - E-mail imediato;
     - Retorno por WhatsApp;
     - Próximos contatos.
   - Exibir mensagem simples:
     - diagnóstico recebido;
     - alguém do Festa no Controle entrará em contato em breve;
     - próximo passo recomendado: ver Demo Festa Junina.
   - Manter recomendação personalizada e CTA principal.

2. Follow-ups:
   - Não criar follow-up de 7 dias antes do evento se a data já estiver no passado.
   - Não criar follow-up 7 dias antes se o evento estiver dentro da janela de acompanhamento e isso gerar data passada.
   - Criar lógica segura:
     - retorno rápido;
     - 24h;
     - 3 dias;
     - 7 dias antes apenas se futuro.

3. Área de Gestão:
   - Hoje aparece apenas Leads.
   - Criar/ajustar painel de Gestão Interna com opções:
     - Painel;
     - Leads e diagnósticos;
     - Clientes;
     - Planos e ofertas;
     - Propostas;
     - Pagamentos;
     - Acessos;
     - Pós-venda;
     - Bingo no Controle;
     - Configurações.
   - Manter layout mobile friendly.
   - Usar linguagem Festa no Controle, não Tucxa.

4. Estratégia multi-cliente:
   - Estruturar para plataforma única multi-cliente.
   - Cada cliente deve ter:
     - organização;
     - eventos;
     - módulos contratados;
     - usuários;
     - permissões;
     - pagamentos;
     - histórico;
     - pós-venda.
   - Evitar criar instalação separada para cada cliente como padrão.
   - Instalação separada só como exceção para cliente grande/contrato específico.

5. Bingo no Controle:
   - Tratar como produto/módulo comercial dentro do Festa no Controle.
   - Permitir lead interessado apenas em Bingo.
   - Permitir oferta combinada Festa no Controle + Bingo no Controle.

6. Funil/CRM:
   - Evoluir lead para cliente.
   - Guardar produtos/módulos adquiridos.
   - Guardar plano sugerido e plano contratado.
   - Guardar oferta comercial:
     A. piloto completo sem custo com contrapartida;
     B. módulo essencial gratuito para cliente fundador;
     C. taxa simbólica;
     D. primeira edição piloto, próxima edição comercial.
   - Guardar preço, pagamento, acesso, pós-venda e reativação.

7. Planos e preços:
   - Essencial / Dia da Festa: R$ 497 a R$ 997 por evento.
   - Organização / Antes + Durante: R$ 997 a R$ 1.997 por evento.
   - Completo / Festa 360: R$ 1.997 a R$ 4.997 por evento.
   - Taxa sobre vendas digitais: 2% a 5%.
   - Plano Social.
   - Bingo no Controle como módulo/standalone.

8. Gerar SQL/migration se necessário para:
   - commercial_clients;
   - commercial_products;
   - commercial_plan_catalog;
   - commercial_offers;
   - commercial_contracts;
   - commercial_client_modules;
   - commercial_event_access;
   - billing/payment tracking.

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