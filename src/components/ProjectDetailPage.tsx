import React, { useMemo } from 'react';
import { Project } from '../types';
import { ArrowLeft, ExternalLink, Globe, Terminal, Code2, Heart, CheckCircle2 } from 'lucide-react';
import { KOFI_URL } from '../data/portfolioData';
import { marked } from 'marked';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack }) => {
  // Parse markdown into clean HTML
  const parsedMarkdown = useMemo(() => {
    try {
      marked.setOptions({
        gfm: true,
        breaks: true,
      });
      return marked.parse(project.readme) as string;
    } catch {
      return project.readme;
    }
  }, [project.readme]);

  return (
    <div className="pt-24 md:pt-28 pb-20 px-6 max-w-4xl mx-auto space-y-10 text-left animate-fadeIn">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors py-2 px-3.5 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </button>
      </div>

      {/* Project Hero Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-10 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="text-cyan-400 font-semibold">{project.category}</span>
              <span>·</span>
              <span className="text-gray-300">{project.language}</span>
              <span>·</span>
              <span className="text-emerald-400">{project.status}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
              {project.title}
            </h1>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg text-xs transition-colors shadow-md shadow-cyan-600/30"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Demo (Render)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#19243b] hover:bg-[#25395e] border border-cyan-500/40 text-cyan-300 hover:text-white font-semibold rounded-lg text-xs transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={KOFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#2d1b28] hover:bg-[#3d2437] border border-pink-500/40 text-pink-300 rounded-lg text-xs font-semibold transition-colors"
              title="Support this project on Ko-fi"
            >
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span>Support</span>
            </a>
          </div>
        </div>

        {/* Tagline & Overview */}
        <div className="space-y-3">
          <p className="text-base text-cyan-300 font-medium">
            {project.tagline}
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="space-y-2 pt-2">
          <div className="text-xs uppercase tracking-wider font-mono text-gray-400">
            Technologies & Architecture
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-gray-800 rounded-md text-xs font-mono text-cyan-300 border border-gray-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Key Highlights Box */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-lg">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          <span>Core Capabilities & Engineering Highlights</span>
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
          {project.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2 bg-gray-800/40 p-3 rounded-xl border border-gray-800/80">
              <span className="text-cyan-400 font-bold shrink-0 mt-0.5">▸</span>
              <span className="text-xs md:text-sm leading-relaxed">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Full Rendered GitHub Markdown Documentation */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-10 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>GitHub README Documentation</span>
          </div>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-cyan-300 font-mono inline-flex items-center gap-1 transition-colors"
          >
            <span>craterworldstudio/{project.name}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Rendered HTML from Markdown */}
        <div
          className="markdown-content text-left"
          dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
        />

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All Projects</span>
          </button>
          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-300 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                Launch Render Web App <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-white inline-flex items-center gap-1"
            >
              GitHub Source <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
