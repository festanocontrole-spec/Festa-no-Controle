$ErrorActionPreference = "Stop"

Write-Host "==> Corrigindo encoding dos arquivos críticos para UTF-8 sem BOM..." -ForegroundColor Cyan

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

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

$files = foreach ($extension in $extensions) {
  Get-ChildItem -Path . -Recurse -File -Filter $extension -ErrorAction SilentlyContinue |
    Where-Object { -not (Should-IgnoreFile $_.FullName) }
}

$files = $files | Sort-Object FullName -Unique

foreach ($file in $files) {
  $bytes = [System.IO.File]::ReadAllBytes($file.FullName)

  if ($bytes.Length -ge 3 -and $bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191) {
    Write-Host "Removendo BOM: $($file.FullName)" -ForegroundColor Yellow
  }

  $content = [System.IO.File]::ReadAllText($file.FullName)
  [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
}

Write-Host "Encoding corrigido com sucesso." -ForegroundColor Green
