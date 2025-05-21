/**
 * src/lib/motion-variants.ts
 * 
 * Este arquivo contém configurações de animação padronizadas para criar 
 * uma experiência de usuário consistente em toda a aplicação.
 */

import { useEffect, useState } from 'react';

// Hook para verificar se o usuário prefere movimento reduzido
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Verificar a preferência do usuário
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listener para atualizar se a preferência mudar
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback para navegadores mais antigos
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  return prefersReducedMotion;
};

// Utilitário para desativar animações para usuários que preferem movimento reduzido
export const getReducedMotionVariants = (prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.2 } }
    };
  }
  return undefined;
};

// Wrapper seguro para variantes que respeita prefers-reduced-motion
export const applyVariant = (prefersReducedMotion: boolean, variant: any) => {
  return prefersReducedMotion
    ? { transition: { duration: 0.2 } }
    : variant;
};

// Transições comuns
export const spring = {
  soft: {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 1
  },
  medium: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1
  },
  stiff: {
    type: "spring",
    stiffness: 400,
    damping: 35,
    mass: 1
  }
};

export const ease = {
  smooth: [0.43, 0.13, 0.23, 0.96], // Custom bezier curve
  default: [0.25, 0.1, 0.25, 1], 
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1]
};

// ===== ANIMAÇÕES PARA BOTÕES =====

// Botão padrão
export const buttonVariants = {
  hover: {
    scale: 1.03,
    y: -1,
    transition: {
      ...spring.soft,
      duration: 0.3
    }
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      ...spring.stiff,
      duration: 0.2
    }
  },
  // Variante para botões com animação de brilho
  shimmer: (baseColor: string = 'rgba(255, 255, 255, 0.2)') => ({
    before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `linear-gradient(90deg, transparent, ${baseColor}, transparent)`,
      transform: 'translateX(-100%)'
    },
    animate: {
      transform: 'translateX(100%)',
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 1
      }
    }
  })
};

// Botão de ícone (para botões circulares ou quadrados apenas com ícone)
export const iconButtonVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: spring.soft
  },
  tap: {
    scale: 0.9,
    rotate: -5,
    transition: spring.stiff
  }
};

// Botão Flutuante/FAB 
export const fabVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    transition: spring.soft
  },
  tap: {
    scale: 0.95,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: spring.stiff
  }
};

// ===== ANIMAÇÕES PARA CARTÕES E ELEMENTOS DE CONTEÚDO =====

// Card padrão
export const cardVariants = {
  hover: {
    y: -6, 
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
    transition: {
      ...spring.soft,
      duration: 0.3
    }
  },
  tap: {
    y: -3,
    scale: 0.99,
    transition: {
      ...spring.stiff,
      duration: 0.2
    }
  },
  // Para cards como parte de uma lista ou grid
  list: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        ...spring.medium
      }
    }
  }
};

// Animações de entrada
export const entranceVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  slideIn: {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }
};

// Para listas com staggering animation
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren"
    }
  }
};

// Para navegação
export const navVariants = {
  // Mobile menu
  mobileMenu: {
    closed: { 
      x: "-100%",
      opacity: 0,
      transition: { 
        ...spring.stiff,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { 
        ...spring.soft,
        staggerChildren: 0.07,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  },
  
  // Item no menu mobile
  menuItem: {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  },
  
  // Indicador de navegação ativa
  activeIndicator: {
    layoutTransition: spring.stiff
  }
};

// Para modais e dialogs
export const modalVariants = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  modal: {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: -20,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 0.5,
        bounce: 0.2,
      },
    },
  },
};

// Para items em carrosséis ou galerias
export const carouselItemVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      ...spring.medium
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: {
      ...spring.medium
    }
  })
};

// Animações de loading
export const loadingVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: ease.easeInOut
    }
  },
  rotate: {
    rotate: [0, 360],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  },
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: ease.easeInOut
    }
  }
};

// Variantes para animações de scroll
export const scrollAnimationVariants = {
  // Para uso com useInView do Framer Motion
  fadeInScroll: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  },
  // Com staggering para listas
  staggerScroll: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  },
  // Item individual em uma lista com staggering
  staggerItem: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }
};

// Variantes para hover e tap em formulários
export const formControlVariants = {
  // Para inputs e selects
  input: {
    focus: {
      scale: 1.01,
      transition: spring.soft
    }
  },
  // Para submit buttons
  submit: {
    hover: {
      scale: 1.03,
      transition: spring.soft
    },
    tap: {
      scale: 0.97,
      transition: spring.stiff
    }
  }
};

// Variantes para tooltips e popovers
export const tooltipVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      ...spring.stiff,
      delay: 0.1
    }
  }
};

// Funções utilitárias para criar transições personalizadas
export const createStaggerTransition = (delayChildren: number = 0.1, staggerTime: number = 0.05) => ({
  staggerChildren: staggerTime,
  delayChildren: delayChildren,
  when: "beforeChildren" 
});

export const createHoverTransition = (scale: number = 1.05, yOffset: number = -2) => ({
  scale: scale,
  y: yOffset,
  transition: spring.soft
});

export const createTapTransition = (scale: number = 0.97) => ({
  scale: scale,
  transition: spring.stiff
}); 