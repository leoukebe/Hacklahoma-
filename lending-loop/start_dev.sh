#!/bin/bash
# Helper script to start the app with the correct Node.js environment

# Add the Node.js binary we found to the PATH
export PATH="/Users/owenwhitaker/.nvm/versions/node/v22.18.0/bin:$PATH"

echo "Using Node.js: $(node -v)"
echo "Starting Lending Loop..."

npm run dev
