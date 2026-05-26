# Ajustes de Gestão com menu lateral completo

## Objetivo

A área de Gestão do Festa no Controle passa a ter navegação lateral semelhante à versão validada do Tucxa, preservando a lógica de operação completa do evento: comercial, evento selecionado, vendas, operação, planejamento, Bingo no Controle, relatórios, menu e configurações.

## Estratégia recomendada

O Festa no Controle deve ser uma plataforma única multi-cliente. Cada cliente terá organizações, eventos, módulos contratados, usuários, permissões, pagamentos e histórico. Instalações separadas devem ser exceção para clientes grandes ou contratos com exigência de isolamento.

## Arquivos alterados

- `src/components/CommercialAdminNav.tsx`
- páginas em `src/app/admin/comercial/**/page.tsx`
- `docs/implantacao/passo-a-passo-sidebar-gestao-evento-completo.md`
- `scripts/zip/gerar-zip-sidebar-gestao-evento-completo.ps1`

## Testes

Acesse:

- `/admin/comercial`
- `/admin/comercial/leads`
- `/admin/comercial/menu`
- `/admin/festa-junina`
- `/admin/festa-junina/menu`
- `/admin/festa-junina/convites`
- `/admin/festa-junina/combos`
- `/admin/festa-junina/cardapio`
- `/admin/festa-junina/pedidos`
- `/admin/festa-junina/caixa`
- `/admin/festa-junina/bingo`
- `/admin/logout`

## Observação

As funcionalidades já existentes em `/admin/festa-junina` foram mantidas. O novo menu lateral da Gestão cria atalhos claros para elas e prepara a experiência para clientes/eventos futuros.
