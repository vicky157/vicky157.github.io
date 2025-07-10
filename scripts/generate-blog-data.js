/**
 * Blog Data Generator Script
 * Processes Markdown files in _blogs directory and generates JSON data for the website
 * 
 * Usage: node scripts/generate-blog-data.js
 */

// scripts/generate-blog-data.js
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// --- Configuration ---
// Assumes your Markdown blog posts are in a '_blogs' folder at the project root
const blogsSourceDir = path.join(__dirname, '..', '_blogs');
// Output JSON file will be placed in the 'js' folder
const outputJsonPath = path.join(__dirname, '..', 'js', 'blogs-data.json');
// --- End Configuration ---

function parseFrontmatter(text, filenameForWarning) {
    const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/;
    const match = frontmatterRegex.exec(text);
    const frontmatter = {};
    let content = text;

    if (match) {
        const yamlStr = match[1];
        content = text.substring(match[0].length).trim();
        yamlStr.split('\n').forEach(line => {
            const parts = line.split(':');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                // Handle values that might contain colons by joining the rest of the parts
                const value = parts.slice(1).join(':').trim().replace(/^["']|["']$/g, '');
                frontmatter[key] = value;
            }
        });
    } else {
        console.warn(`Warning: No YAML frontmatter found or correctly parsed in ${filenameForWarning}`);
    }
    return { frontmatter, content };
}

function imagePathToBase64(markdownFilePath, relativeImagePath) {
    try {
        // Resolve the absolute path to the image. Assumes image paths in Markdown are relative to the Markdown file itself.
        const imageAbsPath = path.resolve(path.dirname(markdownFilePath), relativeImagePath);

        if (fs.existsSync(imageAbsPath)) {
            const imageBuffer = fs.readFileSync(imageAbsPath);
            const base64Image = imageBuffer.toString('base64');
            const mimeType = mime.lookup(imageAbsPath) || 'application/octet-stream'; // Default MIME type
            return `data:${mimeType};base64,${base64Image}`;
        } else {
            console.warn(`Image not found: ${imageAbsPath} (referenced in ${path.basename(markdownFilePath)})`);
            return null; // Or return original path to keep it as a broken link
        }
    } catch (error) {
        console.error(`Error processing image ${relativeImagePath} in ${path.basename(markdownFilePath)}:`, error);
        return null;
    }
}

function processMarkdownContent(markdownContent, markdownFilePath) {
    let processedContent = markdownContent;

    // First, clean the content by removing citation references
    // Remove [cite: X] patterns (where X can be numbers, comma-separated numbers, etc.)
    processedContent = processedContent.replace(/\s*\[cite:\s*[^\]]+\]/gi, '');
    
    // Fix malformed markdown code blocks (4+ backticks to 3 backticks)
    processedContent = processedContent.replace(/````+/g, '```');
    
    // Clean up any double spaces that might result from citation removal
    processedContent = processedContent.replace(/[ \t]{2,}/g, ' ');
    
    // Preserve line breaks and paragraph structure  
    processedContent = processedContent.replace(/\r\n/g, '\n'); // Normalize line endings
    processedContent = processedContent.replace(/\r/g, '\n'); // Handle old Mac line endings
    
    // Fix malformed HTML escaping patterns that appear in the content
    processedContent = processedContent.replace(/\\</g, '<');
    processedContent = processedContent.replace(/\\>/g, '>');
    processedContent = processedContent.replace(/\\"/g, '"');
    processedContent = processedContent.replace(/\\'/g, "'");
    processedContent = processedContent.replace(/\\\\/g, '\\');
    
    // Fix malformed tags like \</code\>\</pre\>
    processedContent = processedContent.replace(/\\<\//g, '</');
    
    // Regex for Markdown images: ![alt text](image-path)
    // It won't process http(s):// or existing data: URIs
    const mdImageRegex = /!\[(.*?)\]\((?!https?:\/\/|data:)(.*?)\)/g;
    processedContent = processedContent.replace(mdImageRegex, (match, altText, imagePath) => {
        const base64Src = imagePathToBase64(markdownFilePath, imagePath);
        if (base64Src) {
            return `![${altText}](${base64Src})`;
        }
        return match; // Keep original if conversion failed
    });

    // Regex for HTML <img> tags: <img src="image-path" ...>
    // It won't process http(s):// or existing data: URIs in src
    const htmlImageRegex = /<img([^>]*?)src=(["'])((?!https?:\/\/|data:).*?)\2([^>]*?)>/gi;
    processedContent = processedContent.replace(htmlImageRegex, (match, beforeSrc, quote, imagePath, afterSrc) => {
        const base64Src = imagePathToBase64(markdownFilePath, imagePath);
        if (base64Src) {
            return `<img${beforeSrc}src=${quote}${base64Src}${quote}${afterSrc}>`;
        }
        return match; // Keep original if conversion failed
    });

    return processedContent;
}

function generateBlogData() {
    const allPostsData = [];
    try {
        if (!fs.existsSync(blogsSourceDir)) {
            console.error(`Error: Blogs source directory not found at ${blogsSourceDir}`);
            console.log(`Please ensure you have a '_blogs' folder in the root of your project containing your Markdown files.`);
            return;
        }

        const files = fs.readdirSync(blogsSourceDir);
        let postIdCounter = 0; // Fallback for ID generation

        for (const filename of files) {
            if (path.extname(filename).toLowerCase() === '.md') {
                const markdownFilePath = path.join(blogsSourceDir, filename);
                const markdownText = fs.readFileSync(markdownFilePath, 'utf-8');
                const { frontmatter, content: rawContent } = parseFrontmatter(markdownText, filename);

                const processedContent = processMarkdownContent(rawContent, markdownFilePath);

                const id = path.basename(filename, '.md').replace(/\s+/g, '-').toLowerCase();

                allPostsData.push({ 
                    id: id || `post-${postIdCounter++}`,
                    filename,
                    frontmatter, 
                    content: processedContent // Content now has Base64 images
                });
            }
        }
        fs.writeFileSync(outputJsonPath, JSON.stringify(allPostsData, null, 2), 'utf-8');
        console.log(`Successfully generated ${outputJsonPath} with ${allPostsData.length} posts.`);
        if (allPostsData.length === 0) {
            console.log("No Markdown files were found in the _blogs directory, so blogs-data.json is empty.");
        }

    } catch (error) {
        console.error('Error generating blog data:', error);
    }
}

generateBlogData();