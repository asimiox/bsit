import React from 'react';
import { ResourceLink, ResourceCategory } from '../types';
import { FileText, Video, Link as LinkIcon, Download, ExternalLink } from 'lucide-react';

interface ResourceListProps {
  content: ResourceCategory[] | ResourceLink[];
}

const LinkItem: React.FC<{ link: ResourceLink }> = ({ link }) => {
  const getTypeStyles = () => {
    switch (link.type) {
      case 'video': return { icon: <Video size={14} />, color: 'text-purple-500', bg: 'bg-purple-500/10', label: 'VIDEO' };
      case 'link': return { icon: <LinkIcon size={14} />, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'LINK' };
      case 'pdf': return { icon: <FileText size={14} />, color: 'text-red-500', bg: 'bg-red-500/10', label: 'PDF' };
      default: return { icon: <ExternalLink size={14} />, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'OPEN' };
    }
  };

  const style = getTypeStyles();

  return (
    <a 
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 mb-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 group border border-transparent hover:border-black/5 dark:hover:border-white/5"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className={`min-w-[36px] h-9 rounded-lg flex items-center justify-center ${style.bg} ${style.color}`}>
            {style.icon}
        </div>
        <div className="flex flex-col truncate">
            <span className="text-sm font-bold opacity-80 group-hover:opacity-100 truncate">{link.title}</span>
            <span className={`text-[10px] font-bold tracking-wider opacity-50 ${style.color} uppercase`}>{style.label}</span>
        </div>
      </div>
      <ExternalLink size={14} className="opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-300" />
    </a>
  );
};

export const ResourceList: React.FC<ResourceListProps> = ({ content }) => {
  const isCategoryList = (content: any[]): content is ResourceCategory[] => {
    return 'categoryName' in (content[0] || {});
  };

  if (content.length === 0) return <div className="p-4 text-center opacity-50 text-sm italic">No resources available yet.</div>;

  if (isCategoryList(content)) {
    return (
      <div className="flex flex-col gap-5 p-1">
        {content.map((cat, idx) => (
          <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest opacity-40 mb-3 pl-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {cat.categoryName}
            </h4>
            <div className="flex flex-col">
              {cat.links.map((link, lIdx) => (
                <LinkItem key={lIdx} link={link} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col p-1">
      <h4 className="text-[11px] font-extrabold uppercase tracking-widest opacity-40 mb-3 pl-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
        Direct Downloads
      </h4>
      {(content as ResourceLink[]).map((link, idx) => (
        <LinkItem key={idx} link={link} />
      ))}
    </div>
  );
};