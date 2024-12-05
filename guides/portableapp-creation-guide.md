# Complete Guide to Creating a PortableApp

This guide will walk you through creating a PortableApp from start to finish, using captured registry changes from your application's installation.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Directory Structure](#directory-structure)
3. [Capturing Registry Changes](#capturing-registry-changes)
4. [Creating the Launcher](#creating-the-launcher)
5. [App Configuration](#app-configuration)
6. [Testing](#testing)
7. [Distribution](#distribution)

## Prerequisites

Before starting, you'll need:

- The original application installer or files
- A .reg file containing registry changes from installation
- [NSIS (Nullsoft Scriptable Install System)](https://nsis.sourceforge.io/Download)
- [PortableApps.com Launcher Generator](https://portableapps.com/apps/development/portableapps.com_launcher)
- A text editor (like Notepad++ or VS Code)

## Directory Structure

Create the following directory structure for your portable app:

```plaintext
AppNamePortable/
├── App/
│   ├── AppName/           # Main application files
│   └── DefaultData/       # Default settings & data
├── Data/                  # User settings & data
├── Other/                 # Source code, help files
└── AppNamePortable.exe    # Launcher (will create later)
```

### Detailed Directory Explanation

1. **App Directory**
   - `AppName/`: Contains all main application files
   - `DefaultData/`: Contains default settings that will be copied to Data/ on first run

2. **Data Directory**
   - Stores user-specific settings
   - Created automatically on first run
   - Contents persist between runs

3. **Other Directory**
   - Source code
   - License files
   - Help documentation

## Capturing Registry Changes

1. **Before Installation**
   - Export current registry state:
   ```
   regedit /e before_install.reg
   ```

2. **Install Application**
   - Install your application normally
   - Note all default installation paths

3. **After Installation**
   - Export new registry state:
   ```
   regedit /e after_install.reg
   ```

4. **Compare Registry Changes**
   - Use a diff tool to compare before_install.reg and after_install.reg
   - Save relevant changes to app_changes.reg

## Creating the Launcher

### 1. Basic launcher.ini Structure

Create `App\AppName\launcher.ini`:

```ini
[Launch]
ProgramExecutable=AppName\YourApp.exe
DirectoryMoveOK=yes
SupportsUNC=yes

[Activate]
Registry=true

[RegistryKeys]
ExampleKey1=HKEY_CURRENT_USER\Software\YourApp
ExampleKey2=HKEY_LOCAL_MACHINE\SOFTWARE\YourApp

[RegistryValueWrite]
HKEY_CURRENT_USER\Software\YourApp\InstallPath=%PAL:AppDir%\AppName
HKEY_CURRENT_USER\Software\YourApp\DataPath=%PAL:DataDir%

[Environment]
PATH=%PAL:AppDir%\AppName;%PATH%
```

### 2. Registry Handling

1. Analyze your .reg file for:
   - Installation paths
   - User settings
   - File associations

2. Convert absolute paths to portable variables:
   - `%PAL:AppDir%` - App directory
   - `%PAL:DataDir%` - Data directory
   - `%PAL:Drive%` - Drive letter
   - `%PAL:LastDrive%` - Previous drive letter

### 3. Generate Launcher

1. Open PortableApps.com Launcher Generator
2. Select your app directory
3. Configure settings based on your launcher.ini
4. Generate the launcher

## App Configuration

### 1. Prepare DefaultData

1. Install app normally
2. Configure default settings
3. Copy configuration files to `App\DefaultData`
4. Document file locations in `Other\Source`

### 2. Handle File Paths

Replace absolute paths in configuration files with portable variables:
- `${APPDIR}` or `%PAL:AppDir%`
- `${DATADIR}` or `%PAL:DataDir%`

## Testing

1. **Clean System Test**
   - Use a clean Windows installation/VM
   - Run your portable app
   - Verify all features work

2. **Different Drive Letters**
   - Test on different drive letters
   - Verify paths update correctly

3. **Registry Check**
   - Run app and use features
   - Close app
   - Verify registry is clean

4. **Data Persistence**
   - Make settings changes
   - Close and move app
   - Verify settings persist

## Distribution

### 1. Package Preparation

1. Clean temporary files
2. Remove development files
3. Update documentation

### 2. Create Installer

1. Use NSIS or PortableApps.com Installer
2. Include all required files
3. Set correct metadata
4. Test installation package

### 3. Final Verification

1. Install on clean system
2. Run all features
3. Check for missing dependencies
4. Verify uninstall process

## Common Issues and Solutions

### 1. Registry Issues
- Use Process Monitor to track registry access
- Add missing registry keys to launcher.ini
- Check for hardcoded paths

### 2. File Path Issues
- Search all files for absolute paths
- Convert to portable variables
- Test on different drives

### 3. Permission Issues
- Avoid admin requirements
- Use HKCU instead of HKLM
- Document any elevation needs

## Best Practices

1. **Documentation**
   - Document all modifications
   - List known limitations
   - Include source references

2. **Testing**
   - Test on multiple Windows versions
   - Verify on clean systems
   - Check different user permissions

3. **Maintenance**
   - Keep source files organized
   - Document build process
   - Save all configuration steps

## Resources

- [PortableApps.com Development](https://portableapps.com/development)
- [NSIS Documentation](https://nsis.sourceforge.io/Docs/)
- [PortableApps.com Launcher Manual](https://portableapps.com/manuals/PortableApps.comLauncher/)

## Conclusion

Creating a PortableApp requires attention to detail and thorough testing. Follow this guide step by step, and don't skip the testing phase. If you encounter issues, the PortableApps.com forums are an excellent resource for getting help.

Remember to:

1. Keep all development files organized
2. Document your changes
3. Test thoroughly
4. Follow PortableApps.com standards
