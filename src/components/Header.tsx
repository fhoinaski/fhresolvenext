'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wrench, MessageCircle } from 'lucide-react';
import { useFeedback } from '../context/FeedbackContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const { showToast } = useFeedback();

  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Serviços', href: '#benefits' },
    { name: 'Sobre', href: '#about' },
    { name: 'Trabalhos', href: '#portfolio' },
    { name: 'Contato', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => link.href.slice(1));

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 0) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    if (isOpen) setIsOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 20;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const getLinkClass = (isActive: boolean) => {
    const base = "relative font-medium py-2 px-1 transition-all";
    return isActive
      ? `${base} text-[var(--color-accent)]`
      : `${base} text-[var(--color-primary)]/80 hover:text-[var(--color-accent)]`;
  };

  const mobileMenuVariants = {
    closed: { x: '-100%', opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed w-full z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200/50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-3'
        }`}
        aria-label="Navegação principal"
        style={{ willChange: 'transform' }}
      >
        <div className="container flex items-center justify-between">
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}
            className="flex items-center gap-2 z-50"
            whileHover={{ scale: 1.02, x: 3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Wrench className="h-6 w-6 text-[var(--color-accent)]" />
            <span className="text-lg font-bold text-[var(--color-accent)]">FH Resolve</span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                  className={getLinkClass(isActive)}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--color-accent)] rounded-full"
                      layoutId="underline"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          <motion.button
            className="md:hidden z-50 p-2 rounded-md bg-[var(--color-accent)] text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ willChange: 'transform' }}
          >
            <AnimatePresence initial={false} mode="wait">
              {isOpen ? (
                <motion.div key="close">
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu">
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                ref={navRef}
                className="fixed inset-0 w-full min-h-screen md:hidden z-40 overflow-y-auto"
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(10px)',
                  willChange: 'transform'
                }}
              >
                <div className="container pt-20 pb-8 px-4 flex flex-col gap-4">
                  {navLinks.map(link => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                        className={`block py-3 px-4 rounded-lg ${
                          isActive
                            ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold'
                            : 'text-[var(--color-text)]/80 hover:bg-[var(--color-neutral)]/10'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    );
                  })}

                  <a
                    href="https://wa.me/5548991919791"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[var(--color-accent)] text-white rounded-lg font-medium shadow-md"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Fale Conosco no WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* 🔥 Botão WhatsApp flutuante no Mobile */}
      <a
        href="https://wa.me/5548991919791"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-6 right-6 z-50 bg-[var(--color-accent)] text-white p-4 rounded-full shadow-lg"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </>
  );
};

export default Header;
