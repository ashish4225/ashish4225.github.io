import { experience, competitions, education } from '@/data';
import { GraduationCap, Briefcase, Trophy } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-semibold tracking-widest uppercase text-ink-400 mb-2">
          Journey
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-12 tracking-tight">
          Experience & Education
        </h2>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-10">
          {/* Vertical line */}
          <div className="absolute left-2 md:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-ink-300 via-ink-200 to-transparent" />

          {/* Experience items */}
          {experience.map((exp) => (
            <TimelineItem
              key={exp.id}
              icon={<Briefcase size={16} />}
              title={exp.role}
              subtitle={exp.company}
              date={`${exp.startDate} – ${exp.endDate}`}
              description={exp.description}
              bullets={exp.bullets}
              technologies={exp.technologies}
            />
          ))}

          {/* Education */}
          {education.map((edu) => (
            <TimelineItem
              key={edu.id}
              icon={<GraduationCap size={16} />}
              title={edu.degree}
              subtitle={`${edu.institution}, ${edu.location}`}
              date={`${edu.startDate} – ${edu.endDate}`}
            />
          ))}

          {/* Competitions */}
          <div className="relative mb-6 mt-10">
            <h3 className="flex items-center gap-2 text-lg font-bold text-ink-800 mb-4">
              <Trophy size={18} className="text-ink-500" />
              Competitions & Hackathons
            </h3>
          </div>

          {competitions.map((comp) => (
            <TimelineItem
              key={comp.id}
              icon={<Trophy size={16} />}
              title={comp.title}
              subtitle={comp.event}
              date={comp.date}
              bullets={comp.bullets}
              technologies={comp.technologies}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  bullets?: string[];
  technologies?: string[];
}

function TimelineItem({
  icon,
  title,
  subtitle,
  date,
  description,
  bullets,
  technologies,
}: TimelineItemProps) {
  return (
    <div className="relative mb-8 last:mb-0">
      {/* Dot */}
      <div className="absolute -left-8 md:-left-10 top-1.5 w-6 h-6 md:w-7 md:h-7 rounded-full glass-strong flex items-center justify-center shadow-sm">
        <span className="text-ink-700">{icon}</span>
      </div>

      {/* Card */}
      <div className="glass hover-lift rounded-3xl p-6 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="text-lg md:text-xl font-bold text-ink-900">{title}</h3>
          <span className="text-xs md:text-sm font-medium text-ink-400 bg-white/30 px-3 py-1 rounded-full">
            {date}
          </span>
        </div>
        <p className="text-sm font-semibold text-ink-500 mb-3">{subtitle}</p>

        {description && (
          <p className="text-sm text-ink-600 mb-3 leading-relaxed">
            {description}
          </p>
        )}

        {bullets && (
          <ul className="space-y-1.5 mb-4">
            {bullets.map((b, i) => (
              <li
                key={i}
                className="text-sm text-ink-500 leading-relaxed pl-4 relative"
              >
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-ink-300" />
                {b}
              </li>
            ))}
          </ul>
        )}

        {technologies && (
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((t) => (
              <span
                key={t}
                className="glass-pill px-2.5 py-1 rounded-full text-xs font-medium text-ink-600"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
