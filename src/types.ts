export type PageTab = 'home' | 'projects' | 'news' | 'contact';

export interface Project {
  id: string;
  name: string;
  title: string;
  category: 'Cybersecurity' | 'Game Dev / Graphics' | 'Operating Systems' | 'Tools';
  tagline: string;
  description: string;
  status: 'Active' | 'Completed' | 'In Progress' | 'Stable';
  language: string;
  technologies: string[];
  features: string[];
  repoUrl: string;
  demoUrl?: string;
  readme: string;
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Announcement' | 'Security' | 'Devlog';
  snippet: string;
  content: string;
  readTime: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: 'General' | 'Security Discussion' | 'Project Collaboration' | 'Feedback';
  message: string;
  createdAt: string;
}
