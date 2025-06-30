'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import axios from '@/lib/axios';
import { Providers } from './providers';

import Hero from '../components/Hero';
import Header from '../components/Header';
import Benefits from '@/components/Benefits';
import WhatsAppModal from '@/components/WhatsAppModal';


// Componente de carregamento
const SectionLoader = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="w-12 h-12 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin mb-4"></div>
    <p className="text-sm text-[var(--color-text)]/70">Carregando conteúdo...</p>
  </div>
);

// Componentes carregados dinamicamente
const About = dynamic(() => import('../components/About'), { 
  ssr: false,
  loading: () => <SectionLoader />
});
const Portfolio = dynamic(() => import('../components/Portfolio'), { 
  ssr: false,
  loading: () => <SectionLoader />
});
const Testimonials = dynamic(() => import('../components/Testimonials_new'), { 
  ssr: false,
  loading: () => <SectionLoader />
});
const Contact = dynamic(() => import('../components/Contact'), { 
  ssr: false,
  loading: () => <SectionLoader />
});
const ServiceMap = dynamic(() => import('../components/ServiceMap'), { 
  ssr: false,
  loading: () => <SectionLoader />
});
const Footer = dynamic(() => import('../components/Footer_new'), { 
  ssr: false,
  loading: () => <SectionLoader />
});

export default function Home() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/settings', {
          timeout: 5000
        }).catch(error => {
          console.error('Erro na requisição de settings:', error);
          return { data: {} };
        });
        
        if (response.data?.maintenanceMode !== undefined) {
          setMaintenanceMode(response.data.maintenanceMode);
        }
      } catch (error) {
        console.error('Erro ao buscar configurações:', error);
      }
    };
    fetchSettings();
  }, []);

  if (maintenanceMode) {
    return (
      <Providers>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
          <div className="text-center max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-accent)]">
              Site em Manutenção
            </h1>
            <p className="text-[var(--color-text)]/80 mb-8">
              Estamos realizando alguns ajustes para melhorar sua experiência. 
              Voltaremos em breve.
            </p>
            <div className="w-full h-2 bg-[var(--color-neutral)]/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[var(--color-accent)]"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <p className="mt-8 text-sm text-[var(--color-text)]/60">
              Para solicitações urgentes, entre em contato pelo WhatsApp
            </p>
            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-all shadow-sm"
            >
              <MessageCircle size={18} />
              Contato via WhatsApp
            </button>
          </div>
        </div>
      </Providers>
    );
  }

  return (
    <Providers>
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.8,
          ease: "easeInOut" 
        }}
        className="flex flex-col min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Header />
        </motion.div>        <main className="flex-grow">
          <Hero />
          <Benefits />
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          {/* <Suspense fallback={<SectionLoader />}>
            <Portfolio />
          </Suspense> */}
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            {/* <ServiceMap /> */}
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-20" />}>
          <Footer />
        </Suspense>
        {/* <motion.a
          href="https://wa.me/5548991919791"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-[var(--color-accent)] text-white p-3 rounded-full shadow-lg z-50 flex items-center justify-center"
          whileHover={{ scale: 1.1, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          aria-label="Entre em contato via WhatsApp"
        >
          <MessageCircle size={26} />
        </motion.a> */}

        {/* WhatsApp Modal */}
        <WhatsAppModal 
          isOpen={isWhatsAppModalOpen} 
          onClose={() => setIsWhatsAppModalOpen(false)} 
        />
      </motion.div>
    </Providers>
  );
}