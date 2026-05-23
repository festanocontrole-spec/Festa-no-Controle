$ErrorActionPreference = "Stop"

Write-Host "==> Verificando ambiente local..." -ForegroundColor Cyan

function Test-Command($cmd) {
  $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue)
}

function Write-Utf8NoBom([string]$Path, [string]$Content) {
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText((Resolve-Path -LiteralPath (Split-Path $Path -Parent)).Path + [System.IO.Path]::DirectorySeparatorChar + (Split-Path $Path -Leaf), $Content, $utf8NoBom)
}

if (!(Test-Command "node")) {
  throw "Node.js não encontrado. Instale o Node antes de continuar."
}

if (!(Test-Command "npm")) {
  throw "npm não encontrado."
}

if (!(Test-Command "docker")) {
  throw "Docker não encontrado. Instale/abra o Docker Desktop."
}

if (!(Test-Command "supabase")) {
  Write-Host "Supabase CLI não encontrado. Instalando via npm..." -ForegroundColor Yellow
  npm install -g supabase
}

Write-Host "Node:" -ForegroundColor Green
node -v

Write-Host "npm:" -ForegroundColor Green
npm -v

Write-Host "Supabase:" -ForegroundColor Green
supabase -v

Write-Host "==> Instalando dependências..." -ForegroundColor Cyan
npm install

if (!(Test-Path ".env.local")) {
  if (Test-Path ".env.example") {
    Copy-Item ".env.example" ".env.local"
    Write-Host ".env.local criado a partir do .env.example" -ForegroundColor Green
  } else {
    $envContent = @"
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=cole_aqui_apos_supabase_start
SUPABASE_SERVICE_ROLE_KEY=cole_aqui_apos_supabase_start
NEXT_PUBLIC_APP_URL=http://localhost:3000
"@
    [System.IO.File]::WriteAllText((Resolve-Path ".").Path + "\.env.local", $envContent, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host ".env.local criado." -ForegroundColor Green
  }
}

Write-Host "==> Corrigindo encoding antes do build..." -ForegroundColor Cyan
powershell -ExecutionPolicy Bypass -File scripts/dev/fix-encoding.ps1

Write-Host "==> Iniciando Supabase local..." -ForegroundColor Cyan
supabase start

Write-Host ""
Write-Host "IMPORTANTE:" -ForegroundColor Yellow
Write-Host "Copie as chaves exibidas pelo supabase start para o .env.local:"
Write-Host "NEXT_PUBLIC_SUPABASE_URL"
Write-Host "NEXT_PUBLIC_SUPABASE_ANON_KEY"
Write-Host "SUPABASE_SERVICE_ROLE_KEY"
Write-Host ""

Write-Host "==> Aplicando migrations e seed..." -ForegroundColor Cyan
supabase db reset

Write-Host "==> Rodando lint..." -ForegroundColor Cyan
npm run lint

Write-Host "==> Rodando typecheck..." -ForegroundColor Cyan
npm run typecheck

Write-Host "==> Rodando build..." -ForegroundColor Cyan
npm run build

Write-Host ""
Write-Host "Setup local concluído." -ForegroundColor Green
Write-Host "Para iniciar:"
Write-Host "npm run dev"
