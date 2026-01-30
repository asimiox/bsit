export interface ResourceLink {
  title: string;
  url: string;
  type: 'pdf' | 'video' | 'link';
}

export interface ResourceCategory {
  categoryName: string;
  links: ResourceLink[];
}

export interface Subject {
  id: string;
  title: string;
  code?: string;
  iconName: 'Cpu' | 'Binary' | 'Atom' | 'BookOpen' | 'Flag' | 'MoonStar' | 'Sigma';
  // A subject can either have direct links OR categorized content
  content: ResourceCategory[] | ResourceLink[];
}