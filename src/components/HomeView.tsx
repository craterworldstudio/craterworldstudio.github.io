import React from 'react';
import { PageTab } from '../types';
import { SOULFIRE_BIO, PROJECTS_DATA, KOFI_URL } from '../data/portfolioData';
import { Shield, Code, Terminal, ArrowRight, Mail, Globe, Heart, ExternalLink } from 'lucide-react';

interface HomeViewProps {
  onSelectTab: (tab: PageTab) => void;
  onSelectProject: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTab, onSelectProject }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* 
        ========================================================================
        RESTORED ORIGINAL HERO BANNER WITH MATCHED BACKGROUND & SEAMLESS BLEND
        ========================================================================
      */}
      <section className="text-gray-400 bg-[#111828] body-font pt-20 relative">
        <div className="container mx-auto flex px-5 pt-12 pb-16 items-center justify-center flex-col">
          {/* 
            Container background matches the exact color of the image's background (srgb(17,24,40) / #111828).
            We avoid harsh outer box-shadows or borders that create a sharp bounding seam.
          */}
          <div className="lg:w-2/6 md:w-3/6 w-5/6 mb-8 flex items-center justify-center bg-[#111828]">
            <img
              className="w-full h-auto object-cover object-center bg-[#111828]"
              alt="Welcome to Crater World Studios"
              src="/images/Welcome page.png"
            />
          </div>

          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-extrabold text-white tracking-wider">
              CRATER WORLD STUDIOS
            </h1>
            <p className="leading-relaxed mb-8 text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
              Independent Systems Programming, Defensive Security Research, and Core Computational Tooling. <br />
              <span className="text-cyan-400 font-medium">Precision · Performance · Verifiable Architecture</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onSelectTab('projects')}
                className="inline-flex items-center gap-2 text-white bg-cyan-600 border-0 py-2.5 px-6 focus:outline-none hover:bg-cyan-500 rounded text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectTab('contact')}
                className="inline-flex items-center gap-2 text-cyan-300 bg-[#19243b] border border-cyan-500/40 py-2.5 px-6 focus:outline-none hover:bg-[#25395e] hover:text-white rounded text-sm font-semibold transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact & Feedback</span>
              </button>
            </div>
          </div>
        </div>

        {/* 
          ========================================================================
          SMOOTH GRADIENT EDGE TRANSITION
          Seamlessly blends #111828 downward into #141d30 and #18233a
          ========================================================================
        */}
        <div className="w-full h-24 bg-gradient-to-b from-[#111828] via-[#141d30] to-[#18233a] pointer-events-none" />
      </section>

      {/* 
        ========================================================================
        SOLO DEVELOPER & ASPIRING CYBERSECURITY STUDENT PROFILE
        ========================================================================
      */}
      <section className="px-6 max-w-5xl mx-auto -mt-6">
        <div className="bg-gray-900/95 border border-gray-800 rounded-2xl p-8 md:p-10 shadow-xl space-y-8 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800">
            <div>
              <div className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-1">
                Principal Engineer & Researcher
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                {SOULFIRE_BIO.name}
              </h2>
              <p className="text-sm text-cyan-300 mt-0.5 font-medium">
                {SOULFIRE_BIO.title}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={KOFI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#2d1b28] hover:bg-[#3d2437] border border-pink-500/40 text-pink-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                <span>Support on Ko-fi</span>
              </a>

              <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-800/60">
                Independent Systems Lab
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-white">About My Work</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {SOULFIRE_BIO.summary}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                All software architectures are independently designed, implemented, and verified from first principles. Primary engineering initiatives encompass <strong>AxiomOS</strong> (a capability-based microkernel in Rust and Assembly), <strong>Cyber Hazard Lab</strong> (a software-defined network simulation and SOC platform), <strong>myVoice</strong> (real-time low-latency DSP and AI voice conversion), <strong>Greko Engine</strong> (high-performance 3D VRM graphics), <strong>Helios</strong> (distributed game server compiler), and <strong>Who Was Here?</strong> (incident response investigation).
              </p>
            </div>

            <div className="lg:col-span-5 bg-gray-950/80 border border-gray-800 rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
                Technical Focus Areas
              </h4>
              <div className="space-y-3">
                {SOULFIRE_BIO.skills.map((skillGroup, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                      {idx === 0 ? <Shield className="w-3.5 h-3.5" /> : idx === 1 ? <Code className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
                      <span>{skillGroup.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-gray-800 rounded text-[11px] text-gray-300 border border-gray-700/60"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        FEATURED PROJECTS TEASER (CyberHazardLab & WhoWasHere)
        ========================================================================
      */}
      <section className="px-6 max-w-5xl mx-auto space-y-6 text-left">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">Featured Projects</h3>
            <p className="text-xs md:text-sm text-gray-400">
              Capability-secure microkernels, interactive SOC simulation environments, low-latency DSP audio engines, and modern graphics.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('projects')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS_DATA.slice(0, 4).map((proj) => (
            <div
              key={proj.id}
              className="p-6 bg-gray-900/90 border border-gray-800 rounded-2xl hover:border-cyan-500/40 transition-colors flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-mono text-cyan-400 font-semibold">{proj.category}</span>
                  <span className="text-gray-400 font-mono text-[11px]">{proj.language}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1.5">{proj.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">{proj.tagline}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.technologies.slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-gray-800 rounded text-[11px] text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <button
                  onClick={() => onSelectProject(proj.id)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  Dedicated Page & README →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
