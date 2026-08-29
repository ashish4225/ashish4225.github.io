# Blog System

## How to Add a New Blog Post

### 1. Create a markdown file
Create a new `.md` file in this folder (`src/blog/`).
Name it with a URL-friendly slug, e.g. `my-new-post.md`.

### 2. Create an image folder
Create a folder for your post's images at:
```
public/assets/blog/<your-slug>/
```
Drop all your images (cover image, screenshots, diagrams, etc.) in there.

### 3. Register the post
Open `src/blog/index.ts` and:
1. Import your markdown file:
   ```ts
   import myPostContent from './my-new-post.md?raw';
   ```
2. Add an entry to the `blogPosts` array:
   ```ts
   {
     id: 'post-2',
     title: 'My New Post Title',
     slug: 'my-new-post',
     summary: 'A one-liner summary of the post.',
     content: myPostContent,
     cover_image: '/assets/blog/my-new-post/cover.jpg',
     tags: ['Tag1', 'Tag2'],
     published: true,
     published_at: '2026-09-01',
     created_at: '2026-09-01',
     updated_at: '2026-09-01',
   },
   ```

### 4. Reference images in markdown
Use paths relative to `public/`:
```markdown
![My diagram](/assets/blog/my-new-post/diagram.png)
```

## Supported Markdown Features
- `# H1`, `## H2`, `### H3`, `#### H4`
- **Bold**, *italic*, `inline code`
- Fenced code blocks with language hints (` ```cpp `)
- Images with captions: `![caption](/path/to/image.png)`
- Links: `[text](url)`
- Unordered lists (`- item`)
- Ordered lists (`1. item`)
- Blockquotes (`> quote`)
- Horizontal rules (`---`)

## Current Posts
| Slug | Title |
|------|-------|
| `slicer-3d-printing` | Building a 3D Printing Slicer from Scratch |
