#!/bin/bash

# Build script for Vikash Singh's Portfolio Website
# This script automates common development tasks

set -e  # Exit on any error

echo "🚀 Building Vikash Singh's Portfolio Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js to continue."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate blog data
echo "📝 Generating blog data..."
npm run build:blog

# Check if marked.min.js exists, if not download it
if [ ! -f "js/lib/marked.min.js" ]; then
    echo "📚 Downloading marked.min.js..."
    mkdir -p js/lib
    curl -s https://cdn.jsdelivr.net/npm/marked/marked.min.js -o js/lib/marked.min.js
    echo "✅ Downloaded marked.min.js"
fi

# Validate HTML files (basic check)
echo "🔍 Validating HTML files..."
html_files=("index.html" "publications.html" "education_experience.html" "blogs.html" "contact.html")
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Found: $file"
    else
        echo "❌ Missing: $file"
    fi
done

# Check CSS and JS files
echo "🎨 Checking CSS and JS files..."
if [ -f "css/style.css" ]; then
    echo "✅ Found: css/style.css"
else
    echo "❌ Missing: css/style.css"
fi

if [ -f "js/main.js" ]; then
    echo "✅ Found: js/main.js"
else
    echo "❌ Missing: js/main.js"
fi

if [ -f "js/blogs.js" ]; then
    echo "✅ Found: js/blogs.js"
else
    echo "❌ Missing: js/blogs.js"
fi

# Check if resume exists
if [ -f "assets/resume/CV_Vikash_PhD.pdf" ]; then
    echo "✅ Found: Resume file"
else
    echo "⚠️  Resume file not found at assets/resume/CV_Vikash_PhD.pdf"
fi

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📖 To serve the website locally:"
echo "   npm run serve     (using Python)"
echo "   npm run serve:php (using PHP)"
echo ""
echo "🔗 Then visit: http://localhost:8000"
