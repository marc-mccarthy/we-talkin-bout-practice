import { exec } from "child_process";
import { promises as fs } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import ws from "windows-shortcuts";

const currentDir = dirname(fileURLToPath(import.meta.url));
console.log(currentDir)

class Packager {
  static NODE_MAJOR_VERSION = "18";
  static SOURCE_DIRECTORY = path.join(currentDir, "convert");
  static OUTPUT_DIRECTORY = path.join(currentDir, "executables");
  static SHORTCUT_BASE_PATH = "E:\\Shortcuts\\Applications";

  async createExe() {
    try {
      await this.#ensureDirectoryExists(Packager.OUTPUT_DIRECTORY);
      const jsFiles = await this.#getJsFilesFromSource();

      for (const file of jsFiles) {
        const baseName = path.basename(file, ".js");
        await this.#packageJsFile(baseName);
        await this.#createDesktopShortcut(baseName);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  async #ensureDirectoryExists(directory) {
    await fs.mkdir(directory, { recursive: true });
  }

  async #getJsFilesFromSource() {
    const files = await fs.readdir(Packager.SOURCE_DIRECTORY);
    return files.filter((file) => path.extname(file) === ".js");
  }

  async #packageJsFile(baseName) {
    const inputPath = path.join(Packager.SOURCE_DIRECTORY, `${baseName}.js`);
    const outputPath = path.join(Packager.OUTPUT_DIRECTORY, `${baseName}.exe`);

    const pkgCommand = `npx pkg ${inputPath} -t node${Packager.NODE_MAJOR_VERSION}-win-x64 -o ${outputPath}`;
    console.log(`Creating package: ${baseName}.js`);
    await this.#runCommand(pkgCommand);
    console.log(`Finished package: ${baseName}.exe`);
  }

  async #createDesktopShortcut(baseName) {
    const executablePath = path.join(Packager.OUTPUT_DIRECTORY, `${baseName}.exe`);
    const shortcutPath = path.join(Packager.SHORTCUT_BASE_PATH, `${this.#toTitleCase(baseName)}.lnk`);

    return new Promise((resolve, reject) => {
      ws.create(shortcutPath, executablePath, (err) => {
        if (err) {
          console.error(`Failed to create shortcut at: ${shortcutPath}: ${err}`);
          reject(err);
        } else {
          console.log(`Shortcut created: ${this.#toTitleCase(baseName)}.lnk`);
          resolve();
        }
      });
    });
  }

  #runCommand(command) {
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

  #toTitleCase(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
}

new Packager().createExe();
