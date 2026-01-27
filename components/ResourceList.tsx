import React from 'react';
import { ResourceLink, ResourceCategory } from '../types';
import { FileText, Video, Link as LinkIcon, Download } from 'lucide-react';

interface ResourceListProps {
  content: ResourceCategory[] | ResourceLink[];
}

const LinkItem: React.FC<{ link: ResourceLink }> = ({ link }) => {
  const getIcon = () => {
    switch (link.type) {
      case 'video': return <Video size={16} className="text-red-500" />;
      case 'link': return <LinkIcon size={16} className="text-blue-500" />;
      default: return <FileText size={16} className="text-emerald-500" />;
    }
  };

  return (
    <a 
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 mb-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
    >
      <div className="flex items-center gap-3">
        {getIcon()}
        <span className="text-sm font-medium opacity-80 group-hover:opacity-100">{link.title}</span>
      </div>
      <Download size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
    </a>
  );
};

export const ResourceList: React.FC<ResourceListProps> = ({ content }) => {
  const isCategoryList = (content: any[]): content is ResourceCategory[] => {
    return 'categoryName' in (content[0] || {});
  };

  if (content.length === 0) return <div className="p-4 text-center opacity-50">No resources available yet.</div>;

  if (isCategoryList(content)) {
    return (
      <div className="flex flex-col gap-4 p-2">
        {content.map((cat, idx) => (
          <div key={idx} className="mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 pl-2 text-primary">{cat.categoryName}</h4>
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
    <div className="flex flex-col p-2">
      <h4 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 pl-2 text-primary">Direct Downloads</h4>
      {(content as ResourceLink[]).map((link, idx) => (
        <LinkItem key={idx} link={link} />
      ))}
    </div>
  );
};