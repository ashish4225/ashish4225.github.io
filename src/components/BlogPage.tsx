import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/supabaseClient';
import { navigate } from '@/router';
import type { BlogPost } from '@/types';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false });
        if (error) throw error;
        setPosts((data || []) as BlogPost[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="page-fade min-h-screen px-6 pt-28 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate({ name: 'home' })}
          className="glass-pill rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-ink-700 hover:bg-white/50 transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <p className="text-sm font-semibold tracking-widest uppercase text-ink-400 mb-2">
          Writing
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-ink-900 mb-10 tracking-tight">
          Blog
        </h1>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-ink-400" size={32} />
          </div>
        )}

        {error && (
          <div className="glass rounded-3xl p-6 text-center text-ink-600">
            {error}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="glass rounded-3xl p-8 text-center">
            <p className="text-ink-500">No posts yet. Check back soon!</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-6 stagger">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  const readingTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 200)
  );

  return (
    <button
      onClick={() => navigate({ name: 'post', slug: post.slug })}
      className="glass hover-lift rounded-3xl overflow-hidden text-left group flex flex-col"
    >
      {post.cover_image && (
        <div className="img-zoom aspect-[16/9] w-full">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-ink-400 mb-3">
          <span>{date}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {readingTime} min
          </span>
        </div>
        <h3 className="text-lg font-bold text-ink-900 mb-2 leading-tight group-hover:text-ink-700 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-ink-500 leading-relaxed line-clamp-3 mb-4">
          {post.summary}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="glass-pill px-2.5 py-0.5 rounded-full text-xs font-medium text-ink-600"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold text-ink-700 flex items-center gap-1 group-hover:gap-2 transition-all">
            Read <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </button>
  );
}
