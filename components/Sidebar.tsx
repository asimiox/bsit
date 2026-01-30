import React from 'react';
import { X, Info, Phone, Wrench, ExternalLink, MessageCircle } from 'lucide-react';
import { NeumorphicCard } from './NeumorphicCard';
import { useTheme } from './ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// RESTORED: Original names for the "testing phase" ;)
const otherTools = [
  { title: 'Login System', url: 'http://bs-it.wuaze.com/login/' },
  { title: 'Her Birthday', url: 'http://bs-it.wuaze.com/her-birthday/' },
  { title: 'Morph UI', url: 'https://bs-it.wuaze.com/morph/' },
  { title: 'Digital Clock', url: 'https://bs-it.wuaze.com/clock.html' },
  { title: 'For You', url: 'https://bs-it.wuaze.com/foryou.html' },
  { title: 'Hello World', url: 'https://bs-it.wuaze.com/hi.html' },
  { title: 'Lamp Login', url: 'https://bs-it.wuaze.com/lamplogin.html' },
  { title: 'CSS Spin', url: 'https://bs-it.wuaze.com/spin.html' },
  { title: 'Spiral Effect', url: 'https://bs-it.wuaze.com/spiral.html' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className={`
            h-full w-full p-6 flex flex-col gap-6 overflow-y-auto shadow-2xl border-r border-white/20
            ${theme === 'dark' 
                ? 'bg-background-dark text-slate-200' 
                : 'bg-background-light text-slate-700'
            }
        `}>
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-primary tracking-tight">Menu</h2>
                <NeumorphicCard clickable onClick={onClose} className="w-10 h-10 flex items-center justify-center !rounded-full">
                    <X size={20} />
                </NeumorphicCard>
            </div>

            {/* About Section - Inset Style for content area */}
            <section>
                <div className="flex items-center gap-2 mb-3 opacity-70">
                    <Info size={16} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest">About</span>
                </div>
                <NeumorphicCard active={true} className="p-4 !rounded-xl">
                    <p className="text-sm leading-relaxed opacity-80">
                        This website is designed as a centralized resource hub for BS IT First Semester students. It aggregates notes, past papers, books, and lecture slides from various sources.
                    </p>
                </NeumorphicCard>
            </section>

            {/* Contact Section - Raised Card Style */}
            <section>
                <div className="flex items-center gap-2 mb-3 opacity-70">
                    <Phone size={16} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest">Contact Me</span>
                </div>
                <a 
                    href="https://wa.me/923228033682" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group"
                >
                    <NeumorphicCard clickable className="p-4 !rounded-xl flex items-center gap-3 border border-transparent group-hover:border-primary/20 transition-all">
                        <div className="p-2 bg-green-500/10 rounded-full text-green-500 shadow-inner">
                            <MessageCircle size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm">Asim Nawaz</p>
                            <p className="text-xs opacity-60">+92 322 8033682</p>
                        </div>
                        <ExternalLink size={14} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                    </NeumorphicCard>
                </a>
            </section>

            {/* Mini Projects Section */}
            <section className="flex-1">
                <div className="flex items-center gap-2 mb-3 opacity-70">
                    <Wrench size={16} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest">Other Mini Projects</span>
                </div>
                <NeumorphicCard active={true} className="p-2 !rounded-xl flex flex-col gap-1">
                    {otherTools.map((tool, idx) => (
                        <a 
                            key={idx}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                        >
                            <span className="text-sm font-medium opacity-80 group-hover:opacity-100">{tool.title}</span>
                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                        </a>
                    ))}
                </NeumorphicCard>
            </section>

            <div className="text-center opacity-30 text-xs mt-4 pb-4">
                © {new Date().getFullYear()} Asim Nawaz
            </div>

        </div>
      </div>
    </>
  );
};