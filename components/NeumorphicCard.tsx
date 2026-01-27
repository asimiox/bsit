import React from 'react';
import { useTheme } from './ThemeContext';

interface NeumorphicCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean; // If true, shows inset shadow (pressed state)
  clickable?: boolean;
}

export const NeumorphicCard: React.FC<NeumorphicCardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  active = false,
  clickable = false
}) => {
  const { theme } = useTheme();

  // Define shadow styles based on theme and active state
  // We use inline styles for the complex shadows to keep Tailwind clean, 
  // or we could use arbitrary values. Arbitrary values are used here.

  const darkShadow = 'shadow-[6px_6px_12px_#15191e,-6px_-6px_12px_#2d3540]';
  const darkInset = 'shadow-[inset_6px_6px_12px_#15191e,inset_-6px_-6px_12px_#2d3540]';
  
  const lightShadow = 'shadow-[8px_8px_16px_#bec3c9,-8px_-8px_16px_#ffffff]';
  const lightInset = 'shadow-[inset_6px_6px_12px_#bec3c9,inset_-6px_-6px_12px_#ffffff]';

  const baseClasses = `rounded-2xl transition-all duration-300 ease-in-out ${clickable ? 'cursor-pointer' : ''}`;
  const themeClasses = theme === 'dark' 
    ? 'bg-background-dark text-slate-200' 
    : 'bg-background-light text-slate-700';
    
  let shadowClass = '';
  
  if (theme === 'dark') {
    shadowClass = active ? darkInset : `${darkShadow} hover:shadow-[8px_8px_16px_#15191e,-8px_-8px_16px_#2d3540] hover:-translate-y-[2px]`;
    if (active) shadowClass = `${darkInset} translate-y-[1px]`;
  } else {
    shadowClass = active ? lightInset : `${lightShadow} hover:shadow-[10px_10px_20px_#bec3c9,-10px_-10px_20px_#ffffff] hover:-translate-y-[2px]`;
    if (active) shadowClass = `${lightInset} translate-y-[1px]`;
  }
  
  // If not clickable, remove hover/transform effects from non-active state
  if (!clickable) {
     if (theme === 'dark') shadowClass = active ? darkInset : darkShadow;
     else shadowClass = active ? lightInset : lightShadow;
  }

  return (
    <div 
      onClick={clickable ? onClick : undefined}
      className={`${baseClasses} ${themeClasses} ${shadowClass} ${className}`}
    >
      {children}
    </div>
  );
};