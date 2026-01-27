import React, { useState } from 'react';
import { SUBJECTS } from './constants';
import { SubjectCard } from './components/SubjectCard';
import { NeumorphicCard } from './components/NeumorphicCard';
import { useTheme } from './components/ThemeContext';
import { Moon, Sun, GraduationCap, AlertCircle, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [openSubjectId, setOpenSubjectId] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleToggle = (id: string) => {
    setOpenSubjectId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen w-full flex justify-center py-10 px-4 md:px-0">
      <div className="w-full max-w-xl flex flex-col">
        
        {/* Header Section */}
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <NeumorphicCard className="w-14 h-14 flex items-center justify-center !rounded-full text-primary">
               <GraduationCap size={28} strokeWidth={2} />
            </NeumorphicCard>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                BS IT <span className="text-primary">First Semester</span>
              </h1>
              <p className="text-sm font-semibold opacity-50">Resource Portal</p>
            </div>
          </div>

          <NeumorphicCard 
            clickable 
            onClick={toggleTheme} 
            className="w-12 h-12 flex items-center justify-center !rounded-full"
          >
            {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
          </NeumorphicCard>
        </header>

        {/* Info Banner */}
        <NeumorphicCard className="mb-10 p-6 flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h2 className="text-lg font-bold">Welcome, Student</h2>
            <p className="text-sm opacity-60 leading-relaxed">
              Select a subject below to access your curriculum notes, textbooks, and past papers. 
              Everything you need for a GPA of 4.0 is right here.
            </p>
            {/* Decoration */}
            <div className="absolute -right-6 -bottom-6 opacity-5 dark:opacity-10 rotate-12 pointer-events-none">
              <GraduationCap size={120} />
            </div>
        </NeumorphicCard>

        {/* Subjects List */}
        <main className="flex flex-col">
          {SUBJECTS.map((subject) => (
            <SubjectCard 
              key={subject.id} 
              subject={subject} 
              isOpen={openSubjectId === subject.id}
              onToggle={() => handleToggle(subject.id)}
            />
          ))}
        </main>

        {/* Disclaimer Note - Neumorphic Style */}
        <div className="mt-8 px-2">
           <NeumorphicCard active={true} className="p-4 flex items-start gap-3 !rounded-xl opacity-80">
              <div className="text-primary mt-1">
                <AlertCircle size={18} />
              </div>
              <p className="text-sm opacity-70 italic leading-relaxed">
                "This content is taken from several resources, so kindly review it before use."
              </p>
           </NeumorphicCard>
        </div>

        {/* Footer - Neumorphic Style */}
        <footer className="mt-8 mb-4 flex justify-center">
          <NeumorphicCard className="px-6 py-3 rounded-full flex items-center gap-2">
            <span className="text-xs font-bold opacity-50 uppercase tracking-widest">Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span className="text-xs font-bold opacity-50 uppercase tracking-widest">by Asim Nawaz</span>
          </NeumorphicCard>
        </footer>
      </div>
    </div>
  );
};

export default App;