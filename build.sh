#!/bin/bash

echo "Starting build process..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Working directory: $(pwd)"

# Ensure dependencies are installed
echo "Installing dependencies..."
npm ci

# Check if vite is available
echo "Checking vite installation..."
if [ -f "./node_modules/.bin/vite" ]; then
    echo "Vite found at ./node_modules/.bin/vite"
else
    echo "Vite not found, trying to install..."
    npm install vite
fi

# Run the build
echo "Running vite build..."
NODE_ENV=production ./node_modules/.bin/vite build

echo "Build completed!"
echo "Output directory contents:"
ls -la client/dist/