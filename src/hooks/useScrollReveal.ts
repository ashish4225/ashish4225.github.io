import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollY = window.scrollY + window.innerHeight * 0.35;

      let current = sectionIds[0] || '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (scrollY >= top) {
          current = id;
        } else {
          break;
        }
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds]);

  return activeSection;
}
