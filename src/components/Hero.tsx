import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react';
import { profile } from '@/data';
import { navigateToSection, navigate } from '@/router';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
      <div className="max-w-4xl mx-auto text-center stagger">
        {/* Headshot */}
        <div className="img-zoom inline-block mb-8 w-48 h-48 md:w-60 md:h-60 rounded-3xl border-2 border-white/50 shadow-lg">
          <img
            src={profile.headshot}
            alt={profile.name}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        {/* Name */}
        <p className="text-sm md:text-base font-medium tracking-widest uppercase text-ink-500 mb-3">
          Hello, I'm
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-ink-900 mb-4 leading-none">
          {profile.firstName}
        </h1>
        <p className="text-lg md:text-xl font-semibold text-ink-600 mb-6 tracking-wide">
          {profile.tagline}
        </p>

        {/* Intro */}
        <p className="text-base md:text-lg text-ink-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {profile.intro}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateToSection('projects')}
            className="glass-strong hover-lift rounded-full px-7 py-3 flex items-center gap-2 font-semibold text-ink-900 group"
          >
            View Projects
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          <button
            onClick={() => navigateToSection('contact')}
            className="glass hover-lift rounded-full px-7 py-3 flex items-center gap-2 font-semibold text-ink-700"
          >
            Get in Touch
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Social */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill p-3 rounded-full hover:bg-white/50 transition-all hover:scale-110"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill p-3 rounded-full hover:bg-white/50 transition-all hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="glass-pill p-3 rounded-full hover:bg-white/50 transition-all hover:scale-110"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
