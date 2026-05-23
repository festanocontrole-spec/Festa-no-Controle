$ErrorActionPreference = "Stop"

Write-Host "==> Verificando BOM em arquivos críticos..." -ForegroundColor Cyan

$extensions = @("*.json", "*.ts", "*.tsx", "*.mjs", "*.js", "*.css", "*.md", "*.sql", "*.ps1", "*.example")
$excludedDirs = @("node_modules", ".next", ".git", "_review", "_backup_ajuste_encoding")
$filesWithBom = New-Object System.Collections.Generic.List[string]

function Is-InExcludedDir($path) {
  foreach ($dir in $excludedDirs) {
    if ($path -like "*\$dir\*" -or $path -like "*$dir/*") {
      return $true
    }
  }
  return $false
}

foreach ($ext in $extensions) {
  Get-ChildItem -Path . -Recurse -File -Include $ext -ErrorAction SilentlyContinue | Where-Object { -not (Is-InExcludedDir $_.FullName) } | ForEach-Object {
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
      $filesWithBom.Add($_.FullName)
    }
  }
}

if ($filesWithBom.Count -gt 0) {
  Write-Host "Arquivos com BOM encontrados:" -ForegroundColor Red
  $filesWithBom | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
  throw "Remova o BOM antes de rodar build. Use: npm run fix:encoding"
}

Write-Host "Nenhum BOM encontrado." -ForegroundColor Green
