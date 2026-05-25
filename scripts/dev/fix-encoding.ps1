$ErrorActionPreference = "Stop"

Write-Host "==> Corrigindo encoding UTF-8 sem BOM em arquivos críticos..." -ForegroundColor Cyan

$extensions = @("*.json", "*.ts", "*.tsx", "*.js", "*.mjs", "*.css", "*.md", "*.sql", "*.ps1")
$paths = @("package.json", "src", "supabase", "docs", "scripts")
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($path in $paths) {
  if (!(Test-Path $path)) { continue }

  if ((Get-Item $path).PSIsContainer) {
    foreach ($extension in $extensions) {
      Get-ChildItem $path -Recurse -File -Filter $extension | ForEach-Object {
        $content = [System.IO.File]::ReadAllText($_.FullName)
        [System.IO.File]::WriteAllText($_.FullName, $content, $utf8NoBom)
      }
    }
  } else {
    $content = [System.IO.File]::ReadAllText((Resolve-Path $path))
    [System.IO.File]::WriteAllText((Resolve-Path $path), $content, $utf8NoBom)
  }
}

Write-Host "Encoding corrigido." -ForegroundColor Green
