export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Dados de exemplo - você pode substituir isso por uma chamada à API ou banco de dados
export const projects: Project[] = [
  {
    id: '1',
    title: 'Reforma de Banheiro',
    description: 'Reforma completa de um banheiro em Ratones, incluindo troca de revestimentos, instalação de box de vidro temperado, nova pia e vaso sanitário, além de instalações elétricas e hidráulicas.',
    image: '/images/project1.jpg',
    tags: ['Reforma', 'Hidráulica', 'Elétrica', 'Revestimentos'],
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-15')
  },
  {
    id: '2',
    title: 'Instalação Elétrica Residencial',
    description: 'Revisão completa da instalação elétrica de uma residência em Jurerê, com troca do quadro de disjuntores, aterramento e instalação de novos pontos de tomada e iluminação.',
    image: '/images/project2.jpg',
    tags: ['Elétrica', 'Instalação', 'Segurança'],
    createdAt: new Date('2023-11-22'),
    updatedAt: new Date('2023-11-22')
  },
  {
    id: '3',
    title: 'Montagem de Móveis',
    description: 'Montagem e instalação de todos os móveis de um apartamento recém-adquirido nos Ingleses, incluindo armários de cozinha, guarda-roupas e prateleiras personalizadas.',
    image: '/images/project3.jpg',
    tags: ['Montagem', 'Móveis', 'Instalação'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '4',
    title: 'Reparo de Infiltração',
    description: 'Identificação e correção de infiltrações em uma casa em Canasvieiras, incluindo impermeabilização de laje, substituição de telhas e pintura das áreas afetadas.',
    image: '/images/project4.jpg',
    tags: ['Infiltração', 'Impermeabilização', 'Pintura'],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  },
  {
    id: '5',
    title: 'Construção de Deck de Madeira',
    description: 'Projeto e construção de um deck de madeira tratada para área externa em residência em Santo Antônio de Lisboa, incluindo escada e guarda-corpo.',
    image: '/images/project5.jpg',
    tags: ['Carpintaria', 'Área Externa', 'Madeira'],
    createdAt: new Date('2024-03-18'),
    updatedAt: new Date('2024-03-18')
  },
  {
    id: '6',
    title: 'Automação Residencial',
    description: 'Instalação de sistema de automação residencial em Jurerê Internacional, incluindo iluminação inteligente, cortinas motorizadas e integração com assistentes de voz.',
    image: '/images/project6.jpg',
    tags: ['Automação', 'Smart Home', 'Elétrica'],
    createdAt: new Date('2024-04-22'),
    updatedAt: new Date('2024-04-22')
  }
];

export function getProjects(): Project[] {
  // Aqui você pode implementar a lógica para buscar os projetos do seu banco de dados
  // Por enquanto, estamos retornando os dados de exemplo
  return projects;
} 