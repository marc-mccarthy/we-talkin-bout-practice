#!/usr/bin/env node
// restart-windows.js

const { exec } = require('child_process');

const run = (command) => {
  const { error, stderr, stdout } = exec(command);

  if (error?.message) {
    console.error(error.message);
  }

  if (stderr) {
    console.error(stderr);
  }
  
  console.log(stdout);
};

run('shutdown /r /t 0');
