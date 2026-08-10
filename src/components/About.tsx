import { aboutBio, skillGroups } from '@/data';

export default function About() {
  return (
    <section id="about" className="px-6 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <div className="glass rounded-4xl p-8 md:p-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-ink-400 mb-2">
            About
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-8 tracking-tight">
            About Me
          </h2>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Bio */}
            <div className="md:col-span-3 space-y-4">
              {aboutBio.map((para, i) => (
                <p
                  key={i}
                  className="text-ink-600 leading-relaxed text-[15px] md:text-base"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Skills */}
            <div className="md:col-span-2 md:border-l md:border-white/30 md:pl-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
                Skills
              </h3>
              <div className="space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-xs font-medium text-ink-400 mb-2">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="glass-pill px-3 py-1 rounded-full text-xs font-medium text-ink-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
