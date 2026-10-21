import React, { useState } from 'react';
import { PageTab } from '../types';
import { Menu, X, Mail, Heart } from 'lucide-react';
import { KOFI_URL } from '../data/portfolioData';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { tab: PageTab; label: string }[] = [
    { tab: 'home', label: 'Home' },
    { tab: 'projects', label: 'Projects' },
    { tab: 'news', label: 'News' },
    { tab: 'contact', label: 'Feedback & Contact' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111828]/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-white text-left focus:outline-none group cursor-pointer shrink-0"
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-9 h-9 object-contain filter drop-shadow-[0_0_8px_rgba(0,255,255,0.4)] group-hover:scale-105 transition-transform"
          />
          <span className="ml-3 font-bold text-lg tracking-wider text-gray-100 group-hover:text-cyan-300 transition-colors whitespace-nowrap">
            ◥ CRATER ❆WORLD❆ STUDIO ◤
          </span>
        </button>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-cyan-300 font-semibold border-b-2 border-cyan-400 pb-0.5'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Ko-fi support + Contact) */}
        <div className="hidden md:flex items-center space-x-3 shrink-0">
          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2d1b28] hover:bg-[#3d2437] border border-pink-500/40 text-pink-300 hover:text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
            title="Support on Ko-fi"
          >
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span>Support on Ko-fi</span>
          </a>

          <button
            onClick={() => handleNavClick('contact')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#19243b] hover:bg-[#223354] border border-cyan-500/40 text-cyan-300 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>

        {/* Mobile menu controls */}
        <div className="flex md:hidden items-center space-x-2">
          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-pink-300 bg-[#2d1b28] rounded border border-pink-500/40"
            title="Support on Ko-fi"
          >
            <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111828] border-t border-gray-800 px-6 py-4 space-y-3">
          {navLinks.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleNavClick(item.tab)}
              className={`block w-full text-left py-2 text-sm font-medium ${
                currentTab === item.tab
                  ? 'text-cyan-300 font-bold border-l-2 border-cyan-400 pl-3'
                  : 'text-gray-400 hover:text-white pl-3'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-gray-800">
            <a
              href={KOFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-[#2d1b28] text-pink-300 rounded-lg text-xs font-semibold border border-pink-500/40"
            >
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span>Support on Ko-fi</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
