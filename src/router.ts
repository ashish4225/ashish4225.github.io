import { useEffect, useState } from 'react';

const CONTEXT_KEY = 'portfolio_route';

export type Route =
  | { name: 'home' }
  | { name: 'blog' }
  | { name: 'post'; slug: string };

function getRouteFromHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash.startsWith('blog/')) {
    const slug = hash.slice('blog/'.length);
    return { name: 'post', slug };
  }
  if (hash === 'blog') return { name: 'blog' };
  return { name: 'home' };
}

export function navigate(route: Route) {
  if (route.name === 'home') {
    window.location.hash = '';
  } else if (route.name === 'blog') {
    window.location.hash = '#/blog';
  } else if (route.name === 'post') {
    window.location.hash = `#/blog/${route.slug}`;
  }
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
}

export function navigateToSection(sectionId: string) {
  if (window.location.hash) {
    window.location.hash = '';
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  } else {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => {
    const stored = sessionStorage.getItem(CONTEXT_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Route;
      } catch {
        // fall through
      }
    }
    return getRouteFromHash();
  });

  useEffect(() => {
    const handler = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(CONTEXT_KEY, JSON.stringify(route));
  }, [route]);

  return route;
}
