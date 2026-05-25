# Fix Vercel - eventSimulation ausente

Este pacote corrige o erro de build da Vercel:

```text
Cannot find module '@/lib/eventSimulation'
```

## Arquivos incluídos

- `src/lib/eventSimulation.ts`
- `src/lib/commercialMessages.ts`

O arquivo `commercialMessages.ts` importa o tipo `EventSimulation`, portanto o arquivo `src/lib/eventSimulation.ts` precisa existir e ser enviado para o GitHub.
