$ErrorActionPreference = "Stop"

$extensions = @("*.json", "*.ts", "*.tsx", "*.css", "*.mjs", "*.md", "*.sql", "*.ps1", "*.env.example")
$excludedDirs = @("node_modules", ".next", ".git")
$found = @()

foreach ($extension in $extensions) {
  Get-ChildItem -Path . -Recurse -File -Filter $extension | Where-Object {
    $path = $_.FullName
    -not ($excludedDirs | Where-Object { $path -like "*\$_\*" })
  } | ForEach-Object {
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
      $found += $_.FullName
    }
  }
}

if ($found.Count -gt 0) {
  Write-Host "Arquivos com BOM encontrados:" -ForegroundColor Red
  $found | ForEach-Object { Write-Host $_ -ForegroundColor Red }
  exit 1
}

Write-Host "Nenhum BOM encontrado nos arquivos verificados." -ForegroundColor Green
