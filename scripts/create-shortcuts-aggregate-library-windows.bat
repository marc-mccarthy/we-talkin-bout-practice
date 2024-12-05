@echo off
setlocal enabledelayedexpansion

echo Starting Shortcuts Library creation script...
echo.

:: Set your custom library location
set "CUSTOM_PATH=E:\Google Drive\OS\Windows\Libraries"
set "LIBRARY_NAME=Shortcuts Aggregate"
set "LIBRARY_FILE=Shortcuts Aggregate.library-ms"

echo Custom Path: %CUSTOM_PATH%
echo Library Name: %LIBRARY_NAME%
echo Library File: %LIBRARY_FILE%
echo.

:: Create directory if it doesn't exist
if not exist "%CUSTOM_PATH%" (
    echo Creating directory: %CUSTOM_PATH%
    mkdir "%CUSTOM_PATH%"
)

:: First, let's create the library directly in the Windows Libraries folder
set "WINDOWS_LIBRARY_PATH=%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Libraries\%LIBRARY_FILE%"

echo Creating library file...
echo.

:: Create the library file
(
echo ^<?xml version="1.0" encoding="UTF-8"?^>
echo ^<libraryDescription xmlns="http://schemas.microsoft.com/windows/2009/library"^>
echo ^<name^>%LIBRARY_NAME%^</name^>
echo ^<version^>6^</version^>
echo ^<isLibraryPinned^>true^</isLibraryPinned^>
echo ^<iconReference^>imageres.dll,-1002^</iconReference^>
echo ^<templateInfo^>
echo ^<folderType^>{7d49d726-3c21-4f05-99aa-fdc2c9474656}^</folderType^>
echo ^</templateInfo^>
echo ^<searchConnectorDescriptionList^>
) > "%WINDOWS_LIBRARY_PATH%"

echo Adding locations to library...
echo.

:: Define and process each location individually
call :AddLocation "%APPDATA%\Microsoft\Windows\Start Menu\Programs"
call :AddLocation "%PROGRAMDATA%\Microsoft\Windows\Start Menu\Programs"
call :AddLocation "%USERPROFILE%\Desktop"
call :AddLocation "C:\Users\Public\Desktop"
call :AddLocation "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
call :AddLocation "%PROGRAMDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
call :AddLocation "%APPDATA%\Microsoft\Internet Explorer\Quick Launch"
call :AddLocation "%APPDATA%\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar"
call :AddLocation "C:\ProgramData\Microsoft\Windows\Start Menu"
call :AddLocation "%LOCALAPPDATA%\Microsoft\WindowsApps"
call :AddLocation "%APPDATA%\Microsoft\Windows\SendTo"
call :AddLocation "%USERPROFILE%\AppData\Local\Microsoft\Windows\WinX"

:: Close the XML file
(
echo ^</searchConnectorDescriptionList^>
echo ^</libraryDescription^>
) >> "%WINDOWS_LIBRARY_PATH%"

:: Copy the library file to backup location
echo.
echo Copying library file to backup location...
copy "%WINDOWS_LIBRARY_PATH%" "%CUSTOM_PATH%\%LIBRARY_FILE%" /Y
if !errorlevel! equ 0 (
    echo Library file backed up successfully
) else (
    echo WARNING: Failed to backup library file
)

echo.
echo Summary:
echo - Library file created at: %WINDOWS_LIBRARY_PATH%
echo - Backup copy created at: %CUSTOM_PATH%\%LIBRARY_FILE%
echo.

echo Script completed. Press any key to exit...
pause >nul
exit /b 0

:AddLocation
set "LOC=%~1"
if exist "%LOC%" (
    echo Processing: %LOC%
    (
    echo ^<searchConnectorDescription^>
    echo ^<isDefaultSaveLocation^>false^</isDefaultSaveLocation^>
    echo ^<isSupported^>true^</isSupported^>
    echo ^<simpleLocation^>
    echo ^<url^>%LOC%^</url^>
    echo ^</simpleLocation^>
    echo ^</searchConnectorDescription^>
    ) >> "%WINDOWS_LIBRARY_PATH%"
) else (
    echo Skipping non-existent path: %LOC%
)
goto :eof