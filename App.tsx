import React, { useState, useEffect, useRef } from 'react';
import { SUBJECTS } from './constants';
import { SubjectCard } from './components/SubjectCard';
import { NeumorphicCard } from './components/NeumorphicCard';
import { Sidebar } from './components/Sidebar';
import { NeumorphicInput } from './components/NeumorphicInput';
import { useTheme } from './components/ThemeContext';
import { Moon, Sun, GraduationCap, AlertCircle, Heart, Menu, Search, Clock, Sparkles, Code, Zap, Star } from 'lucide-react';

interface Particle {
  id: number;
  left: number;
  top?: number;
  size: number;
  color: string;
  animationType: 'float' | 'rain';
  duration: number;
  shape: 'heart' | 'star' | 'zap' | 'code';
}

const App: React.FC = () => {
  const [openSubjectId, setOpenSubjectId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [particles, setParticles] = useState<Particle[]>([]);
  const [devMode, setDevMode] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  // Use ref to manage the rain interval so we can clear it
  const rainIntervalRef = useRef<number | null>(null);

  // Clock Timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Update CSS Variables for Theme Color
  useEffect(() => {
    const root = document.documentElement;
    if (devMode) {
      root.style.setProperty('--color-primary', '#ec4899'); // Pink 500
      root.style.setProperty('--color-primary-dark', '#be123c'); // Rose 700
      
      // Start Particle Rain
      const interval = window.setInterval(() => {
        spawnRainParticle();
      }, 300);
      rainIntervalRef.current = interval;

    } else {
      root.style.setProperty('--color-primary', '#10b981'); // Emerald 500
      root.style.setProperty('--color-primary-dark', '#059669'); // Emerald 600
      
      if (rainIntervalRef.current) {
        clearInterval(rainIntervalRef.current);
        rainIntervalRef.current = null;
      }
    }

    return () => {
      if (rainIntervalRef.current) clearInterval(rainIntervalRef.current);
    };
  }, [devMode]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleToggle = (id: string) => {
    setOpenSubjectId((prev) => (prev === id ? null : id));
  };

  // Filter Logic
  const filteredSubjects = SUBJECTS.filter(subject => 
    subject.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (subject.code && subject.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getRandomShape = (): 'heart' | 'star' | 'zap' | 'code' => {
    const shapes: ('heart' | 'star' | 'zap' | 'code')[] = ['heart', 'heart', 'star', 'zap', 'code'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  const spawnRainParticle = () => {
    const colors = ['#ec4899', '#f43f5e', '#e11d48', '#be123c', '#db2777', '#fda4af'];
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      left: Math.random() * window.innerWidth,
      size: Math.random() * 15 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      animationType: 'rain',
      duration: 3 + Math.random() * 2,
      shape: getRandomShape()
    };
    setParticles(prev => [...prev, newParticle]);
    setTimeout(() => {
        setParticles(prev => prev.filter(h => h.id !== newParticle.id));
    }, newParticle.duration * 1000);
  };

  // Trigger: Explosion + Theme Switch
  const toggleDevMode = (e: React.MouseEvent) => {
    // Explosion effect regardless of mode
    const count = 25;
    const newParticles: Particle[] = [];
    const colors = ['#ec4899', '#f43f5e', '#e11d48', '#be123c', '#db2777']; 
    const startX = e.clientX;
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        left: Math.max(0, Math.min(window.innerWidth - 20, startX + (Math.random() * 100 - 50))),
        size: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        animationType: 'float',
        duration: 4,
        shape: getRandomShape()
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
        setParticles(prev => prev.filter(h => !newParticles.find(nh => nh.id === h.id)));
    }, 4000);

    // Toggle Mode
    setDevMode(prev => !prev);
  };

  const renderParticleIcon = (shape: string) => {
    switch (shape) {
      case 'star': return <Star fill="currentColor" />;
      case 'zap': return <Zap fill="currentColor" />;
      case 'code': return <Code />;
      default: return <Heart fill="currentColor" />;
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center py-8 sm:py-12 px-4 md:px-0 overflow-hidden relative">
      {/* Render Floating/Raining Particles */}
      {particles.map(particle => (
        <div
            key={particle.id}
            className={particle.animationType === 'float' ? 'heart-particle' : 'heart-rain'}
            style={{
                left: `${particle.left}px`,
                bottom: particle.animationType === 'float' ? '0' : 'auto',
                top: particle.animationType === 'rain' ? '-50px' : 'auto',
                fontSize: `${particle.size}px`,
                color: particle.color,
                animationDuration: `${particle.duration}s`
            }}
        >
            {renderParticleIcon(particle.shape)}
        </div>
      ))}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="w-full max-w-[550px] flex flex-col relative z-10">
        
        {/* Header Section */}
        <header className="mb-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            {/* Menu Button */}
            <NeumorphicCard 
              clickable 
              onClick={() => setIsSidebarOpen(true)}
              className="w-12 h-12 flex items-center justify-center !rounded-xl"
            >
               <Menu size={22} className="text-slate-600 dark:text-slate-300" />
            </NeumorphicCard>

            {/* Brand Logo/Text */}
            <div className="flex flex-col">
               <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight tracking-tight">
                 BS IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark transition-all duration-500">
                   Semester 1
                 </span>
               </h1>
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

        {/* Dynamic Welcome Banner */}
        <NeumorphicCard className="mb-8 p-6 flex flex-col gap-2 relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b transition-all duration-500 ${devMode ? 'from-pink-400 to-rose-600' : 'from-emerald-400 to-teal-600'}`}></div>
            
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1 block opacity-80 transition-colors duration-500">
                        {getGreeting()}, Student
                    </span>
                    <h2 className="text-2xl font-bold transition-all duration-500">
                        {devMode ? 'Developer Mode' : 'Resource Portal'}
                    </h2>
                </div>
                <div className="flex items-center gap-1.5 opacity-60 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg">
                    <Clock size={12} />
                    <span className="text-xs font-mono font-bold">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>

            <p className="text-sm opacity-60 leading-relaxed mt-2 max-w-[90%] relative z-10 transition-all duration-500">
              {devMode 
                ? <span className="text-primary font-medium">System check active. Testing particle engine physics and dynamic CSS variable injection.</span>
                : <span>Access your centralized curriculum notes, textbooks, and past papers. Everything you need for a <span className="font-bold text-primary">4.0 GPA</span>.</span>
              }
            </p>
            
            {/* Decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-5 dark:opacity-[0.07] rotate-12 pointer-events-none transition-transform duration-1000 group-hover:rotate-6 group-hover:scale-110">
              {devMode ? <Code size={140} className="text-primary" /> : <GraduationCap size={140} />}
            </div>
        </NeumorphicCard>

        {/* Search Bar */}
        <div className="mb-8 sticky top-4 z-30">
            <div className="absolute inset-0 -m-4 bg-background-light dark:bg-background-dark blur-xl opacity-90 -z-10"></div>
            <NeumorphicInput 
                placeholder="Search subjects (e.g., Physics, ENG-101)..." 
                icon={devMode ? <Zap size={20} className="text-primary" /> : <Search size={20} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        {/* Subjects List */}
        <main className="flex flex-col min-h-[300px]">
          {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject, index) => (
                <SubjectCard 
                  key={subject.id} 
                  subject={subject} 
                  isOpen={openSubjectId === subject.id}
                  onToggle={() => handleToggle(subject.id)}
                  index={index}
                />
              ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 opacity-50">
                <Search size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-bold">No subjects found</p>
                <p className="text-sm">Try searching for something else</p>
            </div>
          )}
        </main>

        {/* Disclaimer Note */}
        <div className="mt-4 px-2">
           <NeumorphicCard active={true} className="p-4 flex items-start gap-3 !rounded-xl opacity-70 hover:opacity-100 transition-opacity">
              <div className="text-primary mt-0.5 transition-colors duration-500">
                {devMode ? <Sparkles size={16} /> : <AlertCircle size={16} />}
              </div>
              <p className="text-xs sm:text-sm font-medium opacity-80 leading-relaxed">
                {devMode 
                    ? "Debug Info: React v18, Tailwind CSS enabled, Animation: 60fps." 
                    : "Resources are aggregated from various student contributions. Please verify content before exams."}
              </p>
           </NeumorphicCard>
        </div>

        {/* Footer */}
        <footer className="mt-12 mb-8 flex flex-col items-center justify-center relative gap-3">
          <div className="relative">
             {/* Ring Effect */}
             <div className="absolute inset-0 -m-1 rounded-full border border-primary/20 animate-ping pointer-events-none"></div>
             
             <NeumorphicCard 
              clickable
              onClick={toggleDevMode}
              className="relative px-6 py-3 rounded-full flex items-center gap-2 group hover:scale-105 transition-transform cursor-pointer select-none active:scale-95 z-10"
            >
              <span className="text-[10px] sm:text-xs font-bold opacity-40 uppercase tracking-widest group-hover:opacity-70 transition-opacity">Made with</span>
              <Heart size={12} className={`transition-all duration-500 ${devMode ? 'text-pink-500 fill-pink-500 scale-125' : 'text-slate-400 fill-slate-400'} group-hover:text-red-500 group-hover:fill-red-500`} />
              <span className="text-[10px] sm:text-xs font-bold opacity-40 uppercase tracking-widest group-hover:opacity-70 transition-opacity">by Asim Nawaz</span>
            </NeumorphicCard>
          </div>
          
          <span className="text-[9px] sm:text-[10px] font-mono opacity-40 tracking-widest animate-pulse">
            (Click to Test)
          </span>
        </footer>
      </div>
    </div>
  );
};

export default App;