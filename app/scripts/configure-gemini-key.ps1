$ErrorActionPreference = "Stop"

$appRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $appRoot ".env.local"
$secureKey = $null
$keyPointer = [IntPtr]::Zero
$key = $null

try {
    $secureKey = Read-Host -Prompt "Enter your Gemini API key (input is hidden)" -AsSecureString
    if ($secureKey.Length -eq 0) {
        throw "No API key was entered."
    }

    $keyPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureKey)
    $key = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($keyPointer)
    if ($key -match "\s") {
        throw "The API key must not contain whitespace."
    }

    $lines = @()
    if (Test-Path -LiteralPath $envFile) {
        $lines = @(Get-Content -LiteralPath $envFile | Where-Object {
            $_ -notmatch "^\s*GEMINI_API_KEY\s*="
        })
    }

    $lines += 'GEMINI_API_KEY="' + $key.Replace("\", "\\").Replace('"', '\"') + '"'
    Set-Content -LiteralPath $envFile -Value $lines -Encoding UTF8
    Write-Output "Gemini API key saved to the git-ignored app/.env.local file. Restart the dev server to use it."
}
finally {
    if ($keyPointer -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($keyPointer)
    }
    if ($secureKey) {
        $secureKey.Dispose()
    }
    $key = $null
}
