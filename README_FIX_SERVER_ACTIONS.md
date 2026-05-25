# Correção: Server Actions must be async functions

Arquivo ajustado:

- `src/app/diagnostico/actions.ts`

## Motivo do erro

Como o arquivo começa com `"use server"`, o Next.js exige que todos os exports sejam funções assíncronas. A função `getInitialDiagnosticSubmitState` estava exportada como função síncrona.

## Ajuste feito

De:

```ts
export function getInitialDiagnosticSubmitState(): DiagnosticSubmitState {
  return initialState;
}
```

Para:

```ts
export async function getInitialDiagnosticSubmitState(): Promise<DiagnosticSubmitState> {
  return initialState;
}
```

## Testes recomendados

```powershell
npm run fix:encoding
npm run check:encoding
npm run typecheck
npm run build
```
