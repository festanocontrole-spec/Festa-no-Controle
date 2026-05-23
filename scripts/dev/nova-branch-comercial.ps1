param(
  [string]$Nome = "feature/festa-no-controle-base-comercial"
)

$ErrorActionPreference = "Stop"

git status

Write-Host ""
Write-Host "==> Criando branch: $Nome" -ForegroundColor Cyan

git checkout -b $Nome

Write-Host "Branch criada." -ForegroundColor Green