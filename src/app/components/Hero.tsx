import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MessageCircle, CreditCard, ArrowDown, Wrench, Droplet, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, desc, index }) => (
  <motion.div
    className="service-card relative overflow-hidden p-5 rounded-lg 
               bg-white/10 dark:bg-white/5 border border-[var(--color-neutral)]/20 
               dark:border-white/10 transition-all duration-300"
    style={{
      backdropFilter: "blur(8px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index, duration: 0.5 }}
    whileHover={{ 
      y: -5, 
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
      borderColor: "rgba(var(--color-accent-rgb), 0.3)"
    }}
  >
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 flex items-center justify-center rounded-lg 
                    bg-[var(--color-accent)]/10 text-[var(--color-accent)] 
                    flex-shrink-0 shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1 text-[var(--color-text)]">{title}</h3>
        <p className="text-sm text-[var(--color-text)]/80">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const services = [
    { icon: <Wrench size={22} />, title: 'Reparos Elétricos', desc: 'Instalações e consertos profissionais com garantia.' },
    { icon: <Droplet size={22} />, title: 'Serviços Hidráulicos', desc: 'Soluções para vazamentos e instalações de qualidade.' },
    { icon: <ShieldCheck size={22} />, title: 'Qualidade Garantida', desc: 'Atendimento rápido e serviço de excelência.' },
  ];

  // Verificar se é dispositivo móvel
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    handleResize(); // Verificar no carregamento inicial
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    // Limpar animações anteriores antes de configurar novas
    ScrollTrigger.getAll().forEach((t) => t.kill());
    
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

    // Apenas aplicar esta animação se não estiver em modo móvel
    if (!isMobile) {
      gsap.from('.service-card', {
        y: 20,
        opacity: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]); // Adicionar isMobile como dependência

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('benefits');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-28 sm:pt-20 md:pt-0"
    >
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574873934798-d7ef3dc98c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/90 via-[var(--color-primary)]/80 to-[var(--color-primary)]/70"></div>
      </div>

      <div ref={contentRef} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 max-w-xl">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.8 }}
              className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20"
            >
              <span className="text-sm font-medium text-[var(--color-accent)]">Serviços Profissionais</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="block">Solução Completa</span>
              <span className="text-[var(--color-accent)]">para sua Casa</span>
            </motion.h1>

            <motion.p 
              className="text-lg text-[var(--color-text)]/80 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Reparos elétricos, hidráulicos e serviços gerais em Florianópolis com rapidez, qualidade e preço justo.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                href="https://wa.me/5548991919791"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--color-accent)] text-[var(--color-text-light)] rounded-md font-medium hover:bg-[var(--color-accent-dark)] transition-all shadow-md"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={18} />
                <span>Orçamento em 1 Hora</span>
              </motion.a>
              
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-[var(--color-neutral)]/20 bg-white/5 backdrop-blur-sm text-[var(--color-text)]"
                whileHover={{ 
                  backgroundColor: 'rgba(var(--color-neutral-rgb), 0.05)',
                  borderColor: 'rgba(var(--color-accent-rgb), 0.2)'
                }}
              >
                <CreditCard size={18} className="text-[var(--color-accent)]" />
                <span className="text-sm">
                  Até <strong>12x</strong> sem juros
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Contentor dos cards com maior visibilidade no mobile */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'space-y-4'}`}>
              {services.map((service, index) => (
                <ServiceCard 
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  desc={service.desc}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Separador Visual */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--color-gray)] to-transparent dark:from-[var(--color-primary)] z-5" />

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-label="Rolar para a seção Sobre"
        onClick={scrollToNextSection}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <span className="text-[var(--color-text)]/60 text-sm mb-2">Saiba Mais</span>
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <ArrowDown className="text-[var(--color-accent)] h-5 w-5" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;