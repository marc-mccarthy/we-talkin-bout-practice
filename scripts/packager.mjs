import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import ws from 'windows-shortcuts';

const nodeMajorVersion = '18';
const sourceDirectory = 'E:\\Repos\\we-talkin-bout-practice\\scripts\\convert';
const outputDirectory = 'E:\\Repos\\we-talkin-bout-practice\\scripts\\executables';

async function compiler() {
  try {
    // Ensure output directory exists
    await fs.mkdir(outputDirectory, { recursive: true });

    // Get all .js files from the source directory
    const files = await fs.readdir(sourceDirectory);
    const jsFiles = files.filter(file => path.extname(file) === '.js');
    

    // Package each .js file
    for (const file of jsFiles) {
      // current file and shortcut name
      const baseName = path.basename(file, '.js');
      const shortcutName = toTitleCase(baseName) + '.lnk';

      // Paths to the input .js file, output .exe file, and shortcut
      const inputPath = path.join(sourceDirectory, file);
      const outputPath = path.join(outputDirectory, path.basename(file, '.js') + '.exe');
      const shortcutPath = path.join(`E:\\Shortcuts\\Applications\\${shortcutName}`)
      
      // Use pkg to package the .js file
      const pkgCommand = `npx pkg ${inputPath} -t node${nodeMajorVersion}-win-x64 -o ${outputPath}`;
      console.log(`Creating package from: ${inputPath}`);
      await runCommand(pkgCommand);
      console.log(`Finished package at: ${outputPath}`);

      // Create a shortcut on the desktop
      ws.create(shortcutPath, outputPath, function(err) {
        if (!err) {
          console.log(`Shortcut created at: ${shortcutPath}`);
        } else {
          console.error(`Failed to create shortcut at: ${shortcutPath}: ${err}`);
        }
      });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

// Helper function to execute shell commands
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command failed with error code ${error.code}:\n`, stderr);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

function toTitleCase(str) {
  return str
    .split('-')  // Split the string at each hyphen
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize the first letter of each word
    .join(' ');  // Join the words back together, separated by spaces
}

compiler();
