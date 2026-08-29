/**
 * Blog Post Registry
 *
 * To add a new blog post:
 * 1. Create a new .md file in this folder (e.g., my-new-post.md)
 * 2. Create an image folder at public/assets/blog/<slug>/
 * 3. Add an entry to the `blogPosts` array below
 * 4. Reference images in markdown as: ![alt](/assets/blog/<slug>/image.png)
 */

import type { BlogPost } from '@/types';

// Import markdown files as raw text
import slicerContent from './slicer-3d-printing.md?raw';

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Building a 3D Printing Slicer in C++',
    slug: 'slicer-3d-printing',
    summary:
      'A deep dive into writing a custom slicer for 3D printing — from parsing OBJ meshes and computing slice contours to generating G-code, all in C++.',
    content: slicerContent,
    cover_image: '/assets/blog/slicer-3d-printing/coverimage.png',
    tags: ['C++', '3D Printing', 'Slicer', 'G-code'],
    published: true,
    published_at: '2026-08-24',
    created_at: '2026-08-24',
    updated_at: '2026-08-24',
  },
];

/**
 * Get all published blog posts, sorted newest first.
 */
export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.published_at || 0).getTime() -
        new Date(a.published_at || 0).getTime()
    );
}

/**
 * Get a single blog post by slug.
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && p.published);
}
