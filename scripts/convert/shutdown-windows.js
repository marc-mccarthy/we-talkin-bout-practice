#!/usr/bin/env node
// shutdown-windows.js

const { exec } = require("child_process");

const run = (command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Command stderr: ${stderr}`);
    }

    console.log(`Command stdout: ${stdout}`);
  });
};

run("shutdown /r /t 0");
