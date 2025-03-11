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
  Calculator, // Ícone para orçamentos
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Portfólio', href: '/dashboard/portfolio', icon: FileImage },
  { name: 'Avaliações', href: '/dashboard/reviews', icon: Star },
  { name: 'Orçamentos', href: '/dashboard/estimates', icon: Calculator }, // Nova opção de orçamentos
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

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // md: breakpoint
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <>
      {/* Botão de toggle para mobile */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        className="fixed z-50 bottom-4 right-4 md:hidden p-2 rounded-full bg-[var(--color-accent)] text-[var(--color-text-light)] shadow-[var(--shadow-md)]"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Overlay para mobile */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--color-dark)] md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={isDesktop ? 'open' : 'closed'}
        animate={isDesktop ? 'open' : isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed top-0 left-0 z-40 h-screen w-64 bg-[var(--color-card-bg)] text-[var(--color-card-text)] border-r border-[var(--color-neutral)]/30 shadow-[var(--shadow-lg)] md:sticky md:top-0 md:left-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center h-16 border-b border-[var(--color-neutral)]/30">
            <Link href="/dashboard" className="flex items-center gap-2">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <FileImage className="h-6 w-6 text-[var(--color-accent)]" />
              </motion.div>
              <span className="text-xl font-semibold">FH Resolve</span>
            </Link>
          </div>

          {/* Navegação */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center p-2 text-base font-normal rounded-lg transition-all ${
                        isActive
                          ? 'bg-[var(--color-accent)] text-[var(--color-text-light)]'
                          : 'hover:bg-[var(--color-neutral)]/20'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <item.icon
                          className={`w-5 h-5 ${
                            isActive ? 'text-[var(--color-text-light)]' : 'text-[var(--color-accent)]'
                          }`}
                        />
                      </motion.div>
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Botão de Sair */}
          <div className="p-4 border-t border-[var(--color-neutral)]/30">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center p-2 w-full text-base font-normal rounded-lg hover:bg-[rgba(255,0,0,0.1)] text-[var(--color-accent)] transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Sair</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}