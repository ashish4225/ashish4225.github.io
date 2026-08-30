import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { profile } from '@/data';
import { navigate, navigateToSection } from '@/router';

export default function Footer() {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog', isBlog: true },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="px-6 py-12 mt-8">
      <div className="max-w-5xl mx-auto">
        <div className="glass rounded-4xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: name + tagline */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-ink-900">
                {profile.name}
              </h3>
              <p className="text-sm text-ink-500 mt-1">{profile.tagline}</p>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    item.isBlog
                      ? navigate({ name: 'blog' })
                      : navigateToSection(item.id)
                  }
                  className="text-sm text-ink-500 hover:text-ink-900 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill p-2.5 rounded-full hover:bg-white/50 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill p-2.5 rounded-full hover:bg-white/50 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="glass-pill p-2.5 rounded-full hover:bg-white/50 transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-white/30 text-center">
            <p className="text-xs text-ink-400">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
