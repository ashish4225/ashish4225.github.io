import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/supabaseClient';
import { navigate } from '@/router';
import type { BlogPost } from '@/types';

export default function BlogPostPage({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!supabase) {
        setError('Blog is not configured yet.');
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle();
        if (error) throw error;
        setPost((data as BlogPost) || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-ink-400" size={32} />
      </div>
    );
  }

  if (error || !post) {
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
            <p className="text-ink-600">
              {error || 'Post not found.'}
            </p>
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

  const readingTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 200)
  );

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
            <span className="flex items-center gap-1">
              <Clock size={14} /> {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-ink-900 mb-4 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Summary */}
          <p className="text-lg text-ink-500 leading-relaxed mb-6">
            {post.summary}
          </p>

          {/* Cover image */}
          {post.cover_image && (
            <div className="img-zoom aspect-[16/9] w-full mb-8">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

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

function renderMarkdown(md: string): string {
  let html = md;
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
  html = html.replace(/\n\n(?!<)/g, '\n\n<p></p>\n\n');
  html = html
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h2>') || trimmed.startsWith('<h3>') || trimmed.startsWith('<ul>')) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .join('\n');
  return html;
}
