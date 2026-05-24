# Passo a passo — atualização mobile-first e vídeos do YouTube

## 1. Atualizar arquivos no projeto

Na raiz do projeto:

```powershell
cd C:\Users\lacos\Documents\GitHub\festa-no-controle
```

Faça backup dos arquivos principais:

```powershell
mkdir _backup_mobile_youtube -Force
Copy-Item src\app\page.tsx _backup_mobile_youtube\page.tsx -Force
Copy-Item src\components\AppHeader.tsx _backup_mobile_youtube\AppHeader.tsx -Force
Copy-Item src\components\LogoFestaNoControle.tsx _backup_mobile_youtube\LogoFestaNoControle.tsx -Force
Copy-Item .env.example _backup_mobile_youtube\.env.example -Force
Copy-Item package.json _backup_mobile_youtube\package.json -Force
```

Extraia o zip recebido por cima da pasta do projeto, mantendo a estrutura de pastas.

## 2. Rodar validações

```powershell
npm install
npm run fix:encoding
npm run check:encoding
npm run lint
npm run typecheck
npm run build
```

Ou rode tudo junto:

```powershell
npm run verify
```

## 3. Testar local

```powershell
npm run dev
```

Acesse:

```text
http://localhost:3000
```

Teste no Chrome usando modo responsivo:

1. Pressione F12.
2. Clique no ícone de dispositivo móvel.
3. Teste larguras de 360px, 390px, 414px e 768px.
4. Verifique cabeçalho, CTA, menu, barra de tópicos e rolagem.

## 4. Criar os vídeos

Use os roteiros do arquivo:

```text
docs/comercial/roteiros-videos-youtube.md
```

Gere ou grave os vídeos:

1. Festa Junina sem correria.
2. Bingo sem dúvida nas pedras sorteadas.
3. Programa Cliente Fundador.
4. Como funciona em 1 minuto, opcional.

## 5. Subir no YouTube

1. Acesse YouTube Studio.
2. Clique em Criar > Enviar vídeos.
3. Envie o arquivo do vídeo.
4. Defina título claro.
5. Em visibilidade, escolha “Não listado” durante testes.
6. Depois de revisar, pode manter “Não listado” ou publicar.
7. Copie o ID do vídeo.

Exemplo:

```text
https://www.youtube.com/watch?v=abc123XYZ
```

O ID é:

```text
abc123XYZ
```

## 6. Configurar IDs no projeto local

No `.env.local`, inclua:

```env
NEXT_PUBLIC_YOUTUBE_FESTA_SEM_CORRERIA_ID=abc123XYZ
NEXT_PUBLIC_YOUTUBE_BINGO_SEM_DUVIDA_ID=def456XYZ
NEXT_PUBLIC_YOUTUBE_CLIENTE_FUNDADOR_ID=ghi789XYZ
NEXT_PUBLIC_YOUTUBE_COMO_FUNCIONA_ID=jkl012XYZ
```

Depois reinicie o servidor:

```powershell
npm run dev
```

## 7. Configurar IDs na Vercel

Na Vercel:

1. Abra o projeto Festa no Controle.
2. Vá em Settings > Environment Variables.
3. Adicione as variáveis:

```text
NEXT_PUBLIC_YOUTUBE_FESTA_SEM_CORRERIA_ID
NEXT_PUBLIC_YOUTUBE_BINGO_SEM_DUVIDA_ID
NEXT_PUBLIC_YOUTUBE_CLIENTE_FUNDADOR_ID
NEXT_PUBLIC_YOUTUBE_COMO_FUNCIONA_ID
```

4. Faça novo deploy.

## 8. Commit e push

```powershell
git status
git add .
git commit -m "feat: ajustar landing mobile-first e preparar vídeos do YouTube"
git push
```

## 9. Teste em produção

Acesse pelo celular:

```text
https://festa-no-controle.vercel.app
```

Confira:

- cabeçalho não quebra;
- CTA Diagnóstico gratuito fica visível;
- menu abre corretamente;
- barra de tópicos rola horizontalmente;
- vídeos aparecem quando IDs forem configurados;
- textos falam com o lead, não com a equipe interna.
