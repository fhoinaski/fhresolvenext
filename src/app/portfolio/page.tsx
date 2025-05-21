'use client';

import { ProjectCard } from '../../components/ProjectCard';
import { getProjects } from '../../data/projects';
import Link from 'next/link';
import { ArrowLeft, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PortfolioPage() {
  const projects = getProjects();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-white/90 dark:bg-gray-900/90 shadow-sm' : 'py-3 bg-white/80 dark:bg-gray-900/80'
      } backdrop-blur-md`}>
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <span className="text-lg font-bold text-blue-600 dark:text-white">FH Resolve</span>
          </Link>
          
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Voltar para o início</span>
          </Link>
        </div>
      </header>

      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Portfólio de Trabalhos</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Confira alguns dos nossos projetos recentes e veja como podemos ajudar você com soluções de qualidade para sua casa ou negócio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
              />
            ))}
          </div>
          
          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Nenhum projeto encontrado.</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} FH Resolve - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </>
  );
} 