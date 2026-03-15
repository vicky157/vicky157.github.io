export interface BlogFrontmatter {
  title?: string;
  date?: string;
  author?: string;
  summary?: string;
  keywords?: string;
  math?: string | boolean;
}

export interface BlogPost {
  id: string;
  filename: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

export interface BlogElements {
  blogPostsContainer: HTMLElement;
  fullBlogPostView: HTMLElement;
  blogContentArea: HTMLElement;
  backToListButton: HTMLElement | null;
  blogIntroSection: HTMLElement | null;
}

export interface SpotifyTrackData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  previewUrl?: string;
  progress?: number | null;
  duration?: number;
  type?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  links: { label: string; url: string; icon: string; isInternal?: boolean }[];
  abstract?: string;
  bibtex: string;
  featured: boolean;
  equalContribution?: string;
}

export interface NewsItem {
  date: string;
  text: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  dates: string;
  courses: { name: string; description: string }[];
}

export interface ExperienceEntry {
  title: string;
  institution: string;
  dates: string;
  items: string[];
}

export interface ResearchEntry {
  title: string;
  institution: string;
  dates: string;
  items: string[];
}

export interface ProjectEntry {
  title: string;
  techStack: string;
  date: string;
  items: string[];
  link: { url: string; label: string; icon: string };
}

export interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href?: string;
  target?: string;
}

export interface Route {
  path: string;
  title: string;
  page: string;
  render: () => string;
  afterRender?: () => void;
}

declare global {
  interface Window {
    currentBlogData?: {
      postData: BlogPost;
      allPosts: BlogPost[];
      elements: BlogElements;
    };
    allBlogPosts?: BlogPost[];
    loadSpecificPost?: (postId: string) => void;
    highlightModeEnabled?: boolean;
    readingLineEnabled?: boolean;
    speechSupported?: boolean;
    toggleBibtex: (event: Event, bibtexId: string) => void;
    toggleAbstract: (event: Event, abstractId: string) => void;
    MathJax?: {
      typesetPromise?: (elements: HTMLElement[]) => Promise<void>;
      typeset?: (elements: HTMLElement[]) => void;
      startup?: { defaultReady: () => void };
    };
  }
}

export {};
