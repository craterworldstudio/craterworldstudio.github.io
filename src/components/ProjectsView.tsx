import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS_DATA, KOFI_URL } from '../data/portfolioData';
import { ProjectDetailPage } from './ProjectDetailPage';
import { ExternalLink, Globe, ArrowRight, Shield, Heart } from 'lucide-react';

interface ProjectsViewProps {
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  selectedProjectId,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // If a dedicated project is selected, render dedicated project page
  if (selectedProjectId) {
    const activeProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId);
    if (activeProject) {
      return (
        <ProjectDetailPage
          project={activeProject}
          onBack={() => onSelectProject(null)}
        />
      );
    }
  }

  const categories = ['All', 'Cybersecurity', 'Game Dev / Graphics', 'Operating Systems'];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="pt-24 md:pt-28 pb-16 px-6 max-w-5xl mx-auto space-y-10 text-left animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Portfolio & Projects
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Software & Security Projects
          </h1>
          <p className="text-sm text-gray-300 max-w-xl">
            Open-source repositories, interactive SOC simulations, bare-metal experiments, and graphics engines developed by Soulfire.
          </p>
        </div>

        <a
          href={KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2d1b28] hover:bg-[#3d2437] border border-pink-500/40 text-pink-300 hover:text-white rounded-lg text-xs font-semibold transition-colors self-start md:self-auto"
        >
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          <span>Support on Ko-fi</span>
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-gray-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-gray-950 shadow-sm'
                : 'text-gray-400 hover:text-white bg-gray-900 border border-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-900/90 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-lg group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-400 font-semibold">{project.category}</span>
                <span className="text-gray-400 font-mono text-[11px] bg-gray-800 px-2 py-0.5 rounded">
                  {project.language}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h2>

              <p className="text-xs text-gray-300 leading-relaxed">
                {project.tagline}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-gray-800 rounded text-[11px] text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-800/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
                    title="Open live Render web app"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Demo</span>
                  </a>
                )}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white inline-flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <button
                onClick={() => onSelectProject(project.id)}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read Full Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
