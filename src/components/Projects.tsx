import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <section id="projects" className="py-20 bg-[var(--color-light)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="section-title">Galeria de Projetos</h2>
          <p className="section-subtitle">Novos projetos em breve</p>
        </motion.div>

        <motion.div
          className="relative rounded-xl bg-[var(--color-accent)]/10 p-8 shadow-lg"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            maskImage: 'linear-gradient(45deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(45deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <FolderOpen className="h-16 w-16 text-[var(--color-accent)] mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Projetos Futuros</h3>
              <p className="text-[var(--color-text)] mb-6">
                Em breve, uma galeria com nossos principais projetos.
              </p>
              <motion.button
                className="flex items-center gap-2 text-[var(--color-accent)]"
                whileHover={{ gap: 8 }}
              >
                <span>Saiba mais</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            <motion.div className="w-64 h-64 bg-[var(--color-neutral)]/10 rounded-xl flex items-center justify-center" whileHover={{ scale: 1.05 }}>
              <p className="text-lg font-semibold">Em Construção</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;