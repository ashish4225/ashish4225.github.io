import { ArrowRight } from 'lucide-react';
import { navigate } from '@/router';
import { getPublishedPosts } from '@/blog';
import type { BlogPost } from '@/types';

export default function BlogSection() {
  const posts = getPublishedPosts();

  return (
    <section id="blog" className="px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold tracking-widest uppercase text-ink-400 mb-2">
          Writing
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-10 tracking-tight">
          Blog
        </h2>

        {posts.length === 0 && (
          <div className="glass rounded-3xl p-8 text-center">
            <p className="text-ink-500">No posts yet. Check back soon!</p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-6 stagger">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
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
