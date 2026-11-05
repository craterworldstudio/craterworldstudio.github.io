import React from 'react';
import { NEWS_DATA } from '../data/portfolioData';
import { Calendar, Clock, Newspaper, Sparkles } from 'lucide-react';

const LinkifiedText: React.FC<{ text: string }> = ({ text }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 hover:underline break-all transition-colors duration-200"
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
};

export const NewsView: React.FC = () => {
  return (
    <div className="pt-24 md:pt-28 pb-16 px-6 max-w-3xl mx-auto space-y-10 text-left animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          Updates & Announcements
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          News Feed
        </h1>
        <p className="text-sm text-gray-300">
          Official announcements, site updates, and project status notes from Soulfire.
        </p>
      </div>

      {/* Template News Post */}
      <div className="space-y-6">
        {NEWS_DATA.map((article) => (
          <article
            key={article.id}
            className="bg-gray-900/90 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-4 hover:border-cyan-500/30 transition-colors shadow-lg"
          >
            {/* Zero-Pill Clean Unboxed Metadata with separators */}
            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
              <span className="text-cyan-400 font-semibold">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                {article.date}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                {article.readTime}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white">
              {article.title}
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              <LinkifiedText text={article.content} />
            </p>

            <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5 text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>News4You</span>
              </span>
              <span>Soulfryae · CraterWorldStudio</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
