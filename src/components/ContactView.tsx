import React, { useState, useEffect } from 'react';
import { ContactMessage } from '../types';
import { Mail, Send, CheckCircle, Terminal, Heart, ExternalLink } from 'lucide-react';
import { KOFI_URL } from '../data/portfolioData';

export const ContactView: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General' as ContactMessage['category'],
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('soulfire_messages') || '[]');
      setMessages(saved);
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const newMessage: ContactMessage = {
      id: 'MSG-' + Math.floor(1000 + Math.random() * 9000),
      name: form.name,
      email: form.email,
      subject: form.subject || 'Direct Inquiry',
      category: form.category,
      message: form.message,
      createdAt: new Date().toLocaleDateString(),
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    try {
      localStorage.setItem('soulfire_messages', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      subject: '',
      category: 'General',
      message: '',
    });
  };

  return (
    <div className="pt-24 md:pt-28 pb-16 px-6 max-w-4xl mx-auto space-y-10 text-left animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          Get In Touch
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          Feedback & Contact
        </h1>
        <p className="text-sm text-gray-300">
          Have feedback on a project, want to discuss cybersecurity research, or connect with Soulfire directly? Drop a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Send a Message to Soulfire</span>
          </h2>

          {submitted && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Message received! Thank you for reaching out.</span>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="underline text-emerald-300 hover:text-emerald-100 cursor-pointer"
              >
                New
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex"
                  className="w-full px-3.5 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Topic / Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value as ContactMessage['category'] })
                  }
                  className="w-full px-3.5 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="General">General Inquiry</option>
                  <option value="Security Discussion">Cybersecurity Discussion</option>
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="Feedback">Site / Tool Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Brief summary..."
                  className="w-full px-3.5 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Share your thoughts, questions, or project feedback..."
                className="w-full px-3.5 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Sidebar: Ko-fi Support & Direct Channel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Ko-fi Donation Card */}
          <div className="bg-gradient-to-br from-[#2a1725] to-[#1e131d] border border-pink-500/40 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-pink-400">
              <Heart className="w-5 h-5 fill-pink-400" />
              <h3 className="text-base font-bold text-white">Support on Ko-fi</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Enjoying Cyber Hazard Lab, Who Was Here?, or my other open-source projects? You can support my ongoing studies and server hosting costs on Ko-fi.
            </p>
            <a
              href={KOFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-pink-600/30"
            >
              <span>Donate / Buy a Coffee</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Terminal className="w-4 h-4" />
              <h3 className="text-sm font-bold text-white">Direct Channel</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              I check messages regularly and appreciate technical exchanges, security bug reports, or discussions about networking systems.
            </p>
            <div className="pt-2 text-xs text-gray-400 font-mono">
              Status: Open to collaboration & security discussions
            </div>
          </div>

          {messages.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Your Submitted Messages ({messages.length})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className="p-2.5 bg-gray-800 rounded-lg border border-gray-700/60 text-xs"
                  >
                    <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1">
                      <span className="font-mono text-cyan-400">{m.category}</span>
                      <span>{m.createdAt}</span>
                    </div>
                    <p className="text-gray-200 line-clamp-2">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
