// src/components/dashboard/Topbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Bell, User, Calculator } from 'lucide-react';
import Link from 'next/link';
import { useFeedback } from '@/context/FeedbackContext';

export function Topbar() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; message: string; read: boolean }[]>([
    { id: '1', message: 'Novo pedido de orçamento recebido', read: false },
    { id: '2', message: 'Novo comentário no portfólio', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { showToast } = useFeedback();

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/login' });
      showToast('Sessão encerrada com sucesso', 'success');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      showToast('Erro ao encerrar sessão', 'error');
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showToast('Todas as notificações marcadas como lidas', 'success');
  };

  // Se não estiver montado, renderize um placeholder
  if (!mounted) {
    return (
      <header className="sticky top-0 z-30 bg-[var(--color-card-bg)] text-[var(--color-card-text)] border-b border-[var(--color-neutral)]/30 shadow-md py-3 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold hidden md:block">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8"></div>
            <div className="w-8 h-8"></div>
            <div className="w-8 h-8"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 bg-[var(--color-card-bg)] text-[var(--color-card-text)] border-b border-[var(--color-neutral)]/30 shadow-md"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold hidden md:block">Admin Dashboard</h1>

        <div className="flex items-center space-x-4">
          {/* Botão de Tema */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-[var(--color-neutral)]/20 hover:bg-[var(--color-accent)]/20 transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-[var(--color-accent)]" />
            ) : (
              <Moon size={20} className="text-[var(--color-accent)]" />
            )}
          </motion.button>

          {/* Notificações */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-[var(--color-neutral)]/20 hover:bg-[var(--color-accent)]/20 transition-colors relative"
              aria-label="Notificações"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} className="text-[var(--color-accent)]" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 mt-2 w-72 bg-[var(--color-card-bg)] text-[var(--color-card-text)] rounded-md shadow-lg z-10 border border-[var(--color-neutral)]/30"
                >
                  <div className="p-2 border-b border-[var(--color-neutral)]/30 flex justify-between items-center">
                    <h3 className="font-medium">Notificações</h3>
                    {notifications.some(n => !n.read) && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs text-[var(--color-accent)] hover:underline"
                      >
                        Marcar todas como lidas
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div>
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-3 border-b border-[var(--color-neutral)]/10 hover:bg-[var(--color-neutral)]/10 ${
                              !notification.read ? 'bg-[var(--color-accent)]/5' : ''
                            }`}
                          >
                            <p className="text-sm mb-1">{notification.message}</p>
                            <p className="text-xs text-[var(--color-text)]/60">Agora mesmo</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-[var(--color-text)]/60 text-sm">
                        Nenhuma notificação
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Menu do Usuário */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <span className="text-sm font-medium hidden md:block">
                {session?.user?.name || 'Usuário'}
              </span>
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 mt-2 w-48 bg-[var(--color-card-bg)] text-[var(--color-card-text)] rounded-md shadow-lg py-1 z-10 border border-[var(--color-neutral)]/30"
                >
                  <div className="px-4 py-2 border-b border-[var(--color-neutral)]/20">
                    <p className="text-sm font-medium">{session?.user?.name}</p>
                    <p className="text-xs text-[var(--color-text)]/60">{session?.user?.email}</p>
                  </div>
                  <Link
                    href="/dashboard/estimates/new"
                    className="px-4 py-2 text-sm hover:bg-[var(--color-neutral)]/20 transition-colors flex items-center gap-1.5"
                  >
                    <Calculator size={14} className="text-[var(--color-accent)]" />
                    Novo Orçamento
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm hover:bg-[var(--color-neutral)]/20 transition-colors"
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm hover:bg-[var(--color-neutral)]/20 transition-colors"
                  >
                    Configurações
                  </Link>
                  <hr className="my-1 border-[var(--color-neutral)]/30" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-red-500/20 text-red-500 transition-colors"
                  >
                    Sair
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}