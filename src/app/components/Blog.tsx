import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.05, rotateX: 5, transition: { duration: 0.3 } },
  };

  return (
    <section id="blog" className="py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="section-title">Blog</h2>
          <p className="section-subtitle">Em breve: Dicas de Manutenção</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              variants={cardVariants}
              whileHover="hover"
              className="relative card group overflow-hidden"
              style={{
                maskImage: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
                WebkitMaskImage: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
              }}
            >
              <div className="h-48 bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-[var(--color-text)]/50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Artigo em Breve</h3>
                <p className="text-[var(--color-text)]/80 mb-4">
                  Conteúdos exclusivos sobre manutenção residencial em breve.
                </p>
                <motion.button
                  className="flex items-center gap-2 text-[var(--color-accent)]"
                  whileHover={{ gap: 8 }}
                >
                  <span>Saiba mais</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;