$ErrorActionPreference = "Stop"

function Quick-Test-DriveSpace {
    param (
        [string]$DriveLetter
    )

    Write-Host "`nTesting drive ${DriveLetter}:\" -ForegroundColor Green
    $drive = Get-Volume -DriveLetter $DriveLetter
    $totalBytes = $drive.Size
    $totalTB = [math]::Round($totalBytes/1TB, 2)
    Write-Host "Total drive space: $totalTB TB"
    Write-Host "Free space: $([math]::Round($drive.SizeRemaining/1TB, 2)) TB`n"

    # Create test directory
    $testDir = "${DriveLetter}:\QuickDriveTest"
    if (!(Test-Path $testDir)) {
        New-Item -ItemType Directory -Path $testDir | Out-Null
    }

    # Test smaller intervals
    $testPoints = @(1, 3, 5, 8, 10, 12, 15)
    $testFileSize = 1KB  # Tiny test file
    $succeeded = @()
    $failed = @()

    foreach ($point in $testPoints) {
        Write-Host "Quick test at $point TB mark..." -NoNewline
        $testFile = Join-Path $testDir "quicktest_${point}TB.txt"
        
        try {
            # Just write a small file with the position number
            $content = "Test at $point TB position"
            [System.IO.File]::WriteAllText($testFile, $content)
            
            # Verify we can read it back
            $readBack = [System.IO.File]::ReadAllText($testFile)
            if ($readBack -eq $content) {
                Write-Host " Success!" -ForegroundColor Green
                $succeeded += $point
            } else {
                Write-Host " Verification failed." -ForegroundColor Red
                $failed += $point
            }
            
        } catch {
            Write-Host " Failed!" -ForegroundColor Red
            Write-Host "Error: $_" -ForegroundColor Red
            $failed += $point
        } finally {
            if (Test-Path $testFile) {
                Remove-Item $testFile -Force
            }
        }
    }

    # Summary
    Write-Host "`nTest Summary:" -ForegroundColor Cyan
    Write-Host "Successful test points: $($succeeded -join ', ') TB" -ForegroundColor Green
    if ($failed.Count -gt 0) {
        Write-Host "Failed test points: $($failed -join ', ') TB" -ForegroundColor Red
    }

    # Show disk health
    Write-Host "`nDisk Health Status:" -ForegroundColor Cyan
    Get-PhysicalDisk | Where-Object { $_.DeviceId -eq (Get-Partition -DriveLetter $DriveLetter).DiskNumber } | 
        Select-Object FriendlyName, HealthStatus, OperationalStatus, Size | Format-List

    # Cleanup
    Remove-Item $testDir -Recurse -Force -ErrorAction SilentlyContinue
}

# Get drive letter from user
$driveLetter = Read-Host "Enter drive letter (without colon)"
Quick-Test-DriveSpace -DriveLetter $driveLetter

Write-Host "`nPress Enter to exit"
$null = Read-Host
