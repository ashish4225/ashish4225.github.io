import { useState } from 'react';
import { ArrowRight, X, Github, ExternalLink } from 'lucide-react';
import { projects, projectCategories } from '@/data';
import type { Project } from '@/types';

export default function Projects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>(
    'All'
  );
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold tracking-widest uppercase text-ink-400 mb-2">
          Work
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-10 tracking-tight">
          Projects
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-ink-900 text-white shadow-md'
                  : 'glass-pill text-ink-600 hover:bg-white/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="glass hover-lift rounded-3xl overflow-hidden text-left group flex flex-col"
    >
      {/* Image */}
      {project.image && (
        <div className="img-zoom aspect-[4/3] w-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-ink-900 leading-tight">
            {project.title}
          </h3>
          <ArrowRight
            size={18}
            className="text-ink-400 transition-all group-hover:translate-x-1 group-hover:text-ink-700 shrink-0 mt-1"
          />
        </div>
        <p className="text-sm text-ink-500 leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className="glass-pill px-2.5 py-0.5 rounded-full text-xs font-medium text-ink-600"
            >
              {t}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs text-ink-400 py-0.5">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="relative rounded-4xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.5)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 glass-pill p-2 rounded-full hover:bg-white/60 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Image */}
        {project.image && (
          <div className="aspect-[16/9] w-full overflow-hidden rounded-t-4xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-400">
            {project.category} • {project.date}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-ink-900 mt-2 mb-4">
            {project.title}
          </h3>

          <p className="text-ink-600 leading-relaxed mb-6">
            {project.longDescription}
          </p>

          {/* Highlights */}
          <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-3">
            Highlights
          </h4>
          <ul className="space-y-2 mb-6">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="text-sm text-ink-600 leading-relaxed pl-5 relative"
              >
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-ink-400" />
                {h}
              </li>
            ))}
          </ul>

          {/* Tech */}
          <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-3">
            Tech Used
          </h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="glass-pill px-3 py-1.5 rounded-full text-sm font-medium text-ink-700"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-strong hover-lift rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-semibold text-ink-800"
              >
                <Github size={16} /> GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-strong hover-lift rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-semibold text-ink-800"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
