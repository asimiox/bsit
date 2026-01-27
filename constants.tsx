import { Subject } from './types';
import { 
  Cpu, 
  Binary, 
  Atom, 
  BookOpen, 
  Flag, 
  MoonStar, 
  Sigma,
  LucideIcon
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Cpu,
  Binary,
  Atom,
  BookOpen,
  Flag,
  MoonStar,
  Sigma
};

export const SUBJECTS: Subject[] = [
  {
    id: 'physics',
    title: 'Applied Physics',
    code: 'PHY-110',
    iconName: 'Atom',
    content: [
      {
        categoryName: 'Books',
        links: [
          { title: 'Physics Books Drive', url: 'https://drive.google.com/drive/folders/1Wfq0JalLLoEguKCU6KkmEIpo_0YW9ttG', type: 'link' },
        ]
      },
      {
        categoryName: 'Past Papers',
        links: [
          { title: 'Past Papers Archive', url: 'https://drive.google.com/drive/folders/1qk0vrggaykcYlcqge1tIeOExpn7XbMHV', type: 'link' },
        ]
      },
      {
        categoryName: 'Notes',
        links: [
          { title: 'Subject Notes', url: 'https://drive.google.com/drive/folders/1O1iJOifeHvxKEAxbt9W0efCVpmLA0Ay6', type: 'link' },
        ]
      },
      {
        categoryName: 'Slides & PDFs',
        links: [
          { title: 'Slides and Reference PDFs', url: 'https://drive.google.com/drive/folders/1pAGYtOh8t07AZpC9k0p-vVNBviGFbEK5', type: 'link' },
        ]
      }
    ]
  },
  {
    id: 'dld',
    title: 'Digital Logic Design',
    code: 'CS-102',
    iconName: 'Binary',
    // DLD has no sub-options, just direct link
    content: [
      { title: 'DLD Complete Resources (Drive)', url: 'https://drive.google.com/drive/folders/1plYV6qsAfeXQ9JeG3OCJRCd_33bWahiq', type: 'link' },
    ]
  },
  {
    id: 'english1',
    title: 'Functional English',
    code: 'ENG-101',
    iconName: 'BookOpen',
    content: [
      {
        categoryName: 'Books',
        links: [
          { title: 'English Books Drive', url: 'https://drive.google.com/drive/folders/1hUi4_tigjQOUNRpo8KD9Hki3W2vTCAgb', type: 'link' },
        ]
      },
      {
        categoryName: 'Body Language',
        links: [
          { title: 'Body Language Material', url: 'https://drive.google.com/file/d/1mK9MNK1l1dxxqEnwiePkM34WV-IkMjni/view?usp=drivesdk', type: 'pdf' },
        ]
      },
      {
        categoryName: 'Past Papers',
        links: [
          { title: 'Past Paper 1', url: 'https://drive.google.com/file/d/1lVongSHUHcoO17GcRW-36bu2Z9BFlDYP/view?usp=drivesdk', type: 'pdf' },
          { title: 'Past Paper 2', url: 'https://drive.google.com/file/d/1kc90mVt_YKac3gtd42VBi6ZX9XP-CJJ0/view?usp=drivesdk', type: 'pdf' },
          { title: 'Past Paper 3', url: 'https://drive.google.com/file/d/1Gi_hqJA8ZmKIh5K0XBFtLvhADF0BScnT/view?usp=drivesdk', type: 'pdf' },
        ]
      },
      {
        categoryName: 'Solved Papers',
        links: [
          { title: 'Solved Papers Drive', url: 'https://drive.google.com/drive/folders/1vTsog-AN_t46DXLS9wT0nIja9j5ZGc3K', type: 'link' },
        ]
      },
      {
        categoryName: 'Notes & Slides',
        links: [
          { title: 'Notes & Slides Drive', url: 'https://drive.google.com/drive/folders/1NBCY4j7JU658CBTfef1teJQSPKlU80iX', type: 'link' },
        ]
      }
    ]
  },
  {
    id: 'english2',
    title: 'Functional English II',
    code: 'ENG-102',
    iconName: 'BookOpen',
    content: [
      {
        categoryName: 'Books',
        links: [
          { title: 'Course Books', url: 'https://drive.google.com/drive/folders/1StYCRFtMfMAs16S9xUhKU7P8spEAt-NS', type: 'link' },
        ]
      },
      {
        categoryName: 'Notes',
        links: [
          { title: 'Subject Notes', url: 'https://drive.google.com/drive/folders/1Jg0B21yv1WFhx5DVT98xRAmEDLFIuRBm', type: 'link' },
        ]
      },
      {
        categoryName: 'Past Papers',
        links: [
          { title: 'Past Papers Collection', url: 'https://drive.google.com/drive/folders/1JmVi5fHXgQN3j7D398Y1ll1GaMBNpPLx', type: 'link' },
        ]
      }
    ]
  },
  {
    id: 'ict',
    title: 'Intro to ICT',
    code: 'IT-101',
    iconName: 'Cpu',
    // ICT direct link
    content: [
      { title: 'ICT Resources Drive', url: 'https://drive.google.com/drive/folders/1pcmCXK8pvqnOuELiAhwAJBURs-5mPYjS', type: 'link' },
    ]
  },
  {
    id: 'islamiat',
    title: 'Islamic Studies',
    code: 'ISL-101',
    iconName: 'MoonStar',
    content: [
      {
        categoryName: 'Books',
        links: [
           { title: 'Islamic Studies Books', url: 'https://drive.google.com/drive/folders/1io9851l6CE-ZLoqLxcmSKjSEh_di4kuD', type: 'link' },
        ]
      },
      {
        categoryName: 'Past Papers & Notes',
        links: [
          { title: 'Notes & Past Papers Drive', url: 'https://drive.google.com/drive/folders/1xQbaIWCLPCfX0DFFcai5QXmenLG4yf3r', type: 'link' },
        ]
      }
    ]
  },
  {
    id: 'math',
    title: 'Calculus (Math Def-1)',
    code: 'MTH-101',
    iconName: 'Sigma',
    content: [
      {
        categoryName: 'Past Papers',
        links: [
          { title: 'Math Past Papers', url: 'https://drive.google.com/drive/folders/1UuiINm2PROw7Us2Cm5wVxYiCUrgAY8l5', type: 'link' },
        ]
      }
    ]
  },
  {
    id: 'pakstudy',
    title: 'Pakistan Studies',
    code: 'PST-101',
    iconName: 'Flag',
    content: [
        {
          categoryName: 'Books',
          links: [
            { title: 'Pak Studies Books', url: 'https://drive.google.com/drive/folders/1hkyljxFwDW6HJUtaK56bFVtWYhnEMg6B', type: 'link' },
          ]
        },
        {
          categoryName: 'Notes, Papers & PDFs',
          links: [
             { title: 'Comprehensive Resources', url: 'https://drive.google.com/drive/folders/1Wh8BzPMtya9p7JnV3ckYyJKoT9NxwiqY', type: 'link' },
          ]
        }
    ]
  },
];