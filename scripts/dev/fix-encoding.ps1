$ErrorActionPreference = "Stop"

$extensions = @("*.json", "*.ts", "*.tsx", "*.css", "*.mjs", "*.md", "*.sql", "*.ps1", "*.env.example")
$excludedDirs = @("node_modules", ".next", ".git")
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($extension in $extensions) {
  Get-ChildItem -Path . -Recurse -File -Filter $extension | Where-Object {
    $path = $_.FullName
    -not ($excludedDirs | Where-Object { $path -like "*\$_\*" })
  } | ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    [System.IO.File]::WriteAllText($_.FullName, $content, $utf8NoBom)
  }
}

Write-Host "Arquivos regravados em UTF-8 sem BOM." -ForegroundColor Green
