#!/usr/bin/env bash

USER_NAME="Marc McCarthy"
USER_EMAIL="marstheory20@gmail.com"
EDITOR="code --wait"
MERGEDIFF="code --wait"

# Detect OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macOS"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    OS="Windows"
else
    OS="Linux"
fi

# User Info
git config --global user.name "$USER_NAME"
git config --global user.email "$USER_EMAIL"

# Default editor
git config --global core.editor "$EDITOR"

# Default Branch
git config --global init.defaultBranch main

# Color UI
git config --global color.ui auto

# Merge and Diff Tools
git config --global merge.tool "$MERGEDIFF"
git config --global diff.tool "$MERGEDIFF"

# Push/Pull Behavior
git config --global push.default current
git config --global pull.rebase false

# Credential Helper
if [[ "$OS" == "Windows" ]]; then
    git config --global credential.helper wincred
elif [[ "$OS" == "macOS" ]]; then
    git config --global credential.helper osxkeychain
else
    git config --global credential.helper cache
fi

# Auto-correct
git config --global help.autocorrect 1

echo "Git configuration complete!"
