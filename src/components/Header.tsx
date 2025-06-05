'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wrench, MessageCircle, Phone } from 'lucide-react';
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
    // { name: 'Trabalhos', href: '#portfolio' },
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
    const base = "relative font-medium py-2 px-3 transition-all duration-300";
    return isActive
      ? `${base} text-[var(--color-accent)]`
      : `${base} text-[var(--color-primary)]/80 hover:text-[var(--color-accent)]`;
  };

  const mobileMenuVariants = {
    closed: { 
      x: '-100%', 
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };
  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed w-full z-50 backdrop-blur-md transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 shadow-lg shadow-black/5 py-2' 
            : 'bg-white/90 py-3'
        }`}
        aria-label="Navegação principal"
        style={{ willChange: 'transform' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}
            className="flex items-center gap-2 z-50 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-2 rounded-lg bg-[var(--color-accent)]/10 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-300">
              <Wrench className="h-5 w-5 md:h-6 md:w-6 text-[var(--color-accent)]" />
            </div>
            <span className="text-lg md:text-xl font-bold text-[var(--color-accent)]">FH Resolve</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                  className={getLinkClass(isActive)}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.a
              href="tel:+5548991919791"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-[var(--color-accent)] bg-[var(--color-accent)]/10 rounded-lg font-medium hover:bg-[var(--color-accent)]/20 transition-colors duration-300"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">Ligar</span>
            </motion.a>
            
            <motion.a
              href="https://wa.me/5548991919791"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden xl:inline">WhatsApp</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden z-50 p-2.5 rounded-lg bg-[var(--color-accent)] text-white shadow-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ willChange: 'transform' }}
          >
            <AnimatePresence initial={false} mode="wait">
              {isOpen ? (
                <motion.div 
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div 
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              ref={navRef}
              className="fixed inset-0 w-full min-h-screen lg:hidden z-40"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
                backdropFilter: 'blur(20px)',
                willChange: 'transform'
              }}
            >
              <div className="max-w-md mx-auto pt-20 pb-8 px-6 h-full overflow-y-auto">
                {/* Mobile Navigation Links */}
                <div className="space-y-2 mb-8">
                  {navLinks.map((link, i) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                        className={`block py-4 px-6 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-[var(--color-accent)] text-white shadow-md'
                            : 'text-[var(--color-text)]/80 hover:bg-white hover:text-[var(--color-accent)] hover:shadow-sm'
                        }`}
                        variants={menuItemVariants}
                        custom={i}
                        whileHover={{ x: 4 }}
                      >
                        <span className="text-lg font-medium">{link.name}</span>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Mobile CTA Buttons */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <a
                    href="https://wa.me/5548991919791"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[var(--color-accent)] text-white rounded-xl font-semibold text-lg shadow-lg"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Conversar no WhatsApp</span>
                  </a>
                  
                  <a
                    href="tel:+5548991919791"
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white border-2 border-[var(--color-accent)] text-[var(--color-accent)] rounded-xl font-semibold text-lg"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Ligar Agora</span>
                  </a>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  className="mt-8 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-center text-sm text-[var(--color-text)]/60">
                    Atendimento 24h em Florianópolis e região
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
