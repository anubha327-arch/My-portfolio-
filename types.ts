
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  contributions: string;
  outcome: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Tools' | 'AI';
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
