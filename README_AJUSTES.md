# Ajustes enviados

## Motivo

O build quebrou porque o `package.json` tinha BOM no primeiro caractere. O Next/Turbopack interpreta o arquivo como JSON inválido quando encontra esse caractere invisível.

## Ajustes principais

- `package.json` regravado em UTF-8 sem BOM.
- Scripts `fix:encoding`, `check:encoding` e `verify` adicionados ao `package.json`.
- Novo script `scripts/dev/fix-encoding.ps1` para regravar arquivos críticos sem BOM.
- Novo script `scripts/dev/check-encoding.ps1` para detectar BOM antes do build.
- `scripts/setup-produto-festa-no-controle.ps1` ajustado para gravar `.md` em UTF-8 sem BOM.
- `scripts/dev/setup-local.ps1` ajustado para chamar `fix-encoding` antes do build.
- `layout.tsx` atualizado para a marca Festa no Controle.
- Migration `031_festa_no_controle_commercial_base.sql` reforçada com triggers de `updated_at`, índices adicionais e `upsert` dos planos comerciais.
