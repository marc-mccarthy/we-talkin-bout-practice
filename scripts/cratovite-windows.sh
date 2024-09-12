#!/bin/bash

cratovite() {
    FILE=package.json

    # This could be used to auto clone
    # You would use this like `cratovite ssh-url.git`
    # Uncomment these 3 lines to use it like that.

    # reponame=${1##*/}
    # reponame=${reponame%.git}

    # git clone $1 && cd $reponame

    # npm install
    if test -f "$FILE"; then
        echo ""
        echo "========================{ $FILE exists. Installing }========================"
        npm install
    else
        return
    fi

    git checkout -b vite

    # Install Vite and related packages
    npm install vite @vitejs/plugin-react vitest --save-dev

    # Uninstall Create React App (CRA) stuff
    npm uninstall react-scripts

    # Move index to root
    mv public/index.html .

    # Create a config file
    touch vite.config.js

    # Write to vite.config.js
    cat <<END >vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
        build: {
            outDir: 'build',
        },
        server: {
            proxy: {
                '/api':'http://localhost:5001',
            }
        },
        plugins: [react()],
    };
});
END

    # Change scripts in package.json
    npm pkg set 'scripts.build'='vite build'
    npm pkg set 'scripts.client'='vite'
    npm pkg set 'scripts.test'='vitest'
    npm pkg delete 'scripts.eject'
    # This is likely wrong for the apps that use cypress testing
    # npm config set scripts.test 'vitest'

    # Notify that the scripts need to be double-checked
    echo ""
    echo "========================{ TODO }========================"
    echo "Check your package.json scripts!"
    echo "eg: \"scripts\": {"
    echo "        \"start\": \"node server/server.js | vite\","
    echo "        \"client\": \"vite\","
    echo "        \"server\" : \"nodemon --watch server server/server.js\"",
    echo "        \"build\": \"vite build\","
    echo "        \"test\": \"vitest\""
    echo "     }"

    # Rename all React files with .js extension to have .jsx
    find 'src/' -type f -name "*.js" -exec bash -c 'mv "$1" "${1%.js}.jsx"' _ {} \;
    # Rename the files within src components directory
    find src/components -type f -name "*.js" -exec bash -c 'mv "$1" "${1%.js}.jsx"' _ {} \;

    # Remove all %PUBLIC_URL% from HTML file
    sed -i 's/\%PUBLIC_URL\%//g' ./index.html

    # Add script to HTML
    sed -i '/<\/body>/i\
        <script type="module" src="/src/index.jsx"></script>\
' index.html

    # Git stuff
    git add .
    git reset HEAD cratovite.sh cratovite*.sh
    # git commit -m "Migrate from CRA to Vite via script"
    # git push origin vite
}

# Call the function
cratovite
