import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  MessageCircle, 
  CreditCard, 
  ArrowDown, 
  Wrench, 
  Droplet, 
  ShieldCheck, 
  ChevronRight, 
  Star,
  Phone,
  Clock,
  MapPin,
  Award,
  Zap,
  Heart
} from 'lucide-react';
import { 
  buttonVariants, 
  cardVariants, 
  containerVariants, 
  entranceVariants, 
  iconButtonVariants, 
  usePrefersReducedMotion,
  applyVariant,
  getReducedMotionVariants
} from '@/lib/motion-variants';
import WhatsAppModal from './WhatsAppModal';

gsap.registerPlugin(ScrollTrigger);

// Valores totalmente fixos para partículas para evitar problemas de hidratação SSR/CSR
const PARTICLE_CONFIG = [
  { x: 15, y: 25, width: 80, height: 80, opacity: 0.3, scale: 0.8 },
  { x: 75, y: 10, width: 60, height: 60, opacity: 0.4, scale: 0.6 },
  { x: 85, y: 60, width: 100, height: 100, opacity: 0.2, scale: 0.9 },
  { x: 10, y: 80, width: 70, height: 70, opacity: 0.5, scale: 0.7 },
  { x: 50, y: 30, width: 90, height: 90, opacity: 0.3, scale: 0.8 },
  { x: 25, y: 70, width: 65, height: 65, opacity: 0.4, scale: 0.5 },
  { x: 65, y: 85, width: 75, height: 75, opacity: 0.3, scale: 0.6 },
  { x: 40, y: 15, width: 85, height: 85, opacity: 0.2, scale: 0.7 }
];

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
  prefersReducedMotion: boolean;
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  index: number;
  prefersReducedMotion: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, desc, index, prefersReducedMotion }) => (
  <motion.div
    className="service-card group relative overflow-hidden p-6 sm:p-7 rounded-2xl 
               bg-white/10 dark:bg-white/5 border border-[var(--color-neutral)]/20 
               dark:border-white/10 transition-all duration-500 flex flex-col
               hover:bg-white/15 hover:border-[var(--color-accent)]/30 hover:shadow-xl"
    style={{
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 32px rgba(27, 58, 92, 0.12)"
    }}
    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      delay: prefersReducedMotion ? 0 : 0.2 * index, 
      duration: prefersReducedMotion ? 0.2 : 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }}
    whileHover={applyVariant(prefersReducedMotion, {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(27, 58, 92, 0.2)"
    })}
    whileTap={applyVariant(prefersReducedMotion, cardVariants.tap)}
  >
    {/* Gradient Overlay Effect */}
    <div className="absolute top-0 right-0 w-32 sm:w-36 h-32 sm:h-36 bg-gradient-radial 
                   from-[var(--color-accent)]/20 via-[var(--color-accent)]/10 to-transparent 
                   opacity-60 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3 
                   pointer-events-none group-hover:opacity-80 transition-opacity duration-500"></div>
    
    {/* Subtle border glow */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/0 
                   via-[var(--color-accent)]/0 to-[var(--color-accent)]/10 opacity-0 
                   group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    
    <div className="flex items-start gap-4 relative z-10 mb-4">
      <div className="h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center rounded-2xl 
                    bg-gradient-to-br from-[var(--color-accent)]/15 to-[var(--color-accent)]/5
                    text-[var(--color-accent)] flex-shrink-0 shadow-lg
                    group-hover:shadow-xl group-hover:from-[var(--color-accent)]/20 
                    group-hover:to-[var(--color-accent)]/10 transition-all duration-500">
        {prefersReducedMotion ? (
          <div className="text-[var(--color-accent)] text-2xl">{icon}</div>
        ) : (
          <motion.div
            initial={{ rotate: 0, scale: 1 }}
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            whileHover={{ scale: 1.1, rotate: 360 }}            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.3 }
            }}
            className="text-[var(--color-accent)] text-2xl"
          >
            {icon}
          </motion.div>
        )}
      </div>      <div className="flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text)] mb-2 
                     group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text)]/70 
                     group-hover:text-[var(--color-text)]/80 transition-colors duration-300">
          {desc}
        </p>
      </div>
    </div>
    
    {!prefersReducedMotion && (
      <motion.div 
        className="absolute bottom-4 right-4 text-[var(--color-accent)]/50 
                   group-hover:text-[var(--color-accent)] transition-colors duration-300"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronRight size={20} />
      </motion.div>
    )}
  </motion.div>
);

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, index, prefersReducedMotion }) => (
  <motion.div
    className="stat-card text-center p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl 
               bg-white/10 backdrop-blur-md border border-white/20 
               hover:bg-white/15 transition-all duration-300"
    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      delay: prefersReducedMotion ? 0 : 0.1 * index, 
      duration: prefersReducedMotion ? 0.2 : 0.6,
      ease: "easeOut"
    }}
    whileHover={applyVariant(prefersReducedMotion, { scale: 1.05, y: -4 })}
  >
    <div className="mb-2 sm:mb-3 flex justify-center">
      <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex items-center justify-center rounded-full
                    bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
        {icon}
      </div>
    </div>
    <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-[var(--color-text)] mb-1">{value}</div>
    <div className="text-xs sm:text-sm text-[var(--color-text)]/80 leading-tight">{label}</div>
  </motion.div>
);

