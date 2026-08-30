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
          <div className="flex flex-col gap-6 stagger">
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
      className="glass hover-lift rounded-3xl overflow-hidden text-left group flex flex-col md:flex-row w-full items-stretch"
    >
      {post.cover_image && (
        <div className="img-zoom flex aspect-[16/9] md:aspect-auto md:w-1/3 lg:w-[360px] shrink-0">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6 md:p-8 flex flex-col flex-1 justify-center">
        <div className="flex items-center gap-3 text-sm text-ink-400 mb-3">
          <span>{date}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-ink-900 mb-3 leading-tight group-hover:text-ink-700 transition-colors">
          {post.title}
        </h3>
        <p className="text-base text-ink-500 leading-relaxed line-clamp-3 mb-6">
          {post.summary}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="glass-pill px-3 py-1 rounded-full text-xs font-medium text-ink-600"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold text-ink-700 flex items-center gap-1 group-hover:gap-2 transition-all">
            Read <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </button>
  );
}
