'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';


import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';

// Componentes carregados dinamicamente
const About = dynamic(() => import('./components/About'), { ssr: false });
const Benefits = dynamic(() => import('./components/Benefits'), { ssr: false });
const Portfolio = dynamic(() => import('./components/Portfolio'), { ssr: false });
const Testimonials = dynamic(() => import('./components/Testimonials'), { ssr: false });
const Contact = dynamic(() => import('./components/Contact'), { ssr: false });
const ServiceMap = dynamic(() => import('./components/ServiceMap'), { ssr: false });
const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

// Componente de carregamento
const SectionLoader = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="w-12 h-12 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin mb-4"></div>
    <p className="text-sm text-[var(--color-text)]/70">Carregando conteúdo...</p>
  </div>
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark'); // Tema escuro como padrão

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    // Define o tema escuro como padrão na inicialização
    const initialTheme = 'dark';
    setTheme(initialTheme);
    localStorage.setItem('theme', initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Inicializa GSAP apenas no cliente
    // NOTA: GSAP precisa ser importado aqui para evitar problemas de SSR
    const initGSAP = async () => {
      if (!loading) {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
        const { ScrollToPlugin } = await import('gsap/dist/ScrollToPlugin');
        
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        
        document.querySelectorAll('.animate-on-scroll').forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });
      }
    };
    
    initGSAP();
    
    return () => {
      // Limpeza do GSAP
      if (typeof window !== "undefined") {
        import('gsap/dist/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        });
      }
    };
  }, [loading]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loader" />
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col min-h-screen"
        >
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main className="flex-grow">
            <Hero />
            <Suspense fallback={<SectionLoader />}>
              <Benefits />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Portfolio />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Testimonials />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <ServiceMap />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={<div className="h-20" />}>
            <Footer />
          </Suspense>
          <motion.a
            href="https://wa.me/5548991919791"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-[var(--color-accent)] text-white p-3 rounded-full shadow-lg z-50 flex items-center justify-center"
            whileHover={{ scale: 1.1, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            aria-label="Entre em contato via WhatsApp"
          >
            <MessageCircle size={26} />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}