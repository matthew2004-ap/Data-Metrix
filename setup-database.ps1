$ErrorActionPreference = 'Stop'

Write-Host "Adewale Insights - Database Setup" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path .env)) {
  Copy-Item .env.example .env
  Write-Host ".env created from .env.example." -ForegroundColor Yellow
  Write-Host "Open .env and replace DATABASE_URL with the PostgreSQL URL returned by: npx create-db" -ForegroundColor Yellow
  exit 1
}

$envFile = Get-Content .env -Raw
if ($envFile -match 'YOUR_USER|YOUR_PASSWORD|YOUR_HOST|YOUR_DATABASE') {
  Write-Host "DATABASE_URL is still a placeholder." -ForegroundColor Yellow
  Write-Host "Run: npx create-db" -ForegroundColor Yellow
  Write-Host "Then paste the returned postgres:// connection string into .env." -ForegroundColor Yellow
  exit 1
}

Write-Host "Generating Prisma Client..." -ForegroundColor Green
npx prisma generate

Write-Host "Applying database migration..." -ForegroundColor Green
npx prisma migrate dev --name init

Write-Host "Seeding 10 articles and categories..." -ForegroundColor Green
npx prisma db seed

Write-Host "Testing database connection..." -ForegroundColor Green
npm run db:test

Write-Host ""
Write-Host "Database setup completed successfully." -ForegroundColor Cyan
