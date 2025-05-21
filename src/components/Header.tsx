'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Menu, X, Wrench, MessageCircle } from 'lucide-react';
import { useFeedback } from '../context/FeedbackContext';
import { useSiteConfig } from '@/context/SiteConfigContext';

interface CommonContextType {
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

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
  }, [navLinks]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
      }, 300);
      return () => clearTimeout(timer);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 100);
    }
    
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      
      requestAnimationFrame(() => {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      });
    }
  };

  const getHeaderBackground = () => {
    const baseBg = 'bg-[var(--color-light)]';
    if (isOpen) {
      return `${baseBg}/95 backdrop-blur-md`;
    }
    if (scrolled) {
      return `${baseBg}/90 backdrop-blur-md shadow-sm`;
    }
    return `${baseBg}/80 backdrop-blur-sm`;
  };

  const getLinkClass = (isActive: boolean) => {
    const baseClass = "relative font-medium py-2 px-1 transition-all";
    
    if (isActive) {
      return `${baseClass} text-[var(--color-accent)]`;
    }
    
    return `${baseClass} text-[var(--color-primary)]/80 hover:text-[var(--color-accent)]`;
  };

  const mobileMenuVariants = {
    closed: { 
      x: "-100%",
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const mobileNavItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-3'
      } ${getHeaderBackground()}`}
      aria-label="Navegação principal"
    >
      <div className="container flex items-center justify-between">
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#hero');
          }}
          className="flex items-center gap-2 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02, x: 3 }}
          whileTap={{ scale: 0.98 }}
        >
          <Wrench className="h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
          <span className="text-lg font-bold text-[var(--color-accent)] dark:text-[var(--color-text)]">FH Resolve</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Menu de navegação desktop">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={getLinkClass(isActive)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--color-accent)] rounded-full"
                    layoutId="activeNavIndicator"
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30 
                    }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            className="md:hidden z-50 p-2 rounded-md bg-[var(--color-accent)] text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence initial={false} mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

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
              }}
            >
              <div className="container pt-20 pb-8 px-4 min-h-screen flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }}
                        className={`block py-3 px-4 text-base font-medium rounded-lg transition-all ${
                          isActive
                            ? `bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium border-l-2 border-[var(--color-accent)]`
                            : `text-[var(--color-text)]/80 dark:text-[var(--color-text)]/80 hover:bg-[var(--color-neutral)]/10`
                        }`}
                        variants={mobileNavItemVariants}
                        whileHover={{ x: 5, backgroundColor: isActive ? undefined : 'rgba(var(--color-accent-rgb), 0.05)' }}
                        whileTap={{ x: 0, scale: 0.98 }}
                      >
                        {link.name}
                      </motion.a>
                    );
                  })}
                </div>

                <motion.div 
                  className="mt-6 pt-4 border-t border-[var(--color-neutral)]/20"
                  variants={mobileNavItemVariants}
                >
                  <motion.a
                    href="https://wa.me/5548991919791"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[var(--color-accent)] text-white rounded-lg font-medium shadow-md"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97, y: 0 }}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Fale Conosco via WhatsApp</span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;