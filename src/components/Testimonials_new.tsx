'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, MapPin, Calendar, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

// Dados dos depoimentos expandidos
const testimonials = [
  {
    id: 1,
    name: 'Ana Silva',
    location: 'Jurerê Internacional',
    service: 'Reparo Elétrico',
    date: 'Janeiro 2024',
    rating: 5,
    text: 'Serviço rápido e confiável! O Fernando resolveu um problema elétrico complexo que outros profissionais não conseguiram identificar. Trabalho impecável e preço justo. Super recomendo!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    verified: true
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    location: 'Ratones',
    service: 'Serviço Hidráulico',
    date: 'Fevereiro 2024',
    rating: 5,
    text: 'Excelente profissional! Pontual, organizado e resolveu o vazamento no banheiro com muita eficiência. Deixou tudo limpo e funcionando perfeitamente. Meu contato fixo para reparos!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    verified: true
  },
  {
    id: 3,
    name: 'Mariana Costa',
    location: 'Canasvieiras',
    service: 'Montagem de Móveis',
    date: 'Março 2024',
    rating: 5,
    text: 'Contratei para montar os móveis do meu apartamento novo e fiquei impressionada com a qualidade do trabalho. Muito cuidadoso, rápido e com preço super justo. Trabalho impecável!',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    verified: true
  },
  {
    id: 4,
    name: 'Roberto Almeida',
    location: 'Ingleses do Rio Vermelho',
    service: 'Reparo Urgente',
    date: 'Abril 2024',
    rating: 5,
    text: 'Tive um problema urgente na pia da cozinha e o Fernando atendeu no mesmo dia. Resolveu tudo em menos de uma hora com muita eficiência. Atendimento excepcional!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    verified: true
  },
  {
    id: 5,
    name: 'Fernanda Lima',
    location: 'Cachoeira do Bom Jesus',
    service: 'Manutenção Preventiva',
    date: 'Maio 2024',
    rating: 5,
    text: 'Serviço de manutenção preventiva excepcional. Fernando identificou alguns problemas que poderiam virar dor de cabeça e resolveu tudo de uma vez. Muito profissional e confiável!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    verified: true
  },
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Detectar dispositivo móvel
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Manipuladores para avançar e retroceder
  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Ir para slide específico
  const goToSlide = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  // Configuração para suporte a gestos de swipe
  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  // Configuração do autoplay
  useEffect(() => {
    if (!autoplay || !inView) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [autoplay, next, inView]);

  // Componente para renderizar as estrelas de avaliação
  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 600 }}
        >
          <Star 
            className={`h-4 w-4 sm:h-5 sm:w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
          />
        </motion.div>
      ))}
      <span className="ml-2 text-xs sm:text-sm font-medium text-[var(--color-text)]/70">({rating}.0)</span>
    </div>
  );

  // Animações do slide
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isMobile ? 200 : 300) : (isMobile ? -200 : -300),
      opacity: 0,
      scale: isMobile ? 0.9 : 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? (isMobile ? 200 : 300) : (isMobile ? -200 : -300),
      opacity: 0,
      scale: isMobile ? 0.9 : 0.8
    })
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 -right-20 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-l from-[var(--color-accent)]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-[var(--color-secondary)]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-40 left-10 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-pulse"></div>
      <div className="absolute top-60 right-20 w-3 h-3 bg-[var(--color-accent)]/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-[var(--color-accent)]/40 rounded-full animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-semibold mb-4 border border-[var(--color-accent)]/20">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-2 fill-current" />
            Depoimentos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[var(--color-text)] tracking-tight">
            O Que Nossos{' '}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] text-transparent bg-clip-text">
              Clientes
            </span>{' '}
            Dizem
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-text)]/70 max-w-3xl mx-auto leading-relaxed px-4">
            A satisfação e confiança dos nossos clientes são o nosso maior orgulho e motivação
          </p>
        </motion.div>

        {/* Stats Section - Melhorada responsividade */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { value: '98%', label: 'Satisfação', icon: '😊' },
            { value: '500+', label: 'Clientes Atendidos', icon: '👥' },
            { value: '1200+', label: 'Serviços Realizados', icon: '🔧' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 sm:p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="text-xl sm:text-2xl mb-2">{stat.icon}</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-accent)] mb-2">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-[var(--color-text)]/70 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-5xl mx-auto">
          <div
            className="relative"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            {...handlers}
          >
            {/* Main Testimonial Card - Altura responsiva */}
            <div className="relative min-h-[450px] sm:min-h-[400px] md:min-h-[380px] lg:min-h-[350px] overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  className="absolute inset-0"
                >
                  <div className="h-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden">
                    {/* Background Quote */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-5">
                      <Quote size={isMobile ? 80 : 120} className="text-[var(--color-accent)]" />
                    </div>

                    <div className="relative z-10 h-full flex flex-col">
                      {/* Header - Layout responsivo melhorado */}
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="relative mx-auto sm:mx-0">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                            <Image
                              src={testimonials[current].image}
                              alt={testimonials[current].name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {testimonials[current].verified && (
                            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center border-2 sm:border-4 border-white shadow-lg">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                            <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
                              {testimonials[current].name}
                            </h3>
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs sm:text-sm font-medium">
                              Cliente Verificado
                            </span>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-[var(--color-text)]/70 mb-3 justify-center sm:justify-start">
                            <div className="flex items-center gap-1 justify-center sm:justify-start">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate max-w-[200px]">{testimonials[current].location}</span>
                            </div>
                            <div className="flex items-center gap-1 justify-center sm:justify-start">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span>{testimonials[current].date}</span>
                            </div>
                          </div>

                          <div className="flex justify-center sm:justify-start">
                            <RatingStars rating={testimonials[current].rating} />
                          </div>
                        </div>
                      </div>

                      {/* Service Tag */}
                      <div className="mb-4 sm:mb-6 text-center sm:text-left">
                        <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-accent-light)]/10 text-[var(--color-accent)] text-xs sm:text-sm font-semibold border border-[var(--color-accent)]/20">
                          Serviço: {testimonials[current].service}
                        </span>
                      </div>

                      {/* Testimonial Text */}
                      <div className="flex-1 flex items-center">
                        <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-[var(--color-text)]/80 italic text-center sm:text-left">
                          "{testimonials[current].text}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons - Ajustados para mobile */}
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 z-10 border border-gray-200"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={isMobile ? 20 : 24} />
            </button>

            <button
              onClick={next}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 z-10 border border-gray-200"
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={isMobile ? 20 : 24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'bg-[var(--color-accent)] w-6 sm:w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2.5 sm:w-3'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe Indicator for Mobile */}
          <div className="sm:hidden flex justify-center items-center mt-4 text-xs text-[var(--color-text)]/50">
            <ChevronLeft className="w-3 h-3" />
            <span className="mx-2">Deslize para navegar</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-8 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[var(--color-accent)] text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/40 transition-all duration-300"
          >
            <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
            <span>Seja Nosso Próximo Cliente Satisfeito</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
