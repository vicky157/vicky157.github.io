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
