import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Wrench, MessageCircle } from 'lucide-react';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

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
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  const getHeaderBackground = () => {
    if (isOpen) {
      return theme === 'light'
        ? 'bg-white/95 backdrop-blur-md'
        : 'bg-[var(--color-primary)]/95 backdrop-blur-md';
    }

    if (scrolled) {
      return theme === 'light'
        ? 'bg-white/90 backdrop-blur-md shadow-sm'
        : 'bg-[var(--color-primary)]/90 backdrop-blur-md shadow-sm';
    }

    return theme === 'light'
      ? 'bg-white/80 backdrop-blur-sm'
      : 'bg-[var(--color-primary)]/80 backdrop-blur-sm';
  };

  const getLinkClass = (isActive: boolean) => {
    const baseClass = "relative font-medium py-2 px-1 transition-colors";
    
    if (isActive) {
      return `${baseClass} text-[var(--color-accent)]`;
    }
    
    return theme === 'light' 
      ? `${baseClass} text-[var(--color-primary)]/80 hover:text-[var(--color-accent)]` 
      : `${baseClass} text-[var(--color-text)]/80 hover:text-[var(--color-accent)]`;
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
          whileHover={{ scale: 1.02 }}
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
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--color-neutral)]/5 hover:bg-[var(--color-accent)]/10 transition-colors z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>

          <motion.a
            href="https://wa.me/5548991919791"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-all shadow-sm z-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Contato via WhatsApp"
          >
            <MessageCircle size={16} aria-hidden="true" />
            <span className="text-sm font-medium">Orçamento Grátis</span>
          </motion.a>

          <motion.button
            className="md:hidden z-50 p-2 rounded-md bg-[var(--color-accent)] text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              ref={navRef}
              className="fixed inset-0 w-full min-h-screen md:hidden z-40 overflow-y-auto"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(17, 24, 39, 0.98)',
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
                        className={`block py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                          isActive
                            ? `bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium border-l-2 border-[var(--color-accent)]`
                            : `text-[var(--color-text)]/80 dark:text-[var(--color-text)]/80 hover:bg-[var(--color-neutral)]/10`
                        }`}
                        whileHover={{ x: 3 }}
                        whileTap={{ x: 0 }}
                      >
                        {link.name}
                      </motion.a>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-neutral)]/20">
                  <a
                    href="https://wa.me/5548991919791"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white py-3 px-4 rounded-lg font-medium"
                  >
                    <MessageCircle size={18} />
                    Fale pelo WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;