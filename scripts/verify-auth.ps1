# Verify Phase 1 auth against a running API (http://localhost:5164)

$ErrorActionPreference = "Stop"
$base = "http://localhost:5164"
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$email = "verify_$([guid]::NewGuid().ToString('N').Substring(0,8))@example.com"
$password = "Password123!"

Write-Host "Register $email"
$register = Invoke-RestMethod -Uri "$base/api/auth/register" -Method Post -ContentType "application/json" `
  -Body (@{ email = $email; password = $password } | ConvertTo-Json) -WebSession $session
Write-Host "  id=$($register.id)"

Write-Host "GET /api/auth/me"
$me = Invoke-RestMethod -Uri "$base/api/auth/me" -Method Get -WebSession $session
if ($me.email -ne $email) { throw "me email mismatch" }
Write-Host "  ok email=$($me.email)"

Write-Host "POST /api/applications"
$app = Invoke-RestMethod -Uri "$base/api/applications" -Method Post -ContentType "application/json" `
  -Body (@{ company = "Acme"; title = "Dev" } | ConvertTo-Json) -WebSession $session
Write-Host "  app id=$($app.id)"

Write-Host "GET own application"
$own = Invoke-RestMethod -Uri "$base/api/applications/$($app.id)" -Method Get -WebSession $session
Write-Host "  ok $($own.company)"

Write-Host "IDOR check with second user"
$session2 = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$email2 = "verify_$([guid]::NewGuid().ToString('N').Substring(0,8))@example.com"
Invoke-RestMethod -Uri "$base/api/auth/register" -Method Post -ContentType "application/json" `
  -Body (@{ email = $email2; password = $password } | ConvertTo-Json) -WebSession $session2 | Out-Null

try {
  Invoke-WebRequest -Uri "$base/api/applications/$($app.id)" -Method Get -WebSession $session2 | Out-Null
  throw "IDOR FAIL: second user could read first user's application"
} catch {
  if ($_.Exception.Response.StatusCode.value__ -ne 404) {
    throw "Expected 404 for cross-user GET, got: $($_.Exception.Message)"
  }
  Write-Host "  ok cross-user GET => 404"
}

Write-Host "Logout"
Invoke-RestMethod -Uri "$base/api/auth/logout" -Method Post -WebSession $session | Out-Null

try {
  Invoke-WebRequest -Uri "$base/api/auth/me" -Method Get -WebSession $session | Out-Null
  throw "Expected 401 after logout"
} catch {
  if ($_.Exception.Response.StatusCode.value__ -ne 401) {
    throw "Expected 401 after logout, got: $($_.Exception.Message)"
  }
  Write-Host "  ok me after logout => 401"
}

Write-Host "`nVERIFY PASS"
