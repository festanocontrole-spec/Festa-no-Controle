$ErrorActionPreference = "Stop"

Write-Host "==> Verificando BOM em arquivos críticos..." -ForegroundColor Cyan

$extensions = @(
  "*.json",
  "*.ts",
  "*.tsx",
  "*.js",
  "*.mjs",
  "*.css",
  "*.sql",
  "*.md",
  "*.ps1",
  "*.example"
)

$ignoredDirs = @(
  ".git",
  ".next",
  "node_modules",
  "out",
  "build",
  ".vercel"
)

function Should-IgnoreFile([string]$fullName) {
  foreach ($dir in $ignoredDirs) {
    $needle = [System.IO.Path]::DirectorySeparatorChar + $dir + [System.IO.Path]::DirectorySeparatorChar
    if ($fullName.Contains($needle)) {
      return $true
    }
  }
  return $false
}

$found = @()

foreach ($extension in $extensions) {
  Get-ChildItem -Path . -Recurse -File -Filter $extension -ErrorAction SilentlyContinue |
    Where-Object { -not (Should-IgnoreFile $_.FullName) } |
    ForEach-Object {
      $bytes = [System.IO.File]::ReadAllBytes($_.FullName)

      if ($bytes.Length -ge 3 -and $bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191) {
        $found += $_.FullName
      }
    }
}

if ($found.Count -gt 0) {
  Write-Host "Arquivos com BOM encontrados:" -ForegroundColor Red
  $found | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
  throw "Corrija com: npm run fix:encoding"
}

Write-Host "Nenhum BOM encontrado nos arquivos críticos." -ForegroundColor Green
