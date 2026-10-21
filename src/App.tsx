import React, { useState, useEffect } from 'react';
import { PageTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProjectsView } from './components/ProjectsView';
import { NewsView } from './components/NewsView';
import { ContactView } from './components/ContactView';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('project-')) {
        const pId = hash.replace('project-', '');
        setSelectedProjectId(pId);
        setCurrentTab('projects');
      } else if (['home', 'projects', 'news', 'contact'].includes(hash)) {
        setCurrentTab(hash as PageTab);
        setSelectedProjectId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: PageTab) => {
    setCurrentTab(tab);
    setSelectedProjectId(null);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (id: string | null) => {
    setSelectedProjectId(id);
    if (id) {
      setCurrentTab('projects');
      window.location.hash = `project-${id}`;
    } else {
      window.location.hash = 'projects';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#111828] via-[#141c2c] to-[#0f1522] text-gray-100 selection:bg-cyan-500 selection:text-black">
      <Navbar currentTab={currentTab} onSelectTab={handleSelectTab} />

      <main className="flex-grow">
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={handleSelectTab}
            onSelectProject={handleSelectProject}
          />
        )}
        {currentTab === 'projects' && (
          <ProjectsView
            selectedProjectId={selectedProjectId}
            onSelectProject={handleSelectProject}
          />
        )}
        {currentTab === 'news' && <NewsView />}
        {currentTab === 'contact' && <ContactView />}
      </main>

      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
};

export default App;
