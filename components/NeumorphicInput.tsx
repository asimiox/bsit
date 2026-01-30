import React from 'react';
import { useTheme } from './ThemeContext';

interface NeumorphicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const NeumorphicInput: React.FC<NeumorphicInputProps> = ({ icon, className = '', ...props }) => {
  const { theme } = useTheme();

  return (
    <div className={`relative flex items-center group ${className}`}>
      {icon && (
        <div className="absolute left-4 opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all duration-300 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`
          w-full py-3.5 pr-4 rounded-xl outline-none transition-all duration-300 font-medium
          ${icon ? 'pl-12' : 'pl-4'}
          ${theme === 'dark' 
            ? 'bg-background-dark text-slate-200 placeholder-slate-600 shadow-[inset_4px_4px_8px_#15191e,inset_-4px_-4px_8px_#2d3540] focus:shadow-[inset_6px_6px_12px_#15191e,inset_-6px_-6px_12px_#2d3540]' 
            : 'bg-background-light text-slate-700 placeholder-slate-400 shadow-[inset_4px_4px_8px_#bec3c9,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#bec3c9,inset_-6px_-6px_12px_#ffffff]'
          }
        `}
      />
    </div>
  );
};