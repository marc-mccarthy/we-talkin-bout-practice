# Ask for drive letter
$driveLetter = Read-Host "Enter drive letter (e.g., Z)"

Write-Host "`nChecking directory sizes for ${driveLetter}:\ ..."
Write-Host "This may take a while for large directories...`n"

Get-ChildItem "${driveLetter}:\" -Force | 
Where-Object {$_.PSIsContainer} |
ForEach-Object {
    $folder = $_.FullName
    Write-Host "Scanning $folder ..."
    $size = (Get-ChildItem $_.FullName -Recurse -Force -ErrorAction SilentlyContinue | 
        Measure-Object -Property Length -Sum).Sum
    [PSCustomObject]@{
        Folder = $_.Name
        'Size(GB)' = [math]::Round($size/1GB, 2)
        'Size(TB)' = [math]::Round($size/1TB, 2)
    }
} | Sort-Object 'Size(GB)' -Descending | Format-Table -AutoSize

Write-Host "`nScan complete. Press Enter to exit."
$null = Read-Host
