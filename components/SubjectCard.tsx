import React from 'react';
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
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, isOpen, onToggle }) => {
  const Icon = ICON_MAP[subject.iconName];
  const { theme } = useTheme();

  return (
    <div className="mb-6">
      {/* 
        The Card Header (Always Visible) 
        We use the NeumorphicCard wrapper here.
        If isOpen is true, we visually 'press' the card using the active prop.
      */}
      <NeumorphicCard 
        clickable 
        onClick={onToggle}
        active={isOpen}
        className="relative overflow-hidden z-10"
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* Icon Container with its own mini-neumorphism */}
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center 
              transition-colors duration-300
              ${isOpen ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}
              ${theme === 'dark' 
                ? 'bg-background-dark shadow-[inset_3px_3px_6px_#15191e,inset_-3px_-3px_6px_#2d3540]' 
                : 'bg-background-light shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_#ffffff]'
              }
            `}>
              <Icon size={24} strokeWidth={2.5} />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold opacity-50 tracking-widest">{subject.code}</span>
              <h3 className="text-lg font-bold">{subject.title}</h3>
            </div>
          </div>

          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'opacity-40'}`}>
             <ChevronDown size={24} />
          </div>
        </div>
      </NeumorphicCard>

      {/* 
        The Accordion Body (Conditional Rendering)
        Using a grid transition trick for smooth height animation without hardcoded heights
      */}
      <div 
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
      >
        <div className="overflow-hidden">
          {/* 
             Inner Content Container 
             Set active={true} to force the inset shadow (skeuomorphic cavity effect)
          */}
          <NeumorphicCard active={true} className="min-h-[50px] !rounded-xl">
            <div className="p-4 rounded-xl">
               <ResourceList content={subject.content} />
            </div>
          </NeumorphicCard>
        </div>
      </div>
    </div>
  );
};