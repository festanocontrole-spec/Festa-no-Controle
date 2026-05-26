# Ajustes — Gestão com menu lateral completo

## O que foi entregue

Esta atualização transforma a área `/admin/comercial` em uma Gestão Interna com menu lateral semelhante à experiência validada no Tucxa.

O menu passa a reunir:

- Comercial: painel, leads, clientes, planos, propostas, pagamentos, acessos e pós-venda.
- Evento selecionado: painel, eventos, menu, manuais, simulações, módulos e configurações.
- Vendas: convites, individuais, combos, campanhas, upsell, pagamento, aprovações e relatórios.
- Operação: cardápio, garçom, pedidos, caixa, preparo, retirada, entrega, cancelados, voluntários/prestadores e configuração operacional.
- Planejamento: planejamento, compras, insumos, itens finais, treinamento, playlist, prestação de contas, relatórios e ocorrências.
- Bingo no Controle: visão comercial e bingo do evento.
- Plataforma: menu da plataforma, configurações e sair da gestão.

## Estratégia aplicada

O Festa no Controle deve ser uma plataforma única multi-cliente e multi-evento, com módulos habilitados conforme contrato. As funcionalidades já existentes no Tucxa continuam preservadas em `/admin/festa-junina/*`, e a nova Gestão cria atalhos claros para elas.

## Arquivos alterados

- `src/components/CommercialAdminNav.tsx`
- `src/app/admin/comercial/**/page.tsx`
- `docs/implantacao/passo-a-passo-sidebar-gestao-evento-completo.md`
- `scripts/zip/gerar-zip-sidebar-gestao-evento-completo.ps1`

## Testes recomendados

Depois de atualizar, rode:

```powershell
npm run fix:encoding
npm run check:encoding
npm run typecheck
npm run build
npm run dev
```

Acesse:

- `/admin/comercial`
- `/admin/comercial/menu`
- `/admin/comercial/leads`
- `/admin/festa-junina`
- `/admin/festa-junina/menu`
- `/admin/festa-junina/convites`
- `/admin/festa-junina/combos`
- `/admin/festa-junina/cardapio`
- `/admin/festa-junina/pedidos`
- `/admin/festa-junina/caixa`
- `/admin/festa-junina/bingo`
- `/admin/logout`
