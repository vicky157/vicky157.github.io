import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'blogs');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  author: string;
  tags: string[];
  content: string;
}

export function getSortedBlogsData(): BlogPost[] {
  // Create the directory if it doesn't exist
  if (!fs.existsSync(blogsDirectory)) {
    fs.mkdirSync(blogsDirectory, { recursive: true });
  }
  
  // Get file names under /blogs
  const fileNames = fs.readdirSync(blogsDirectory);
  
  const allBlogsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      slug,
      content: matterResult.content,
      ...(matterResult.data as { 
        title: string;
        date: string;
        excerpt: string;
        readTime: string;
        author: string;
        tags: string[];
      }),
    };
  });

  // Sort posts by date
  return allBlogsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllBlogSlugs() {
  // Create the directory if it doesn't exist
  if (!fs.existsSync(blogsDirectory)) {
    fs.mkdirSync(blogsDirectory, { recursive: true });
    return [];
  }
  
  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getBlogData(slug: string): BlogPost {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the slug and content
  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as { 
      title: string;
      date: string;
      excerpt: string;
      readTime: string;
      author: string;
      tags: string[];
    }),
  };
}