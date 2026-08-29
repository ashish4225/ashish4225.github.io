import { ArrowLeft, AlertCircle } from 'lucide-react';
import { navigate } from '@/router';
import { getPostBySlug } from '@/blog';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function BlogPostPage({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="page-fade min-h-screen px-6 pt-28 pb-20">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate({ name: 'blog' })}
            className="glass-pill rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-ink-700 hover:bg-white/50 transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Blog
          </button>
          <div className="glass rounded-3xl p-8 text-center">
            <AlertCircle className="mx-auto mb-4 text-ink-400" size={32} />
            <p className="text-ink-600">Post not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="page-fade min-h-screen px-6 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate({ name: 'blog' })}
          className="glass-pill rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-ink-700 hover:bg-white/50 transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Blog
        </button>

        <article className="glass rounded-4xl p-8 md:p-12">
          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-ink-400 mb-4">
            <span>{date}</span>
          </div>

          {/* Content */}
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/30">
            {post.tags.map((t) => (
              <span
                key={t}
                className="glass-pill px-3 py-1.5 rounded-full text-sm font-medium text-ink-600"
              >
                {t}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

/**
 * Render a LaTeX string to HTML using KaTeX.
 */
function renderLatex(tex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(tex.trim(), {
      displayMode,
      throwOnError: false,
    });
  } catch {
    return `<code>${tex}</code>`;
  }
}

/**
 * Lightweight markdown-to-HTML renderer.
 * Supports: headings, bold, italic, inline code, fenced code blocks,
 * images, links, unordered lists, ordered lists, blockquotes,
 * horizontal rules, and LaTeX math (\[...\] display, $...$ inline).
 */
function renderMarkdown(md: string): string {
  // 1. Extract fenced code blocks to protect them
  const codeBlocks: string[] = [];
  let processed = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const langClass = lang ? ` class="language-${lang}"` : '';
    codeBlocks.push(`<pre><code${langClass}>${escaped.trimEnd()}</code></pre>`);
    return `%%CODEBLOCK_${codeBlocks.length - 1}%%`;
  });

  // 2. Extract and render display math blocks: \[...\]
  const mathBlocks: string[] = [];
  processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, (_match, tex) => {
    const rendered = renderLatex(tex, true);
    mathBlocks.push(`<div class="katex-display-block">${rendered}</div>`);
    return `%%MATHBLOCK_${mathBlocks.length - 1}%%`;
  });

  // Split into blocks by double newlines
  const blocks = processed.split(/\n\n+/);
  const htmlBlocks: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Check for code block placeholder
    const codeMatch = trimmed.match(/^%%CODEBLOCK_(\d+)%%$/);
    if (codeMatch) {
      htmlBlocks.push(codeBlocks[parseInt(codeMatch[1])]);
      continue;
    }

    // Check for display math placeholder
    const mathMatch = trimmed.match(/^%%MATHBLOCK_(\d+)%%$/);
    if (mathMatch) {
      htmlBlocks.push(mathBlocks[parseInt(mathMatch[1])]);
      continue;
    }

    // HTML comment lines (skip)
    if (/^<!--[\s\S]*?-->$/.test(trimmed)) continue;

    // Horizontal rule
    if (/^(---|\*\*\*|___)$/.test(trimmed)) {
      htmlBlocks.push('<hr />');
      continue;
    }

    // Headings
    const h1 = trimmed.match(/^# (.+)$/);
    if (h1) { htmlBlocks.push(`<h1>${inlineFormat(h1[1])}</h1>`); continue; }

    const h2 = trimmed.match(/^## (.+)$/);
    if (h2) { htmlBlocks.push(`<h2>${inlineFormat(h2[1])}</h2>`); continue; }

    const h3 = trimmed.match(/^### (.+)$/);
    if (h3) { htmlBlocks.push(`<h3>${inlineFormat(h3[1])}</h3>`); continue; }

    const h4 = trimmed.match(/^#### (.+)$/);
    if (h4) { htmlBlocks.push(`<h4>${inlineFormat(h4[1])}</h4>`); continue; }

    // Image/Video-only block
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const src = imgMatch[2];
      const caption = imgMatch[1];
      if (src.endsWith('.webm') || src.endsWith('.mp4')) {
        htmlBlocks.push(
          `<figure class="blog-image"><video src="${src}" autoplay loop muted playsinline class="w-full rounded-2xl shadow-sm"></video>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`
        );
      } else {
        htmlBlocks.push(
          `<figure class="blog-image"><img src="${src}" alt="${caption}" loading="lazy" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`
        );
      }
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteContent = trimmed
        .split('\n')
        .map((l) => l.replace(/^>\s?/, ''))
        .join(' ');
      htmlBlocks.push(`<blockquote><p>${inlineFormat(quoteContent)}</p></blockquote>`);
      continue;
    }

    // Unordered list
    if (/^[-*] /.test(trimmed)) {
      const items = trimmed.split('\n').map((l) => {
        const content = l.replace(/^[-*] /, '');
        return `<li>${inlineFormat(content)}</li>`;
      });
      htmlBlocks.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(trimmed)) {
      const items = trimmed.split('\n').map((l) => {
        const content = l.replace(/^\d+\.\s/, '');
        return `<li>${inlineFormat(content)}</li>`;
      });
      htmlBlocks.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    // Default: paragraph (may be multi-line)
    const lines = trimmed.split('\n').map((l) => inlineFormat(l)).join('<br/>');
    htmlBlocks.push(`<p>${lines}</p>`);
  }

  return htmlBlocks.join('\n');
}

/**
 * Apply inline formatting: images, links, bold, italic, inline code, inline math.
 */
function inlineFormat(text: string): string {
  let s = text;
  // Escape HTML
  s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Inline code (before bold/italic to avoid conflicts)
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Inline math: $...$ (single dollar, not $$)
  s = s.replace(/(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g, (_match, tex) => {
    return renderLatex(tex, false);
  });
  // Images and Videos
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, src) => {
    if (src.endsWith('.webm') || src.endsWith('.mp4')) {
      return `<video src="${src}" autoplay loop muted playsinline class="inline-blog-image"></video>`;
    }
    return `<img src="${src}" alt="${alt}" loading="lazy" class="inline-blog-image" />`;
  });
  // Links
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // Bold
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
  return s;
}
