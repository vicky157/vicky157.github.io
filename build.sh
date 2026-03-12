#!/bin/bash

# Build script for Vikash Singh's Portfolio Website (Vite + TypeScript)
# This script automates the full build process

set -e

echo "Building Vikash Singh's Portfolio Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js 18+ to continue."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Generate blog data
echo "Generating blog data..."
npm run build:blog

# Type check
echo "Running TypeScript type check..."
npx tsc --noEmit

# Build with Vite
echo "Building with Vite..."
npx vite build

echo ""
echo "Build completed successfully! Output in dist/"
echo ""
echo "To preview the build locally:"
echo "   npx vite preview"
echo ""
echo "To start development server:"
echo "   npm run dev"
echo ""
echo "Then visit: http://localhost:5173"
