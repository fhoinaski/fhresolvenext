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
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.3 },
              rotate: { duration: 0.6 }
            }}
            className="text-[var(--color-accent)] text-2xl"
          >
            {icon}
          </motion.div>
        )}
      </div>
      <div className="flex-1">
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
    className="stat-card text-center p-4 sm:p-6 rounded-xl bg-white/10 backdrop-blur-md
               border border-white/20 hover:bg-white/15 transition-all duration-300"
    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      delay: prefersReducedMotion ? 0 : 0.1 * index, 
      duration: prefersReducedMotion ? 0.2 : 0.6,
      ease: "easeOut"
    }}
    whileHover={applyVariant(prefersReducedMotion, { scale: 1.05, y: -4 })}
  >
    <div className="mb-3 flex justify-center">
      <div className="h-12 w-12 flex items-center justify-center rounded-full
                    bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
        {icon}
      </div>
    </div>
    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-white/80">{label}</div>
  </motion.div>
);

const Hero: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 30]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 0.5]);

  const services = [
    { icon: <Wrench size={22} />, title: 'Reparos Elétricos', desc: 'Instalações, consertos e manutenção profissional realizada com segurança e garantia.' },
    { icon: <Droplet size={22} />, title: 'Serviços Hidráulicos', desc: 'Soluções completas para vazamentos, entupimentos e instalação de sistemas hidráulicos.' },
    { icon: <ShieldCheck size={22} />, title: 'Qualidade Garantida', desc: 'Atendimento rápido, materiais de primeira linha e garantia nos serviços realizados.' },
  ];

  // Verificar se é dispositivo móvel
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Verificar no carregamento inicial
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Se o usuário prefere movimento reduzido, não aplicamos as animações GSAP
    if (prefersReducedMotion) return;
    
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    // Limpar animações anteriores antes de configurar novas
    ScrollTrigger.getAll().forEach((t) => t.kill());
    
    // Animação de parallax mais suave para o fundo
    gsap.to('.hero-bg', {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: heroElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Removendo a animação que faz os cards sumirem
    // A animação do service-card agora será controlada apenas pelo Framer Motion

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

  // Determina quais variantes usar com base na preferência do usuário
  const fadeInVariants = prefersReducedMotion 
    ? getReducedMotionVariants(true) 
    : entranceVariants.fadeIn;

  const slideUpVariants = prefersReducedMotion 
    ? getReducedMotionVariants(true) 
    : entranceVariants.slideUp;

  const containerAnimVariants = prefersReducedMotion 
    ? getReducedMotionVariants(true) 
    : containerVariants;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20 sm:pt-20 md:pt-0"
    >
      <motion.div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574873934798-d7ef3dc98c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          y: backgroundY
        }}
      >
        {/* Overlay gradiente aprimorado */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/90 via-[var(--color-primary)]/75 to-[var(--color-primary)]/60"></div>
        
        {/* Efeito de partículas sutis - Apenas exibir quando não há preferência por movimento reduzido */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 opacity-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[var(--color-light)]/30 blur-xl"
                initial={{ 
                  x: Math.random() * 100, 
                  y: Math.random() * 100,
                  opacity: 0.2
                }}
                animate={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  top: `${Math.random() * 90}%`,
                  left: `${Math.random() * 90}%`,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      <motion.div 
        ref={contentRef} 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-0"
        style={{ opacity: contentOpacity }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-16">
          {/* Coluna de texto */}
          <div className="w-full lg:w-1/2 max-w-xl">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="mb-6 inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20"
            >
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[var(--color-accent)]">
                <Star size={14} className="fill-[var(--color-accent)]" /> 
                <span>Serviços residenciais de confiança</span>
              </span>
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-4 md:mb-6 leading-tight tracking-tight"
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
            >
              <span className="block mb-2">Solução Completa</span>
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-transparent bg-clip-text">para sua Casa</span>
            </motion.h1>

            <motion.p 
              className="text-lg sm:text-xl leading-relaxed text-[var(--color-text)]/80 mb-6 md:mb-8 max-w-lg"
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0.1 : 0.4 }}
            >
              Reparos elétricos, hidráulicos e serviços gerais em 
              <span className="mx-1 font-medium">Florianópolis</span> 
              com rapidez, qualidade e preço justo.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-3 sm:gap-4"
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0.2 : 0.6 }}
            >              <motion.a
                href="https://wa.me/5548991919791"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-4 bg-[var(--color-accent)] text-white rounded-md font-medium transition-all shadow-lg shadow-[var(--color-accent)]/20 group"
                whileHover={applyVariant(prefersReducedMotion, buttonVariants.hover)}
                whileTap={applyVariant(prefersReducedMotion, buttonVariants.tap)}
              >
                {/* Efeito de brilho no botão - Só exibe se não preferir movimento reduzido */}
                {!prefersReducedMotion && (
                  <motion.span 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                )}
                
                <MessageCircle size={18} className="text-white" />
                <span className="font-semibold text-sm sm:text-base">Falar com Fernando</span>
                {!prefersReducedMotion && (
                  <motion.span 
                    className="absolute -right-4 -top-4 bg-white/20 rounded-full text-[10px] font-bold px-2 py-1 rotate-12"
                    animate={{ scale: [1, 1.1, 1], rotate: [12, 8, 12] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    GRÁTIS
                  </motion.span>
                )}
              </motion.a>
              
              <motion.div 
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-md border border-[var(--color-neutral)]/30 bg-white/5 backdrop-blur-sm text-[var(--color-text)]"
                whileHover={applyVariant(prefersReducedMotion, { 
                  backgroundColor: 'rgba(var(--color-neutral-rgb), 0.05)',
                  borderColor: 'rgba(var(--color-accent-rgb), 0.3)',
                  y: -2
                })}
                whileTap={applyVariant(prefersReducedMotion, { y: 0 })}
              >
                <CreditCard size={16} className="text-[var(--color-accent)]" />
                <span className="text-xs sm:text-sm">
                  Até <span className="font-bold text-[var(--color-accent)]">12x</span> sem juros
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Container dos cards - Melhorias para responsividade e visibilidade */}
          <motion.div 
            className="w-full lg:w-1/2 mt-8 lg:mt-0"
            variants={containerAnimVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid gap-3 sm:gap-4 md:grid-cols-1">
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
      </motion.div>

      {/* Separador Visual */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--color-gray)] to-transparent dark:from-[var(--color-primary)] z-5" />

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0.2 : 1.2, duration: prefersReducedMotion ? 0.2 : 0.8 }}
        aria-label="Rolar para a seção Sobre"
        onClick={scrollToNextSection}
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <span className="text-[var(--color-text)]/60 text-xs sm:text-sm mb-2">Saiba Mais</span>
          <motion.div 
            className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
            whileHover={applyVariant(prefersReducedMotion, iconButtonVariants.hover)}
            whileTap={applyVariant(prefersReducedMotion, iconButtonVariants.tap)}
          >
            <ArrowDown className="text-[var(--color-accent)] h-4 w-4 sm:h-5 sm:w-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;