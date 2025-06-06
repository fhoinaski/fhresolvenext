export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
} 