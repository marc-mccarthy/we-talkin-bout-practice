import { copyFile, mkdir, readdir, stat } from 'fs/promises';
import { homedir } from 'os';
import { basename, join } from 'path';

const config = {
  repoDirectory: join(homedir(), 'Repos'),
  excludedFolders: ['other', 'prime'],
  baseDestinationFolder: join(homedir(), 'Desktop/Backup'),
  filesToBackup: ['terraform/local.auto.tfvars', '.env.local', '.env'],
};

const { repoDirectory, excludedFolders, baseDestinationFolder, filesToBackup } =
  config;

const colors = {
  boldGreen: '\x1b[1;32m',
  boldRed: '\x1b[1;31m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  yellow: '\x1b[33m',
};

const { boldGreen, boldRed, green, reset, yellow } = colors;

const backupFiles = async () => {
  console.log(`${boldGreen}Starting backup of files...${reset}`);
  const allDirectories = await readdir(repoDirectory);
  const filteredRepos = allDirectories.filter(
    (folder) => !excludedFolders.includes(folder)
  );
  for (const repo of filteredRepos) {
    for (const file of filesToBackup) {
      const filePath = join(repoDirectory, repo, file);
      await copyFileToDestination(filePath, repo);
    }
  }
  console.log(`${boldGreen}Backup complete!${reset}`);
};

const copyFileToDestination = async (source, repo) => {
  const destinationFolder = join(baseDestinationFolder, repo);
  const destination = join(destinationFolder, basename(source));
  try {
    if (await fileExists(source)) {
      await mkdir(destinationFolder, { recursive: true });
      await copyFile(source, destination);
      console.log(`${green}Successful: ${repo}/${basename(source)}${reset}`);
    } else {
      console.log(
        `${yellow}Does Not Exist: ${repo}/${basename(source)}${reset}`
      );
    }
  } catch (error) {
    console.error(
      `${boldRed}Failed: ${basename(source)} - ${error.message}${reset}`
    );
  }
};

const fileExists = async (path) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

backupFiles();
