import fs from 'fs';
import path from 'path';
import util from 'util';
import ws from 'windows-shortcuts';

// Configuration
const shortcutsFolderPath = 'E:\\Shortcuts\\PC\\Emulators';
const newDrive = 'F';
const oldRootFolder = 'Games';
const newRootFolder = 'PC';

// Promisify the ws functions
const readShortcut = util.promisify(ws.query);
const writeShortcut = util.promisify(ws.create);

// Function to change the drive letter and root folder in a shortcut
async function changeShortcutPath(
  shortcutPath,
  newDrive,
  oldRootFolder,
  newRootFolder
) {
  try {
    const shortcutData = await readShortcut(shortcutPath);
    const currentTarget = shortcutData.target;

    // Change the drive letter and root folder
    const regexPattern = new RegExp(
      `^([A-Za-z]):[\\\\/]${oldRootFolder}([\\\\/].*)$`,
      'i'
    );
    const newTarget = currentTarget.replace(
      regexPattern,
      `${newDrive}:/${newRootFolder}$2`
    );

    if (newTarget !== currentTarget) {
      await writeShortcut(shortcutPath, { target: newTarget });
      console.log(`Successfully updated: ${shortcutPath}`);
      console.log(`Old target: ${currentTarget}`);
      console.log(`New target: ${newTarget}`);
    } else {
      console.log(`No changes needed for: ${shortcutPath}`);
    }
  } catch (error) {
    console.error(`Error updating ${shortcutPath}:`, error);
  }
}

// Function to process all shortcuts in a folder
async function processShortcuts(
  folderPath,
  newDrive,
  oldRootFolder,
  newRootFolder
) {
  try {
    const files = await fs.promises.readdir(folderPath);

    for (const file of files) {
      if (path.extname(file).toLowerCase() === '.lnk') {
        const shortcutPath = path.join(folderPath, file);
        await changeShortcutPath(
          shortcutPath,
          newDrive,
          oldRootFolder,
          newRootFolder
        );
      }
    }

    console.log('All shortcuts processed.');
  } catch (error) {
    console.error('Error reading folder:', error);
  }
}

processShortcuts(shortcutsFolderPath, newDrive, oldRootFolder, newRootFolder);