const Hero: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 50]);
  // Corrigido: valores mais suaves para mobile e evita o efeito de "sumir"
  const contentOpacity = useTransform(
    scrollYProgress, 
    [0, 0.8], 
    [1, prefersReducedMotion || isMobile ? 0.8 : 0.4]
  );
  const contentScale = useTransform(
    scrollYProgress, 
    [0, 0.8], 
    [1, prefersReducedMotion || isMobile ? 0.98 : 0.95]
  );

  const services = [
    { icon: <Wrench size={24} />, title: 'Reparos Elétricos', desc: 'Instalações, consertos e manutenção profissional realizada com segurança e garantia total.' },
    { icon: <Droplet size={24} />, title: 'Serviços Hidráulicos', desc: 'Soluções completas para vazamentos, entupimentos e instalação de sistemas hidráulicos.' },
    { icon: <ShieldCheck size={24} />, title: 'Qualidade Garantida', desc: 'Atendimento rápido, materiais de primeira linha e garantia nos serviços realizados.' },
  ];

  const stats = [
    { icon: <Award size={20} />, value: '15+', label: 'Anos de Experiência' },
    { icon: <Heart size={20} />, value: '100+', label: 'Clientes Satisfeitos' },
    { icon: <Zap size={20} />, value: '24h', label: 'Atendimento Rápido' },
    { icon: <Star size={20} />, value: '5★', label: 'Avaliação' },
  ];

  // Verificar se é dispositivo móvel
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    ScrollTrigger.getAll().forEach((t) => t.kill());
    
    // Animação de parallax aprimorada - mais suave no mobile
    gsap.to('.hero-bg', {
      y: isMobile ? '20%' : '40%', // Movimento mais sutil no mobile
      ease: 'none',
      scrollTrigger: {
        trigger: heroElement,
        start: 'top top',
        end: 'bottom top',
        scrub: isMobile ? 0.5 : 1.2 // Scrub mais suave no mobile
      }
    });

    // Animação das partículas flutuantes - desabilitada no mobile para performance
    if (!isMobile) {
      gsap.to('.floating-particle', {
        y: '-100vh',
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: heroElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile, prefersReducedMotion]); 

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('benefits');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInVariants = prefersReducedMotion 
    ? getReducedMotionVariants(true) 
    : entranceVariants.fadeIn;

  const slideUpVariants = prefersReducedMotion 
    ? getReducedMotionVariants(true) 
    : entranceVariants.slideUp;

  const containerAnimVariants = prefersReducedMotion 
    ? getReducedMotionVariants(true) 
    : containerVariants;

  return (    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 sm:pt-20 md:pt-16"
    >
      {/* Background aprimorado com múltiplas camadas */}
      <motion.div
        className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574873934798-d7ef3dc98c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          y: backgroundY
        }}
      >
        {/* Overlay gradiente mais sofisticado */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/95 via-[var(--color-primary)]/80 to-[var(--color-accent)]/60"></div>
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/20 via-transparent to-[var(--color-accent)]/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent)]/10 to-transparent"></div>
        </div>
        {/* Partículas flutuantes - valores totalmente fixos para evitar hidratação */}
        {!prefersReducedMotion && !isMobile && (
          <div className="absolute inset-0 opacity-30">
            {PARTICLE_CONFIG.map((particle, i) => (
              <motion.div
                key={`particle-${i}`}
                className="floating-particle absolute rounded-full bg-white/20 blur-sm"
                initial={{ 
                  x: `${particle.x}%`, 
                  y: `${particle.y}%`,
                  scale: particle.scale,
                  opacity: particle.opacity
                }}
                animate={{
                  x: [`${particle.x}%`, `${particle.x + 5}%`, `${particle.x}%`],
                  y: [`${particle.y}%`, `${particle.y - 10}%`, `${particle.y}%`],
                  scale: [particle.scale, particle.scale * 1.1, particle.scale],
                  opacity: [particle.opacity, particle.opacity * 1.3, particle.opacity]
                }}
                transition={{
                  duration: 12 + i,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                style={{
                  width: `${particle.width}px`,
                  height: `${particle.height}px`,
                  transform: `translateX(${particle.x}%) translateY(${particle.y}%) scale(${particle.scale})`,
                  opacity: particle.opacity
                }}
              />
            ))}
          </div>
        )}

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </motion.div>      {/* Content Container */}
      <motion.div 
        ref={contentRef} 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 mb-20 sm:mb-16 lg:mb-8"
        style={
          // Aplicar transforms apenas em desktop para evitar problemas no mobile
          !isMobile && !prefersReducedMotion 
            ? { 
                opacity: contentOpacity,
                scale: contentScale
              }
            : {}
        }
      >        <div className="grid lg:grid-cols-2 gap-16 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">{/* Badge */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="mb-8 sm:mb-6 inline-flex items-center px-4 py-2 rounded-full 
                       bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20
                       backdrop-blur-sm"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-[var(--color-accent)]">
                <Star size={16} className="fill-[var(--color-accent)]" /> 
                <span>Serviços residenciais de confiança</span>
              </span>
            </motion.div>{/* Main Title */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--color-text)] mb-6 leading-tight"
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
            >
              <span className="block mb-2">Solução</span>
              <span className="block bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] 
                             text-transparent bg-clip-text">Completa</span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mt-2 text-[var(--color-text)]/90">
                para sua Casa
              </span>
            </motion.h1>            {/* Subtitle */}
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-[var(--color-text)]/80 mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0.1 : 0.4 }}
            >
              Reparos elétricos, hidráulicos e serviços gerais em 
              <span className="mx-1 font-semibold text-[var(--color-accent-light)]">Florianópolis</span> 
              com rapidez, qualidade e preço justo.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0.2 : 0.6 }}
            >
              <motion.button
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 
                         px-8 py-4 bg-[var(--color-accent)] text-white rounded-xl font-semibold text-lg
                         shadow-xl shadow-[var(--color-accent)]/30 transition-all duration-300
                         hover:shadow-2xl hover:shadow-[var(--color-accent)]/40"
                whileHover={applyVariant(prefersReducedMotion, {
                  scale: 1.05,
                  y: -2
                })}
                whileTap={applyVariant(prefersReducedMotion, { scale: 0.98 })}
              >
                {/* Shimmer effect */}
                {!prefersReducedMotion && (
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  />
                )}
                
                <MessageCircle size={22} />
                <span>Contato WhatsApp</span>
                
                {/* Pulse indicator */}
                <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-400 rounded-full">
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.button>
                <motion.div 
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl 
                         border-2 border-white/30 bg-white/10 backdrop-blur-sm text-[var(--color-text)]
                         hover:bg-white/20 transition-all duration-300"
                whileHover={applyVariant(prefersReducedMotion, { 
                  scale: 1.02,
                  borderColor: 'rgba(var(--color-accent-rgb), 0.5)'
                })}
              >
                <CreditCard size={20} />
                <span className="font-medium">
                  Até <span className="font-bold text-[var(--color-accent-light)]">12x</span> sem juros
                </span>
              </motion.div>
            </motion.div>            {/* Stats Row - Layout otimizado para mobile */}
            <motion.div 
              className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 max-w-sm sm:max-w-lg mx-auto lg:mx-0 mt-8"
              variants={containerAnimVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0.3 : 0.8 }}
            >
              {stats.map((stat, index) => (
                <StatCard 
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </motion.div>
          </div>

          {/* Right Column - Service Cards */}
          <motion.div 
            className="lg:pl-8"
            variants={containerAnimVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: prefersReducedMotion ? 0.4 : 1.0 }}
          >
            <div className="grid gap-4 sm:gap-6">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  desc={service.desc}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>      {/* Scroll Indicator - Corrigida centralização */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center cursor-pointer z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReducedMotion ? 0.5 : 1.5, duration: 0.8 }}
        onClick={scrollToNextSection}
      >
        <motion.div
          className="flex flex-col items-center group"
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 2.5 }}
        >
          <span className="text-[var(--color-text)]/70 text-xs sm:text-sm mb-2 sm:mb-3 group-hover:text-[var(--color-text)]/90 transition-colors">
            Saiba Mais
          </span>
          <motion.div 
            className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full 
                     bg-white/10 backdrop-blur-sm border border-white/20
                     group-hover:bg-white/20 group-hover:border-[var(--color-accent)]/50
                     transition-all duration-300"
            whileHover={applyVariant(prefersReducedMotion, { scale: 1.1 })}
            whileTap={applyVariant(prefersReducedMotion, { scale: 0.95 })}
          >
            <ArrowDown className="text-[var(--color-accent)] h-4 w-4 sm:h-5 sm:w-5" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t 
                   from-[var(--color-gray)] to-transparent pointer-events-none z-5" />

      {/* WhatsApp Modal */}
      <WhatsAppModal 
        isOpen={isWhatsAppModalOpen} 
        onClose={() => setIsWhatsAppModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;
