// src/components/dashboard/Sidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileImage,
  Star,
  MessageSquare,
  FileText,
  Video,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  Calculator,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Portfólio', href: '/dashboard/portfolio', icon: FileImage },
  { name: 'Avaliações', href: '/dashboard/reviews', icon: Star },
  { name: 'Orçamentos', href: '/dashboard/estimates', icon: Calculator },
  { name: 'Pedidos', href: '/dashboard/quotes', icon: MessageSquare },
  { name: 'Blog', href: '/dashboard/blog', icon: FileText },
  { name: 'Vídeos', href: '/dashboard/videos', icon: Video },
  { name: 'Usuários', href: '/dashboard/users', icon: Users },
  { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Função para verificar se é desktop
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Variantes de animação para diferentes elementos
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1 
      } 
    },
    closed: { 
      x: '-100%', 
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      } 
    },
  };

  const itemVariants = {
    open: { 
      x: 0, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 300, damping: 24 } 
    },
    closed: { 
      x: -20, 
      opacity: 0, 
      transition: { type: 'spring', stiffness: 300, damping: 24 } 
    }
  };

  return (
    <>
      {/* Botão de toggle para mobile */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        className="fixed z-50 bottom-6 right-6 md:hidden p-3 rounded-full
                  bg-[var(--color-accent)] 
                  text-[var(--color-text-light)]
                  border border-[var(--color-neutral)]/10"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Overlay para mobile */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[var(--color-dark)]/50 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar principal */}
      <motion.div
        initial={isDesktop ? 'open' : 'closed'}
        animate={isDesktop ? 'open' : isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed top-0 left-0 z-40 h-screen w-72 md:w-64
                  bg-[var(--color-card-bg)]
                  text-[var(--color-card-text)] 
                  border-r border-[var(--color-neutral)]/20
                  md:sticky md:top-0 md:left-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center h-20 border-b border-[var(--color-neutral)]/10"
          >
            <Link href="/dashboard" className="flex items-center gap-3 px-2">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-accent)]"
              >
                <FileImage className="h-5 w-5 text-[var(--color-text-light)]" />
              </motion.div>
              <span className="text-xl font-bold text-adaptive">FH Resolve</span>
            </Link>
          </motion.div>

          {/* Navegação com estilo de seleção melhorado */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                
                return (
                  <motion.li 
                    key={item.name}
                    variants={itemVariants}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center p-3 text-base font-medium rounded-lg transition-all ${
                        isActive
                          ? 'bg-[var(--color-accent)] text-[var(--color-text-light)]'
                          : 'hover:bg-[var(--color-neutral)]/10 text-adaptive'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 ${
                        isActive ? 'text-[var(--color-text-light)]' : 'text-[var(--color-accent)]'
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="ml-3">{item.name}</span>
                      
                      {/* Indicador de item ativo */}
                      {isActive && (
                        <motion.div 
                          className="ml-auto w-1.5 h-5 rounded-full bg-[var(--color-text-light)]"
                          layoutId="activeIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Botão de Sair */}
          <motion.div 
            variants={itemVariants}
            className="p-4 mt-auto border-t border-[var(--color-neutral)]/10"
          >
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center p-3 w-full text-base font-medium rounded-lg 
                        bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="ml-3">Sair</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}