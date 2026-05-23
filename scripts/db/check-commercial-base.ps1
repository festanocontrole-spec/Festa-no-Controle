$ErrorActionPreference = "Stop"

Write-Host "==> Validando tabelas comerciais no Supabase local..." -ForegroundColor Cyan

$tables = @(
  "organizations",
  "organization_members",
  "commercial_leads",
  "commercial_diagnostic_responses",
  "commercial_followups",
  "subscription_plans",
  "event_billing_snapshots"
)

foreach ($table in $tables) {
  Write-Host "Verificar tabela: $table" -ForegroundColor Yellow
  supabase db query "select count(*) as total from public.$table;"
}

Write-Host "Validação concluída." -ForegroundColor Green
