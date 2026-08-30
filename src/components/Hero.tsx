import { Mail, Github, Linkedin } from 'lucide-react';
import { profile } from '@/data';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
      <div className="max-w-6xl mx-auto stagger flex flex-col md:flex-row-reverse items-center gap-8 md:gap-20">
        
        {/* Right Side: Headshot (Rendered first for mobile stacking) */}
        <div className="flex-shrink-0">
          <div className="img-zoom inline-block w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl md:rounded-[2rem] border-2 border-white/50 shadow-xl overflow-hidden">
            <img
              src={profile.headshot}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Left Side: Text */}
        <div className="flex-1 text-center md:text-left">
          {/* Name */}
          <p className="text-sm md:text-base font-medium tracking-widest uppercase text-ink-500 mb-3">
            Hello, I'm
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tight text-ink-900 mb-4 leading-none">
            {profile.firstName}
          </h1>
          {profile.tagline && (
            <p className="text-lg md:text-xl font-semibold text-ink-600 mb-6 tracking-wide">
              {profile.tagline}
            </p>
          )}

          {/* Intro */}
          <p className="text-base md:text-lg text-ink-500 max-w-2xl mx-auto md:mx-0 mb-8 leading-relaxed">
            {profile.intro}
          </p>

          {/* Social */}
          <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
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

      </div>
    </section>
  );
}
