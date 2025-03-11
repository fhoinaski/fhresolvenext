import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  { 
    id: 1, 
    name: 'Ana Silva', 
    location: 'Jurerê', 
    rating: 5, 
    text: 'Serviço rápido e confiável! O Fernando resolveu um problema elétrico que outros não conseguiram identificar. Super recomendo!', 
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' 
  },
  { 
    id: 2, 
    name: 'Carlos Mendes', 
    location: 'Ratones', 
    rating: 5, 
    text: 'Excelente profissional! Pontual, organizado e resolveu o vazamento no banheiro com muita eficiência. Meu contato fixo para reparos!', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' 
  },
  { 
    id: 3, 
    name: 'Mariana Costa', 
    location: 'Canasvieiras', 
    rating: 5, 
    text: 'Contratei para montar os móveis do meu apartamento novo e fiquei muito satisfeita. Trabalho impecável e preço justo!', 
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' 
  },
  { 
    id: 4, 
    name: 'Roberto Almeida', 
    location: 'Ingleses', 
    rating: 5, 
    text: 'Reparo urgente na pia da cozinha resolvido em menos de uma hora. Atendimento super rápido. Recomendo!', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' 
  },
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [current, autoplay]);

  return (
    <section id="testimonials" className="py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="text-center mb-10">
          <motion.span 
            className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Depoimentos
          </motion.span>
          <motion.h2 
            className="section-title mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            O Que Nossos Clientes Dizem
          </motion.h2>
          <motion.p 
            className="section-subtitle text-[var(--color-text)]/80"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A satisfação dos nossos clientes é o nosso maior orgulho
          </motion.p>
        </div>
        
        {/* Métricas de satisfação */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: '98%', label: 'Satisfação' },
            { value: '200+', label: 'Clientes' },
            { value: '500+', label: 'Projetos concluídos' },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-[var(--color-neutral)]/20"
            >
              <h3 className="text-3xl font-bold text-[var(--color-accent)] mb-1">{stat.value}</h3>
              <p className="text-sm text-[var(--color-text)]/70">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <motion.div 
            className="overflow-hidden relative rounded-xl bg-white dark:bg-[var(--color-neutral)]/5 p-8 md:p-10 shadow-sm border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Aspas decorativas */}
            <svg 
              className="absolute top-8 left-8 w-10 h-10 text-[var(--color-accent)]/10" 
              fill="currentColor" 
              viewBox="0 0 32 32"
            >
              <path d="M9.352 27.12c-2.56 0-4.64-.832-6.24-2.496C1.52 22.967.72 20.8.72 18.137c0-2.24.544-4.48 1.632-6.72 1.088-2.24 2.4-4.16 3.936-5.76C7.824 4.065 9.584 2.72 11.568 1.632L13.872 4.8c-1.92 1.088-3.456 2.4-4.608 3.936-1.152 1.536-1.728 3.184-1.728 4.944 0 .768.16 1.376.48 1.824a39.77 39.77 0 0 0 1.44-1.44c.512-.576 1.136-1.056 1.872-1.44.736-.384 1.6-.576 2.592-.576 1.856 0 3.36.672 4.512 2.016 1.152 1.344 1.728 3.08 1.728 5.208 0 1.856-.544 3.456-1.632 4.8-1.088 1.344-2.8 2.016-5.136 2.016zm16.128 0c-2.56 0-4.64-.832-6.24-2.496-1.6-1.664-2.4-3.824-2.4-6.48 0-2.24.544-4.48 1.632-6.72 1.088-2.24 2.4-4.16 3.936-5.76 1.536-1.6 3.288-2.944 5.28-4.032L30 4.8c-1.92 1.088-3.456 2.4-4.608 3.936a10.824 10.824 0 0 0-1.728 4.944c0 .768.16 1.376.48 1.824.448-.448.896-.928 1.344-1.44.512-.576 1.136-1.056 1.872-1.44.736-.384 1.6-.576 2.592-.576 1.856 0 3.36.672 4.512 2.016 1.152 1.344 1.728 3.08 1.728 5.208 0 1.856-.544 3.456-1.632 4.8-1.088 1.344-2.8 2.016-5.136 2.016z"></path>
            </svg>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col md:flex-row items-center gap-8 relative z-10"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--color-accent)]/20 shadow-sm">
                    <Image
                      src={testimonials[current].image}
                      alt={`Cliente ${testimonials[current].name}`}
                      width={150}  // Adicionado
                      height={150} // Adicionado
                      className="w-full h-full object-cover"
                      loading="lazy" // Adicionado para desempenho
                    />
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-3">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 text-[var(--color-dark)] dark:text-[var(--color-text)] leading-relaxed">"{testimonials[current].text}"</p>
                  <div>
                    <h4 className="font-medium text-xl text-[var(--color-dark)] dark:text-[var(--color-text)]">{testimonials[current].name}</h4>
                    <p className="text-[var(--color-accent)]">{testimonials[current].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between items-center mt-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prev}
                className="p-2 rounded-full bg-[var(--color-neutral)]/10 hover:bg-[var(--color-accent)]/10 transition-colors"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="h-5 w-5 text-[var(--color-accent)]" />
              </motion.button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrent(index)}
                    whileHover={{ scale: 1.1 }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      current === index ? 'bg-[var(--color-accent)] w-6' : 'bg-[var(--color-accent)]/30'
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={next}
                className="p-2 rounded-full bg-[var(--color-neutral)]/10 hover:bg-[var(--color-accent)]/10 transition-colors"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="h-5 w-5 text-[var(--color-accent)]" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;