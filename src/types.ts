export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  date: string;
  description: string;
  longDescription: string;
  image?: string;
  technologies: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export type ProjectCategory = 'Embedded' | 'Robotics' | 'Product Design' | 'Software';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  bullets: string[];
  technologies: string[];
}

export interface CompetitionItem {
  id: string;
  title: string;
  event: string;
  date: string;
  bullets: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
