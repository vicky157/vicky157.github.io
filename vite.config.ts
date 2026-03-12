import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        publications: resolve(__dirname, 'publications.html'),
        'education-experience': resolve(__dirname, 'education_experience.html'),
        blogs: resolve(__dirname, 'blogs.html'),
        contact: resolve(__dirname, 'contact.html'),
        about: resolve(__dirname, 'about.html'),
        'publications-index': resolve(__dirname, 'publications/index.html'),
        'publications-grammars': resolve(__dirname, 'publications/grammars.html'),
        'publications-gpu': resolve(__dirname, 'publications/gpu-performance-modeling.html'),
        'publications-k4': resolve(__dirname, 'publications/k4-log-anomaly.html'),
        'blogs-index': resolve(__dirname, 'blogs/index.html'),
        'contact-index': resolve(__dirname, 'contact/index.html'),
        'education-experience-index': resolve(__dirname, 'education-experience/index.html'),
      },
    },
  },
});
