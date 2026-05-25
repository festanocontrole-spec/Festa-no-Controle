$ErrorActionPreference = "Stop"

Write-Host "==> Verificando BOM em arquivos críticos..." -ForegroundColor Cyan

$extensions = @("*.json", "*.ts", "*.tsx", "*.js", "*.mjs", "*.css", "*.md", "*.sql", "*.ps1")
$paths = @("package.json", "src", "supabase", "docs", "scripts")
$found = @()

foreach ($path in $paths) {
  if (!(Test-Path $path)) { continue }

  $files = @()
  if ((Get-Item $path).PSIsContainer) {
    foreach ($extension in $extensions) {
      $files += Get-ChildItem $path -Recurse -File -Filter $extension
    }
  } else {
    $files += Get-Item $path
  }

  foreach ($file in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191) {
      $found += $file.FullName
    }
  }
}

if ($found.Count -gt 0) {
  Write-Host "Arquivos com BOM encontrados:" -ForegroundColor Red
  $found | ForEach-Object { Write-Host $_ -ForegroundColor Red }
  exit 1
}

Write-Host "Nenhum BOM encontrado." -ForegroundColor Green
