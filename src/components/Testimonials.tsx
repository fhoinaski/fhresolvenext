'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

// Dados dos depoimentos
const testimonials = [
  {
    id: 1,
    name: 'Ana Silva',
    location: 'Jurerê',
    rating: 5,
    text: 'Serviço rápido e confiável! O Fernando resolveu um problema elétrico que outros não conseguiram identificar. Super recomendo!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    location: 'Ratones',
    rating: 5,
    text: 'Excelente profissional! Pontual, organizado e resolveu o vazamento no banheiro com muita eficiência. Meu contato fixo para reparos!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    name: 'Mariana Costa',
    location: 'Canasvieiras',
    rating: 5,
    text: 'Contratei para montar os móveis do meu apartamento novo e fiquei muito satisfeita. Trabalho impecável e preço justo!',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 4,
    name: 'Roberto Almeida',
    location: 'Ingleses',
    rating: 5,
    text: 'Reparo urgente na pia da cozinha resolvido em menos de uma hora. Atendimento super rápido. Recomendo!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Manipuladores para avançar e retroceder
  const next = useCallback(() => setCurrent((prev) => (prev + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length), []);

  // Configuração para suporte a gestos de swipe em dispositivos móveis
  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  // Verifica se o dispositivo é móvel
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Configuração do autoplay
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [autoplay, next]);

  // Componente para renderizar as estrelas de avaliação
  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center justify-start mb-3 gap-1">
      {[...Array(rating)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 600 }}
        >
          <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-[var(--color-accent)] text-[var(--color-accent)]" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section
      id="testimonials"
      className="relative py-12 md:py-16 lg:py-20 bg-[var(--color-gray)] overflow-hidden"
    >
      {/* Fundo com máscara radial */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(var(--color-accent-rgb),0.15),transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <motion.span
            className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Depoimentos
          </motion.span>
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            O Que Nossos Clientes Dizem
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base md:text-lg text-[var(--color-text)]/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A satisfação dos nossos clientes é o nosso maior orgulho
          </motion.p>
        </div>

        {/* Métricas de Satisfação */}
        <motion.div
          className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: '98%', label: 'Satisfação' },
            { value: '200+', label: 'Clientes' },
            { value: '500+', label: 'Projetos' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-2 sm:p-4 md:p-6 rounded-lg bg-[var(--color-card-bg)]/10 backdrop-blur-sm border border-[var(--color-neutral)]/20 flex flex-col items-center justify-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-accent)] mb-0 sm:mb-1">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text)]/70 text-center">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Carrossel de Depoimentos */}
        <div
          className="relative max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
          {...handlers}
        >
          <motion.div
            className="relative rounded-xl sm:rounded-2xl transition-all duration-300 border border-[var(--color-neutral)]/30 shadow-lg bg-[var(--color-light)] p-4 sm:p-6 md:p-8 lg:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Gradiente de fundo sutil */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent pointer-events-none" />

            {/* Aspas Decorativas */}
            <motion.svg
              className="absolute top-4 left-4 sm:top-6 sm:left-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[var(--color-accent)]/15"
              fill="currentColor"
              viewBox="0 0 32 32"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <path d="M9.352 27.12c-2.56 0-4.64-.832-6.24-2.496C1.52 22.967.72 20.8.72 18.137c0-2.24.544-4.48 1.632-6.72 1.088-2.24 2.4-4.16 3.936-5.76C7.824 4.065 9.584 2.72 11.568 1.632L13.872 4.8c-1.92 1.088-3.456 2.4-4.608 3.936-1.152 1.536-1.728 3.184-1.728 4.944 0 .768.16 1.376.48 1.824a39.77 39.77 0 0 0 1.44-1.44c.512-.576 1.136-1.056 1.872-1.44.736-.384 1.6-.576 2.592-.576 1.856 0 3.36.672 4.512 2.016 1.152 1.344 1.728 3.08 1.728 5.208 0 1.856-.544 3.456-1.632 4.8-1.088 1.344-2.8 2.016-5.136 2.016zm16.128 0c-2.56 0-4.64-.832-6.24-2.496-1.6-1.664-2.4-3.824-2.4-6.48 0-2.24.544-4.48 1.632-6.72 1.088-2.24 2.4-4.16 3.936-5.76 1.536-1.6 3.288-2.944 5.28-4.032L30 4.8c-1.92 1.088-3.456 2.4-4.608 3.936a10.824 10.824 0 0 0-1.728 4.944c0 .768.16 1.376.48 1.824.448-.448.896-.928 1.344-1.44.512-.576 1.136-1.056 1.872-1.44.736-.384 1.6-.576 2.592-.576 1.856 0 3.36.672 4.512 2.016 1.152 1.344 1.728 3.08 1.728 5.208 0 1.856-.544 3.456-1.632 4.8-1.088 1.344-2.8 2.016-5.136 2.016z" />
            </motion.svg>

            {/* Indicador de swipe para dispositivos móveis */}
            {isMobile && (
              <div className="absolute -bottom-6 left-0 right-0 flex justify-center items-center opacity-70">
                <div className="flex items-center gap-1 text-xs text-[var(--color-text)]/60">
                  <ChevronLeft className="h-3 w-3" /> 
                  <span>Deslize</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            )}

            {/* Conteúdo do Depoimento */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8 relative z-10 pt-2 sm:pt-0"
              >
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 sm:border-4 border-[var(--color-accent)]/30 shadow-lg">
                    <Image
                      src={testimonials[current].image}
                      alt={`Foto de ${testimonials[current].name}`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
                <div className="flex-grow text-center sm:text-left">
                  <RatingStars rating={testimonials[current].rating} />
                  <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--color-card-text)] leading-relaxed mb-3 sm:mb-4 italic font-light">
                    "{testimonials[current].text}"
                  </blockquote>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--color-card-text)]">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base text-[var(--color-accent)] font-medium">
                      {testimonials[current].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navegação */}
            <div className="flex justify-between items-center mt-6 sm:mt-8 md:mt-10">
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="p-2 sm:p-3 rounded-full bg-[var(--color-neutral)]/10 hover:bg-[var(--color-accent)]/20 transition-colors"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[var(--color-accent)]" />
              </motion.button>
              <div className="flex gap-1 sm:gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrent(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      current === index
                        ? 'bg-[var(--color-accent)] w-4 sm:w-6'
                        : 'bg-[var(--color-neutral)]/30 hover:bg-[var(--color-accent)]/50'
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="p-2 sm:p-3 rounded-full bg-[var(--color-neutral)]/10 hover:bg-[var(--color-accent)]/20 transition-colors"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[var(--color-accent)]" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;