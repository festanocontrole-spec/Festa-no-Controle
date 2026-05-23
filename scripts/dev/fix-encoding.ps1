$ErrorActionPreference = "Stop"

Write-Host "==> Corrigindo encoding UTF-8 sem BOM em arquivos críticos..." -ForegroundColor Cyan

$extensions = @("*.json", "*.ts", "*.tsx", "*.mjs", "*.js", "*.css", "*.md", "*.sql", "*.ps1", "*.example")
$excludedDirs = @("node_modules", ".next", ".git", "_review", "_backup_ajuste_encoding")
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Is-InExcludedDir($path) {
  foreach ($dir in $excludedDirs) {
    if ($path -like "*\$dir\*" -or $path -like "*$dir/*") {
      return $true
    }
  }
  return $false
}

$files = foreach ($ext in $extensions) {
  Get-ChildItem -Path . -Recurse -File -Include $ext -ErrorAction SilentlyContinue | Where-Object { -not (Is-InExcludedDir $_.FullName) }
}

foreach ($file in $files | Sort-Object FullName -Unique) {
  $content = [System.IO.File]::ReadAllText($file.FullName)
  [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
}

Write-Host "Encoding corrigido em $($files.Count) arquivo(s)." -ForegroundColor Green
