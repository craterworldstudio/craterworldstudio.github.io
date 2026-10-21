import React from 'react';
import { PageTab } from '../types';
import { Heart } from 'lucide-react';
import { KOFI_URL } from '../data/portfolioData';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#101726] border-t border-gray-800 text-gray-400">
      <div className="container px-6 py-12 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Brand */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <img src="/images/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="text-base font-bold text-gray-200 tracking-wider">
              Soulfire
            </span>
            <span className="text-xs text-gray-400 font-mono">· Systems & Security Research</span>
          </div>
          <p className="text-xs text-gray-400 max-w-sm">
            Verifiable systems engineering, low-level architecture, defensive security simulations, and computational audio.
          </p>
        </div>

        {/* Center Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
          <button
            onClick={() => onSelectTab('home')}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => onSelectTab('projects')}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => onSelectTab('news')}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            News Feed
          </button>
          <button
            onClick={() => onSelectTab('contact')}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Feedback & Contact
          </button>
        </div>

        {/* Right Links (Ko-fi + YouTube) */}
        <div className="flex items-center gap-3">
          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2d1b28] hover:bg-[#3d2437] border border-pink-500/40 text-pink-300 rounded-lg text-xs font-semibold transition-colors"
            title="Support Soulfire on Ko-fi"
          >
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span>Support on Ko-fi</span>
          </a>

          <a
            href="https://www.youtube.com/channel/UCSCdbFHu9dOMihXP0vByKTw"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-red-950/40 text-red-400 hover:bg-red-900/60 transition-colors border border-red-800/40 flex items-center justify-center"
            title="Official YouTube Channel"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-900/80 py-4 border-t border-gray-800 text-xs text-gray-500">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>
            © 2021–2026 <strong className="text-gray-300">Soulfire</strong> · CraterWorld. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span>Precision · Performance · Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
