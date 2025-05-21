import { Project } from '../types/project';

// Dados de exemplo - você pode substituir isso por uma chamada à API ou banco de dados
const projects: Project[] = [
  {
    id: '1',
    title: 'Projeto 1',
    description: 'Descrição do projeto 1',
    image: '/images/project1.jpg',
    tags: ['React', 'TypeScript', 'Next.js'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    title: 'Projeto 2',
    description: 'Descrição do projeto 2',
    image: '/images/project2.jpg',
    tags: ['Node.js', 'Express', 'MongoDB'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  }
];

export async function getProjects(): Promise<Project[]> {
  // Aqui você pode implementar a lógica para buscar os projetos do seu banco de dados
  // Por enquanto, estamos retornando os dados de exemplo
  return projects;
} 