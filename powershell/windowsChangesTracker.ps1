# Windows Changes Tracker
# This script helps track changes to your Windows system and manage application settings

# Function to create a snapshot of the system
function Create-SystemSnapshot {
    $date = Get-Date -Format "yyyyMMdd_HHmmss"
    $snapshotPath = "D:\SystemSnapshots\$date"
    
    # Create snapshot directory
    New-Item -ItemType Directory -Force -Path $snapshotPath

    # Capture installed programs
    Get-WmiObject -Class Win32_Product | Select-Object Name, Version | Export-Csv "$snapshotPath\InstalledPrograms.csv"
    
    # Capture file system structure of C drive (excluding Windows and Program Files)
    Get-ChildItem C:\ -Recurse -Directory | Where-Object { $_.FullName -notlike "C:\Windows*" -and $_.FullName -notlike "C:\Program Files*" } | 
        Select-Object FullName | Export-Csv "$snapshotPath\CRootStructure.csv"
    
    # Capture current user's environment variables
    Get-ChildItem Env: | Export-Csv "$snapshotPath\EnvironmentVariables.csv"
    
    # Add more data collection as needed
    
    Write-Host "System snapshot created at $snapshotPath"
}

# Function to compare current system state with a previous snapshot
function Compare-SystemState {
    param (
        [string]$snapshotPath
    )
    
    $currentDate = Get-Date -Format "yyyyMMdd_HHmmss"
    $comparisonPath = "D:\SystemComparisons\$currentDate"
    New-Item -ItemType Directory -Force -Path $comparisonPath
    
    # Compare installed programs
    $oldPrograms = Import-Csv "$snapshotPath\InstalledPrograms.csv"
    $newPrograms = Get-WmiObject -Class Win32_Product | Select-Object Name, Version
    Compare-Object $oldPrograms $newPrograms -Property Name, Version | 
        Export-Csv "$comparisonPath\ProgramChanges.csv"
    
    # Compare file system structure
    $oldStructure = Import-Csv "$snapshotPath\CRootStructure.csv"
    $newStructure = Get-ChildItem C:\ -Recurse -Directory | Where-Object { $_.FullName -notlike "C:\Windows*" -and $_.FullName -notlike "C:\Program Files*" } | 
        Select-Object FullName
    Compare-Object $oldStructure $newStructure -Property FullName | 
        Export-Csv "$comparisonPath\FileSystemChanges.csv"
    
    # Compare environment variables
    $oldEnv = Import-Csv "$snapshotPath\EnvironmentVariables.csv"
    $newEnv = Get-ChildItem Env:
    Compare-Object $oldEnv $newEnv -Property Name, Value | 
        Export-Csv "$comparisonPath\EnvironmentVariableChanges.csv"
    
    Write-Host "System comparison completed. Results saved to $comparisonPath"
}

# Function to backup application settings
function Backup-AppSettings {
    param (
        [string]$appName,
        [string]$settingsPath,
        [string]$backupPath
    )
    
    $date = Get-Date -Format "yyyyMMdd_HHmmss"
    $destinationPath = Join-Path $backupPath "$appName`_$date"
    
    Copy-Item -Path $settingsPath -Destination $destinationPath -Recurse
    Write-Host "Backed up settings for $appName to $destinationPath"
}

# Main menu
function Show-Menu {
    Clear-Host
    Write-Host "===== Windows System Tracker ====="
    Write-Host "1: Create System Snapshot"
    Write-Host "2: Compare System State"
    Write-Host "3: Backup App Settings"
    Write-Host "Q: Quit"
}

# Main loop
do {
    Show-Menu
    $input = Read-Host "Please make a selection"
    switch ($input) {
        '1' {
            Create-SystemSnapshot
        }
        '2' {
            $snapshotPath = Read-Host "Enter the path of the snapshot to compare against"
            Compare-SystemState -snapshotPath $snapshotPath
        }
        '3' {
            $appName = Read-Host "Enter the application name"
            $settingsPath = Read-Host "Enter the path to the application settings"
            $backupPath = Read-Host "Enter the backup destination path"
            Backup-AppSettings -appName $appName -settingsPath $settingsPath -backupPath $backupPath
        }
    }
    pause
}
until ($input -eq 'q')
