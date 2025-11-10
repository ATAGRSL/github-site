import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Search } from 'lucide-react';
import type { Project } from '../utils/projects';
import TiltCard from './TiltCard';

const languageColors: Record<string, string> = {
  typescript: 'text-blue-400 border-blue-400/30',
  python: 'text-yellow-400 border-yellow-400/30',
  java: 'text-red-400 border-red-400/30',
  javascript: 'text-yellow-300 border-yellow-300/30',
  'jupyter-notebook': 'text-orange-400 border-orange-400/30',
  go: 'text-cyan-400 border-cyan-400/30',
  other: 'text-dark-300 border-dark-600/60',
};

type ProjectCardProps = {
  project: ProjectWithLabel;
  delay?: number;
};

const ProjectCard = ({ project, delay = 0 }: ProjectCardProps) => (
  <TiltCard className="h-full">
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card-hover p-6 group block h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-mono px-3 py-1 rounded-full border ${
            languageColors[project.language] || languageColors.other
          }`}
        >
          {project.language}
        </span>
        {project.stars > 0 && (
          <span className="text-xs text-dark-400 flex items-center gap-1">
            ⭐ {project.stars}
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-dark-50 mb-2 group-hover:text-primary-400 transition-colors flex items-center gap-2">
        {project.title}
        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </h3>

      <p className="text-dark-400 text-sm mb-4 line-clamp-3">{project.description}</p>

      <p className="text-xs text-dark-500">Güncellendi {project.updatedLabel}</p>
    </motion.a>
  </TiltCard>
);

type ProjectWithLabel = Project & { updatedLabel: string };

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const MAX_SHOWCASE = 9;

  const enhancedProjects = useMemo<ProjectWithLabel[]>(
    () =>
      projects.map((project) => ({
        ...project,
        updatedLabel: new Intl.DateTimeFormat('tr-TR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          timeZone: 'UTC',
        }).format(new Date(project.updated)),
      })),
    [projects]
  );

  const languages = useMemo(() => {
    const unique = Array.from(new Set(enhancedProjects.map((project) => project.language))).filter(
      Boolean
    );
    return ['all', ...unique];
  }, [enhancedProjects]);

  useEffect(() => {
    setShowAllProjects(false);
  }, [searchQuery, selectedLanguage]);

  const filteredProjects = enhancedProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || project.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  const displayProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, MAX_SHOWCASE);
  const canToggleProjects = filteredProjects.length > MAX_SHOWCASE;

  return (
    <section id="projects" className="py-20 lg:py-32 bg-dark-900/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary-400 font-semibold mb-4 uppercase tracking-wider">
            Projeler
          </p>
          <h2 className="section-title mb-4">
            GitHub üzerindeki tüm açık projeler
          </h2>
          <p className="section-subtitle">Veri bilimi, AI, backend ve frontend örnekleri dahil.</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 z-10 pointer-events-none" />
            <input
              id="project-search"
              name="project-search"
              type="text"
              placeholder="Projelerde ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-card rounded-full text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>

          <select
            id="project-language-filter"
            name="project-language-filter"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-6 py-3 glass-card rounded-full text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer"
          >
            <option value="all">Tüm diller</option>
            {languages.filter(l => l !== 'all').map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

        </motion.div>

        {/* Projects Slider (Mobile) */}
        <div className="md:hidden -mx-4 sm:mx-0">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar px-4">
            {filteredProjects.map((project) => (
              <div key={`${project.title}-mobile`} className="snap-center flex-shrink-0 w-full">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Projects Grid (Desktop) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${project.updated}`}
              project={project}
              delay={index * 0.05}
            />
          ))}
        </div>

        {canToggleProjects && (
          <div className="text-center mt-10 hidden md:block">
            <button
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="btn-secondary inline-flex items-center gap-2"
            >
              {showAllProjects ? 'Daha Az Göster' : 'Daha Fazlasını Göster'}
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-dark-400"
          >
            Hiç proje bulunamadı. Arama kriterlerinizi değiştirmeyi deneyin.
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
