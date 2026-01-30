import React, { useEffect, useState } from 'react';
import { Subject } from '../types';
import { ICON_MAP } from '../constants';
import { NeumorphicCard } from './NeumorphicCard';
import { ChevronDown } from 'lucide-react';
import { ResourceList } from './ResourceList';
import { useTheme } from './ThemeContext';

interface SubjectCardProps {
  subject: Subject;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, isOpen, onToggle, index }) => {
  const Icon = ICON_MAP[subject.iconName];
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple staggered animation on mount
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
        className={`mb-6 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* 
        The Card Header (Always Visible) 
      */}
      <NeumorphicCard 
        clickable 
        onClick={onToggle}
        active={isOpen}
        className="relative overflow-hidden z-10 group"
      >
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* Icon Container */}
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center 
              transition-all duration-300
              ${isOpen ? 'text-primary scale-110' : 'text-slate-500 dark:text-slate-400 group-hover:text-primary'}
              ${theme === 'dark' 
                ? 'bg-background-dark shadow-[inset_3px_3px_6px_#15191e,inset_-3px_-3px_6px_#2d3540]' 
                : 'bg-background-light shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_#ffffff]'
              }
            `}>
              <Icon size={22} strokeWidth={2.5} />
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold opacity-40 tracking-widest uppercase mb-0.5">{subject.code}</span>
              <h3 className="text-lg font-bold leading-none">{subject.title}</h3>
            </div>
          </div>

          <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-primary' : 'opacity-30 group-hover:opacity-100'}`}>
             <ChevronDown size={20} strokeWidth={3} />
          </div>
        </div>
      </NeumorphicCard>

      {/* 
        The Accordion Body
      */}
      <div 
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
      >
        <div className="overflow-hidden">
          <NeumorphicCard active={true} className="min-h-[50px] !rounded-xl border border-white/5">
            <div className="p-3 sm:p-4 rounded-xl">
               <ResourceList content={subject.content} />
            </div>
          </NeumorphicCard>
        </div>
      </div>
    </div>
  );
};