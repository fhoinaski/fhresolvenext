'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, MapPin, Calendar, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

// Avaliações reais extraídas do Google Meu Negócio da FH Resolve
const testimonials = [
  {
    id: 1,
    name: 'Hajji Abdul Rahman',
    location: 'Florianópolis - SC',
    service: 'Serviços Gerais',
    date: 'Há 2 semanas',
    rating: 5,
    text: 'Sugiro procurar os serviços desse servidor. Profissional muito competente. Discreto e educado. Estamos de mudança para uma casa e vamos contratar os serviços dele. Preço justo, qualidade e eficiência!',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjUMqU1mxXs-7nXN3P1MFgNW0Pllo18DxtPulXTfqZplcmnvYoDqhw=s36-c-rp-mo-br100',
    verified: true,
    source: 'Google Maps',
    googleUrl: 'https://g.co/kgs/LRFtA1G'
  },
  {
    id: 2,
    name: 'Luiz Mosciaro',
    location: 'Florianópolis - SC',
    service: 'Atendimento Especializado',
    date: 'Há 3 semanas',
    rating: 5,
    text: 'Muito rápido e solícito, atendeu todas dúvidas e fez o serviço com maestria',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjXUfV0kA9xl2NCvzPF7xEUvYXrmL-MgnzgpkreGidJVomSSJ4NT-A=s36-c-rp-mo-br100',
    verified: true,
    source: 'Google Maps',
    googleUrl: 'https://g.co/kgs/LRFtA1G'
  },
  {
    id: 3,
    name: 'Cecília Rosing Boeing',
    location: 'Florianópolis - SC',
    service: 'Serviços Residenciais',
    date: 'Há 3 semanas',
    rating: 5,
    text: 'Resolve mesmo gentem. Podem confiar super indico!',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjUBxjam5ngFe-G--ezB6w-5tTfZizTHaXcZE08sMI_tTU9m5FMEvg=s36-c-rp-mo-br100',
    verified: true,
    source: 'Google Maps',
    googleUrl: 'https://g.co/kgs/LRFtA1G'
  },
  {
    id: 4,
    name: 'Patricia Mendes',
    location: 'Florianópolis - SC',
    service: 'Manutenção Profissional',
    date: 'Há 3 semanas',
    rating: 5,
    text: 'Ótimo profissional e preço justo.',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjW_GPsnZZ-MXXkFS0Y7dTYtGAMWDw5DVWVZ4WmM4U85VNMnbq28TA=s36-c-rp-mo-ba2-br100',
    verified: true,
    source: 'Google Maps',
    googleUrl: 'https://g.co/kgs/LRFtA1G'
  },
  {
    id: 5,
    name: 'Katia H',
    location: 'Florianópolis - SC',
    service: 'Serviços Detalhados',
    date: 'Há 5 semanas',
    rating: 5,
    text: 'Super recomendo os serviços do Fernando, detalhista em tudo o que faz e trabalho bem feito ✨',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocLD-o4NRLsZ1lAIEys8XoR6BfnZritmxpOORBikcaCWAh-xL88a=s36-c-rp-mo-br100',
    verified: true,
    source: 'Google Maps',
    googleUrl: 'https://g.co/kgs/LRFtA1G'
  },
  {
    id: 6,
    name: 'Zuno Fagundes',
    location: 'Florianópolis - SC',
    service: 'Trabalhos de Qualidade',
    date: 'Há 5 semanas',
    rating: 5,
    text: 'Profissional muito competente. Detalhista e cuidadoso. A qualidade dos seus trabalhos é um destaque. Recomendo muito.',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjVtSNeWZkOR5-Y-CW_h4ssJIAeRSTq0OIyMQXkJK6NyVfsQRgZN2w=s36-c-rp-mo-ba3-br100',
    verified: true,
    source: 'Google Maps',
    googleUrl: 'https://g.co/kgs/LRFtA1G'
  },
  {
    id: 7,
    name: 'Bruna Flores',
    location: 'Florianópolis - SC',
    service: 'Atendimento Residencial',
    date: 'Há 5 semanas',
    rating: 5,
    text: 'Um ótimo atendimento, venho até meu apartamento e resolveu de forma rápida e eficaz sem enrolação. Valor justo. Recomendo',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocI3fCnJfoxZOvoDWPRAsI1kNewlvJy0A7H7bcqBJ_Ml6B3DdjTR=s36-c-rp-mo-br100',
    verified: true,
    source: 'Google Maps',
    googleUrl: 'https://g.co/kgs/LRFtA1G'
  }
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
      {/* Background Image with Texture */}
      <div className="absolute inset-0">
        {/* Subtle photographic texture background */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3Ccircle cx='19' cy='19' r='1'/%3E%3Ccircle cx='25' cy='25' r='1'/%3E%3Ccircle cx='31' cy='31' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3Ccircle cx='43' cy='43' r='1'/%3E%3Ccircle cx='49' cy='49' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20" />
        
        {/* Existing gradient elements */}
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
            Avaliações Reais
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[var(--color-text)] tracking-tight">
            O Que Nossos{' '}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] text-transparent bg-clip-text">
              Clientes
            </span>{' '}
            Dizem
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-text)]/70 max-w-3xl mx-auto leading-relaxed px-4">
            Depoimentos reais de clientes que já experimentaram nossos serviços e recomendam nosso trabalho
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
            { value: '4.9★', label: 'Avaliação Média', icon: '⭐' },
            { value: '200+', label: 'Avaliações Positivas', icon: '👥' },
            { value: '800+', label: 'Serviços Realizados', icon: '🔧' },
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
                              alt={`Foto de perfil de ${testimonials[current].name}`}
                              width={80}
                              height={80}
                              sizes="80px"
                              quality={90}
                              loading="lazy"
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
                            <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
                              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs sm:text-sm font-medium">
                                Cliente Verificado
                              </span>
                              <motion.a
                                href={testimonials[current].googleUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs sm:text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                              >
                                {testimonials[current].source}
                              </motion.a>
                            </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[var(--color-accent)] text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/40 transition-all duration-300"
            >
              <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
              <span>Seja Nosso Próximo Cliente Satisfeito</span>
            </motion.a>
            
            <motion.a
              href="https://g.co/kgs/LRFtA1G"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white text-[var(--color-accent)] rounded-xl font-semibold text-sm border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
            >
              <span>📱</span>
              <span>Ver mais de 200+ avaliações no Google</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
