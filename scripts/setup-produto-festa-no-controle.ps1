$ErrorActionPreference = "Stop"

Write-Host "==> Criando estrutura de produto Festa no Controle..." -ForegroundColor Cyan

$dirs = @(
  "docs",
  "docs\produto",
  "docs\comercial",
  "docs\implantacao",
  "docs\operacao",
  "docs\diagnostico",
  "docs\roadmap",
  "docs\cases",
  "docs\precificacao",
  "supabase\sql",
  "supabase\seed",
  "scripts",
  "scripts\dev",
  "scripts\db",
  "scripts\zip"
)

foreach ($dir in $dirs) {
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

@"
# Festa no Controle

Plataforma para vender, planejar, operar e prestar contas de festas comunitárias, beneficentes, escolares, religiosas e associativas.

## Tese central

Não é apenas um sistema de eventos. É uma plataforma operacional para reduzir improviso, fila, retrabalho, erro no caixa e falta de previsibilidade em festas organizadas por voluntários.

## Promessa

Digital onde ajuda. Papel onde ainda faz sentido. Controle em todas as etapas.

## Ondas de evolução

1. Operação do dia: garçom, pedidos, caixa e relatório.
2. Pré-venda: convites, Pix, comprovantes e combos.
3. Planejamento: compras, preparo, estoque e voluntários.
4. Gestão completa: campanhas, indicações, autosserviço e prestação de contas.
"@ | Set-Content "docs\produto\visao-geral.md" -Encoding UTF8

@"
# Posicionamento Comercial

## Nome

Festa no Controle

## Subtítulo

A plataforma para vender, planejar, operar e prestar contas de festas comunitárias e beneficentes.

## Público inicial

- Festas Juninas beneficentes
- Quermesses
- Eventos escolares
- Entidades religiosas
- Associações
- Clubes
- Bazares
- Bingos
- Almoços e eventos comunitários

## Diferencial

O sistema entende a realidade de voluntários, papel, Pix manual, WhatsApp, caixa no dia, internet instável e prestação de contas.

## Não competir por

- Plataforma genérica de ingressos
- Página bonita de evento
- Venda de ingresso apenas

## Competir por

- Menos fila
- Menos retrabalho
- Mais receita antecipada
- Melhor planejamento
- Menos improviso
- Prestação de contas mais simples
"@ | Set-Content "docs\comercial\posicionamento.md" -Encoding UTF8

@"
# Diagnóstico Comercial

Objetivo: captar leads oferecendo uma análise gratuita da maturidade da festa.

## Perguntas principais

1. Qual tipo de evento você organiza?
2. Quantas pessoas são esperadas?
3. Hoje vocês vendem convites antecipados?
4. Usam ficha em papel?
5. O caixa precisa redigitar pedidos no fechamento?
6. Já houve fila grande no caixa?
7. Já faltou ou sobrou muita comida?
8. Como controlam voluntários?
9. Como fazem prestação de contas?
10. Qual é a maior dor do evento?
11. Quando será o próximo evento?
12. Você gostaria de receber um diagnóstico gratuito?

## Classificações sugeridas

- Caixa sobrecarregado
- Festa sem previsibilidade
- Coordenação voluntária
- Receita antecipada baixa
- Prestação de contas difícil
"@ | Set-Content "docs\diagnostico\pesquisa-publica.md" -Encoding UTF8

@"
# Precificação Inicial

## Modelo recomendado

Valor fixo por evento + percentual opcional sobre vendas digitais processadas pelo sistema.

## Planos

### Essencial - Dia da Festa
Para eventos que querem reduzir retrabalho no caixa.
Sugestão: R$ 497 a R$ 997 por evento.

### Organização - Antes + Durante
Inclui convites, Pix manual, comprovantes, combos e operação.
Sugestão: R$ 997 a R$ 1.997 por evento.

### Completo - Festa 360
Inclui planejamento, voluntários, compras, estoque, operação e prestação de contas.
Sugestão: R$ 1.997 a R$ 4.997 por evento.

### Taxa variável opcional
2% a 5% apenas sobre vendas digitais processadas pelo sistema.

## Evitar no início

Cobrar percentual sobre o total geral arrecadado, inclusive dinheiro físico e vendas externas.
"@ | Set-Content "docs\precificacao\modelo-comercial.md" -Encoding UTF8

@"
# Roadmap Técnico

## Fase 1 - Base comercial limpa
- Renomear produto
- Separar Tucxa como case
- Criar tenant/entidade
- Criar setup inicial por organização
- Criar diagnóstico público

## Fase 2 - Multi-entidade
- organizations
- organization_members
- eventos vinculados à organização
- permissões por papel

## Fase 3 - CRM comercial
- leads
- respostas do diagnóstico
- status comercial
- próxima ação
- histórico de contato

## Fase 4 - Demonstração
- dados fictícios
- evento demo
- cardápio demo
- pedidos demo
- relatório demo
"@ | Set-Content "docs\roadmap\roadmap-tecnico.md" -Encoding UTF8

Write-Host "Estrutura criada com sucesso." -ForegroundColor Green