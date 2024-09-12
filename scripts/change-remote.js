/*
Instructions to run:
  1. Put this file into your project folder.
  2. Change directory in terminal to your project folder.
  2. Run this command in terminal: "node change-remote.js".
  4. Follow the prompts in the terminal.
*/

const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const runCommand = (command) => {
  try {
    const output = execSync(command, { encoding: "utf-8" });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}\n`, error);
    return false;
  }
};

const changeRemote = () => {
  rl.question("Have you created a remote repository? (y/n) ", (answer) => {
    if (answer.toLowerCase() !== "y") {
      console.log(
        "Please create a remote repository first and come back after.",
      );
      rl.close();
      return;
    }

    rl.question("Enter your Github username: ", (newRemoteUser) => {
      rl.question("Enter your new repository name: ", (newRemoteRepo) => {
        console.log("Checking current remote...");
        if (!runCommand("git remote -v")) return;

        console.log("Removing current remote...");
        if (!runCommand(`git remote remove origin`)) return;

        console.log("Adding new remote...");
        const newRemoteUrl = `git@github.com:${newRemoteUser}/${newRemoteRepo}.git`;
        if (!runCommand(`git remote add origin ${newRemoteUrl}`)) return;

        console.log("Setting upstream branch to main...");
        if (!runCommand(`git push --set-upstream origin main`)) return;

        console.log("Checking new remote...");
        if (!runCommand("git remote -v")) return;

        console.log("Remote change complete. You are finished.");

        rl.close();
      });
    });
  });
};

changeRemote();
