import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Wrench } from 'lucide-react';
import 'animate.css';

// Função para gerar valores determinísticos baseados em seed
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const LoadingScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    // Impedir scroll durante a animação
    document.documentElement.classList.add('no-scroll');
    
    // Simulação de progresso de carregamento com incrementos fixos
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 8; // Incremento fixo em vez de random
      });
    }, 200);
    
    // Referências aos elementos DOM
    const container = containerRef.current;
    const logo = logoRef.current;
    
    if (!container || !logo) return;
    
    // Timeline com contexto GSAP
    const ctx = gsap.context(() => {
      // Timeline principal para a animação de loading
      const tl = gsap.timeline({
        onComplete: () => {
          // Quando a animação inicial terminar, permitir que o AnimatePresence faça a transição
          if (loadingProgress >= 100) {
            setTimeout(() => {
              setIsAnimationComplete(true);
            }, 500);
          }
        }
      });
      
      // Configuração inicial da animação
      gsap.set('.logo-icon', { scale: 0, opacity: 0 });
      gsap.set('.logo-text', { y: 30, opacity: 0 });
      gsap.set('.loading-message', { opacity: 0, y: 20 });
      gsap.set('.loading-particles', { opacity: 0 });
      
      // Anima o logo e os elementos
      tl.to('.logo-icon', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      })
      .to('.logo-text', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      .to('.loading-message', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.2')
      .to('.loading-particles', {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1
      }, '-=0.3')
      .to('.tool-icon', {
        rotation: 360,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1
      }, '-=0.8');
    }, container);
    
    // Cleanup
    return () => {
      ctx.revert();
      clearInterval(progressInterval);
      document.documentElement.classList.remove('no-scroll');
    };
  }, []);
  
  useEffect(() => {
    if (loadingProgress >= 100) {
      const timer = setTimeout(() => {
        setIsAnimationComplete(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress]);
  
  const getAnimationClass = (index: number) => {
    const animations = [
      'animate__bounce',
      'animate__pulse',
      'animate__rubberBand',
      'animate__flip',
      'animate__swing',
      'animate__tada',
      'animate__jello'
    ];
    return animations[index % animations.length];
  };
  
  return (
    <motion.div
      ref={containerRef}
      className="loading-container fixed inset-0 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/95 flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { 
          duration: 0.8,
          ease: "easeInOut"
        }
      }}
    >
      <div 
        ref={logoRef} 
        className="loading-content relative z-10 flex flex-col items-center animate__animated animate__zoomIn"
      >
        <motion.div 
          className="mb-8 flex flex-col items-center"
          exit={{ 
            scale: 1.2, 
            opacity: 0,
            transition: { duration: 0.5 } 
          }}
        >
          <div className="logo-icon relative bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 mb-6 overflow-hidden animate__animated animate__rubberBand animate__delay-1s">
            {/* Efeito 3D no ícone */}
            <div className="absolute inset-0 bg-[var(--color-accent)]/20 rounded-xl animate__animated animate__pulse animate__infinite"></div>
            <Wrench className="h-12 w-12 text-[var(--color-accent)] tool-icon relative z-10" />
          </div>
          
          <div className="logo-text flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white animate__animated animate__fadeInUp">
              FH<span className="text-[var(--color-accent)] animate__animated animate__flash animate__delay-2s">Resolve</span>
            </h1>
            <p className="text-white/60 text-sm mt-1 animate__animated animate__fadeIn animate__delay-1s">Manutenção Residencial</p>
          </div>
        </motion.div>
        
        <div className="loading-message text-white/80 text-sm font-medium mb-8 flex items-center gap-2 animate__animated animate__fadeIn animate__delay-1s">
          <span className="inline-block h-2 w-2 bg-[var(--color-accent)] rounded-full animate__animated animate__pulse animate__infinite"></span>
          <span>Carregando soluções para sua casa...</span>
        </div>
        
        <motion.div
          className="w-64"
          exit={{ 
            width: 0,
            opacity: 0,
            transition: { duration: 0.3 } 
          }}
        >
          <div className="loading-bar w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="loading-bar-progress h-full bg-gradient-to-r from-[var(--color-accent)]/80 to-[var(--color-accent)] animate__animated animate__fadeIn"
              style={{ width: `${Math.min(loadingProgress, 100)}%`, transition: 'width 0.3s ease-out' }}
            ></div>
          </div>
        </motion.div>
        
        {/* Mensagem de dica abaixo da barra de progresso */}
        <p className="text-white/40 text-xs mt-4 max-w-xs text-center animate__animated animate__fadeIn animate__delay-2s">
          Oferecemos serviços profissionais de manutenção residencial em Florianópolis e região
        </p>
        
        {/* Contador de progresso */}
        <div className="mt-2 text-white/70 text-sm animate__animated animate__fadeIn">
          {Math.min(Math.floor(loadingProgress), 100)}%
        </div>
      </div>

      {/* Elementos decorativos - partículas flutuantes */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => {
            const seed = i + 1;
            const randomX = seededRandom(seed) * 100 - 50;
            const randomY = seededRandom(seed + 100) * 100 - 50;
            const size = seededRandom(seed + 200) * 100 + 30;
            const topPos = seededRandom(seed + 300) * 100;
            const leftPos = seededRandom(seed + 400) * 100;
            const animDelay = seededRandom(seed + 500) * 5;
            const animDuration = seededRandom(seed + 600) * 5 + 3;
            
            return (
              <motion.div 
                key={i}
                className={`loading-particles absolute rounded-full bg-[var(--color-accent)]/5 animate__animated ${getAnimationClass(i)} animate__infinite animate__slower`}
                initial={{ 
                  x: randomX, 
                  y: randomY,
                  opacity: 0
                }}
                animate={{
                  x: randomX + 20,
                  y: randomY + 20,
                  opacity: 0.5
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  transition: { duration: 0.5 }
                }}
                transition={{
                  duration: 3 + (seed % 3),
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${topPos}%`,
                  left: `${leftPos}%`,
                  animationDelay: `${animDelay}s`,
                  animationDuration: `${animDuration}s`
                }}
              />
            );
          })}
        </div>
      )}
        
        {/* Elementos de ferramentas estilizados no fundo com animações */}
        <motion.div 
          className="absolute -bottom-20 -right-20 w-64 h-64 opacity-10 animate__animated animate__rotateIn animate__slower animate__infinite"
          exit={{ 
            opacity: 0, 
            rotate: 90,
            transition: { duration: 0.5 }
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
            <path d="M35.7,3.7 C34.4,4.9 33.7,6.6 33.7,8.3 L33.7,15.5 C33.7,19.1 36.6,22 40.2,22 C43.8,22 46.7,19.1 46.7,15.5 L46.7,8.3 C46.7,6.6 46,4.9 44.7,3.7 C42.2,1.2 38.2,1.2 35.7,3.7 L35.7,3.7 Z M40.2,18 C38.8,18 37.7,16.9 37.7,15.5 L37.7,8.3 C37.7,7.8 37.9,7.3 38.3,6.9 C39.1,6.1 40.4,6.1 41.2,6.9 C41.6,7.3 41.8,7.8 41.8,8.3 L41.8,15.5 C41.7,16.9 41.1,18 40.2,18 Z" />
            <path d="M85.4,70.8 L79.3,64.7 C77,62.4 73.1,62.4 70.8,64.7 L66.1,69.4 L30.9,34.2 L35.6,29.5 C37.9,27.2 37.9,23.3 35.6,21 L29.5,14.9 C27.2,12.6 23.3,12.6 21,14.9 L2.6,33.3 C0.3,35.6 0.3,39.5 2.6,41.8 L8.7,47.9 C9.8,49 11.3,49.6 12.9,49.6 C14.5,49.6 16,49 17.1,47.9 L21.8,43.2 L57,78.4 L52.3,83.1 C50,85.4 50,89.3 52.3,91.6 L58.4,97.7 C59.5,98.8 61,99.4 62.6,99.4 C64.2,99.4 65.7,98.8 66.8,97.7 L85.2,79.3 C87.7,77.1 87.7,73.2 85.4,70.8 L85.4,70.8 Z M14.1,44.9 C13.9,45.1 13.4,45.1 13.2,44.9 L7.1,38.8 C6.9,36.6 6.9,36.1 7.1,35.9 L25.5,17.5 C25.7,17.3 26.2,17.3 26.4,17.5 L32.5,23.6 C32.7,23.8 32.7,24.3 32.5,24.5 L14.1,44.9 Z M82.4,76.3 L64,94.7 C63.8,94.9 63.3,94.9 63.1,94.7 L57,88.6 C56.8,88.4 56.8,87.9 57,87.7 L77.3,67.4 C77.5,67.2 78,67.2 78.2,67.4 L84.3,73.5 C84.5,73.7 84.5,74.2 84.3,74.4 L82.4,76.3 Z" />
          </svg>
        </motion.div>
        
        <motion.div 
          className="absolute -top-10 -left-10 w-48 h-48 opacity-10 animate__animated animate__swing animate__infinite animate__slower"
          exit={{
            opacity: 0,
            x: -50,
            transition: { duration: 0.5 }
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
            <path d="M97.5,43.8 L92.5,43.8 L92.5,33.9 C92.5,32.3 91.2,31 89.6,31 L68.9,31 C67.3,31 66,32.3 66,33.9 L66,43.8 L61.1,43.8 L61.1,24 C61.1,22.4 59.8,21.1 58.2,21.1 L37.5,21.1 C35.9,21.1 34.6,22.4 34.6,24 L34.6,43.8 L29.6,43.8 L29.6,48.8 C29.6,50.4 30.9,51.7 32.5,51.7 L97.5,51.7 C99.1,51.7 100.4,50.4 100.4,48.8 L100.4,46.7 C100.4,45.1 99.1,43.8 97.5,43.8 Z" />
            <path d="M28.6,56.7 L28.6,76 C28.6,77.6 27.3,78.9 25.7,78.9 L5,78.9 C3.4,78.9 2.1,77.6 2.1,76 L2.1,56.7 C2.1,55.1 3.4,53.8 5,53.8 L25.7,53.8 C27.3,53.8 28.6,55.1 28.6,56.7 Z M25.7,73.9 L25.7,58.8 L5,58.8 L5,73.9 L25.7,73.9 Z" />
            <path d="M89.6,83.9 L68.9,83.9 C67.3,83.9 66,82.6 66,81 L66,61.7 C66,60.1 67.3,58.8 68.9,58.8 L89.6,58.8 C91.2,58.8 92.5,60.1 92.5,61.7 L92.5,81 C92.5,82.6 91.2,83.9 89.6,83.9 Z M68.9,63.8 L68.9,78.9 L89.6,78.9 L89.6,63.8 L68.9,63.8 Z" />
            <path d="M58.2,64.2 L37.5,64.2 C35.9,64.2 34.6,62.9 34.6,61.3 L34.6,56.3 L29.6,56.3 C28,56.3 26.7,55 26.7,53.4 C26.7,51.8 28,50.5 29.6,50.5 L34.6,50.5 L34.6,48.3 C34.6,46.7 35.9,45.4 37.5,45.4 L58.2,45.4 C59.8,45.4 61.1,46.7 61.1,48.3 L61.1,50.5 L66,50.5 C67.6,50.5 68.9,51.8 68.9,53.4 C68.9,55 67.6,56.3 66,56.3 L61.1,56.3 L61.1,61.3 C61.1,62.9 59.7,64.2 58.2,64.2 Z" />
          </svg>
        </motion.div>
        
        {/* Novo elemento de bolhas flutuantes */}
        {isMounted && [...Array(8)].map((_, i) => {
          const seed = i + 1000;
          const size = seededRandom(seed) * 40 + 15;
          const leftPos = seededRandom(seed + 100) * 100;
          const animDuration = seededRandom(seed + 200) * 10 + 5;
          const animDelay = seededRandom(seed + 300) * 5;
          
          return (
            <motion.div
              key={`bubble-${i}`}
              className="absolute rounded-full bg-white/5 backdrop-blur-sm animate__animated animate__fadeInUp animate__infinite"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                bottom: `-50px`,
                left: `${leftPos}%`,
                animationDuration: `${animDuration}s`,
                animationDelay: `${animDelay}s`
              }}
              exit={{
                opacity: 0,
                y: -100,
                transition: { duration: 0.5 }
              }}
            />
          );
        })}
    </motion.div>
  );
};

export default LoadingScreen;